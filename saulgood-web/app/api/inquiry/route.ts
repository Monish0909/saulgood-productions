import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (5 requests per hour)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const { success: rateLimitPassed } = checkRateLimit(ip, 5, 60 * 60 * 1000);
    if (!rateLimitPassed) {
      return NextResponse.json(
        { error: "Too many inquiries sent from this IP. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Body
    const body = await req.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot check (if _hp_company has any value, silently fail / return 200)
    if (data._hp_company && data._hp_company.length > 0) {
      console.warn("[SPAM BOT DETECTED VIA HONEYPOT]");
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Send email via Resend if RESEND_API_KEY is configured, else console.log
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "SaulGood Inquiry <onboarding@resend.dev>",
            to: ["saulgoodproductions@gmail.com"],
            reply_to: data.email,
            subject: `New Inquiry: ${data.name} — ${data.property}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Property: ${data.property}
Location: ${data.location}
Services: ${data.services.join(", ")}
Timeline: ${data.timeline}

Message:
${data.message}
            `.trim(),
          }),
        });

        if (!response.ok) {
          const errData = await response.text();
          console.error("[RESEND ERROR]", errData);
        }
      } catch (emailErr) {
        console.error("[EMAIL DISPATCH ERROR]", emailErr);
      }
    } else {
      console.log("------------------------------------------");
      console.log("[INQUIRY LOGGED (NO RESEND_API_KEY CONFIGURED)]");
      console.log("To:", "saulgoodproductions@gmail.com");
      console.log("Payload:", JSON.stringify(data, null, 2));
      console.log("------------------------------------------");
    }

    return NextResponse.json(
      { success: true, message: "Thank you. Your inquiry has been sent to SaulGood Productions." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[INQUIRY ROUTE ERROR]", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
