import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact | SAULGOOD PRODUCTIONS",
  description: "Start a conversation about your property. Hospitality photography, videography and aerial visuals across India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-20">
      <Contact />
    </div>
  );
}
