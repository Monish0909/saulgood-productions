"use client";

import React, { useState } from "react";
import { inquirySchema, InquiryFormData } from "@/lib/validations";

const AVAILABLE_SERVICES = [
  "Hospitality Photography",
  "Cinematic Videography",
  "Aerial Visuals",
];

export function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    property: "",
    location: "",
    services: [],
    timeline: "",
    message: "",
    _hp_company: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Validate single field on blur
  const handleBlur = (field: keyof InquiryFormData) => {
    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErrors[field]?.[0] || undefined,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const nextServices = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: nextServices };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Full validation
    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Partial<Record<keyof InquiryFormData, string>> = {};
      for (const [key, val] of Object.entries(fieldErrors)) {
        if (val && val[0]) {
          formattedErrors[key as keyof InquiryFormData] = val[0];
        }
      }
      setErrors(formattedErrors);
      setStatusMessage({
        type: "error",
        text: "Please correct the highlighted fields before submitting.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: json.message || "Thank you. Your inquiry has been successfully sent.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          property: "",
          location: "",
          services: [],
          timeline: "",
          message: "",
          _hp_company: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.error || "Submission failed. Please try again or email us directly.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Network error occurred. Please verify your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="inquiry-form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-8 border border-theme-line bg-theme-surface/40 p-8 md:p-12"
      aria-label="Client Inquiry Form"
    >
      {/* Honeypot field (hidden from legitimate users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_hp_company">Do not fill this field</label>
        <input
          id="_hp_company"
          name="_hp_company"
          type="text"
          value={formData._hp_company || ""}
          onChange={(e) =>
            setFormData({ ...formData, _hp_company: e.target.value })
          }
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="label text-[11px] text-theme-ink/80">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50"
            placeholder="Your full name"
          />
          {errors.name && (
            <span className="text-xs text-red-400 font-mono">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label text-[11px] text-theme-ink/80">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50"
            placeholder="client@hospitalitybrand.com"
          />
          {errors.email && (
            <span className="text-xs text-red-400 font-mono">{errors.email}</span>
          )}
        </div>

        {/* Property name & website */}
        <div className="flex flex-col gap-2">
          <label htmlFor="property" className="label text-[11px] text-theme-ink/80">
            Property Name & Website *
          </label>
          <input
            id="property"
            name="property"
            type="text"
            required
            disabled={isSubmitting}
            value={formData.property}
            onChange={(e) =>
              setFormData({ ...formData, property: e.target.value })
            }
            onBlur={() => handleBlur("property")}
            className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50"
            placeholder="Resort Name (e.g. resort.com)"
          />
          {errors.property && (
            <span className="text-xs text-red-400 font-mono">{errors.property}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="label text-[11px] text-theme-ink/80">
            Location *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            disabled={isSubmitting}
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            onBlur={() => handleBlur("location")}
            className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50"
            placeholder="e.g. Goa, India or International"
          />
          {errors.location && (
            <span className="text-xs text-red-400 font-mono">{errors.location}</span>
          )}
        </div>
      </div>

      {/* Services Needed Checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="label text-[11px] text-theme-ink/80">
          Services Needed *
        </span>
        <div className="flex flex-wrap gap-4 pt-1">
          {AVAILABLE_SERVICES.map((svc) => {
            const isChecked = formData.services.includes(svc);
            return (
              <label
                key={svc}
                className={`flex items-center gap-2.5 cursor-pointer border px-4 py-2.5 text-xs transition-all active:scale-[0.98] ${
                  isChecked
                    ? "border-theme-accent bg-theme-accent/10 text-theme-ink font-medium"
                    : "border-theme-line bg-theme-bg/40 text-theme-muted hover:border-theme-ink/50"
                }`}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={svc}
                  checked={isChecked}
                  disabled={isSubmitting}
                  onChange={() => handleServiceChange(svc)}
                  className="accent-amber-600 h-4 w-4 rounded-none cursor-pointer"
                />
                <span>{svc}</span>
              </label>
            );
          })}
        </div>
        {errors.services && (
          <span className="text-xs text-red-400 font-mono">{errors.services}</span>
        )}
      </div>

      {/* Preferred Timeline */}
      <div className="flex flex-col gap-2">
        <label htmlFor="timeline" className="label text-[11px] text-theme-ink/80">
          Preferred Timeline *
        </label>
        <input
          id="timeline"
          name="timeline"
          type="text"
          required
          disabled={isSubmitting}
          value={formData.timeline}
          onChange={(e) =>
            setFormData({ ...formData, timeline: e.target.value })
          }
          onBlur={() => handleBlur("timeline")}
          className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50"
          placeholder="e.g. Next month, Q4 2026, or Specific dates"
        />
        {errors.timeline && (
          <span className="text-xs text-red-400 font-mono">{errors.timeline}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label text-[11px] text-theme-ink/80">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={isSubmitting}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          onBlur={() => handleBlur("message")}
          className="w-full border border-theme-line bg-theme-bg/60 px-4 py-3 text-sm text-theme-ink outline-none transition-colors focus:border-theme-accent disabled:opacity-50 resize-y"
          placeholder="Tell us about the property, vision, and specific deliverables needed..."
        />
        {errors.message && (
          <span className="text-xs text-red-400 font-mono">{errors.message}</span>
        )}
      </div>

      {/* Status Messages (aria-live polite) */}
      <div aria-live="polite" className="min-h-6">
        {statusMessage && (
          <div
            className={`p-4 border text-sm flex items-center gap-3 ${
              statusMessage.type === "success"
                ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-400"
                : "border-red-500/50 bg-red-950/20 text-red-400"
            }`}
          >
            <span>{statusMessage.type === "success" ? "✓" : "⚠"}</span>
            <p>{statusMessage.text}</p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="label inline-flex items-center justify-center gap-2 border border-theme-ink bg-theme-ink px-8 py-4 text-theme-bg text-[11px] font-medium tracking-widest transition-all duration-100 active:scale-[0.97] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
        >
          {isSubmitting ? "TRANSMITTING INQUIRY..." : "SEND INQUIRY"}
        </button>
      </div>
    </form>
  );
}
