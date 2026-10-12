import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";
import { Clients } from "@/components/sections/Clients";

export const metadata: Metadata = {
  title: "Work | SAULGOOD PRODUCTIONS",
  description: "Selected hospitality photography, cinematic videography and aerial visuals for hotels, resorts and villas.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="flex flex-col pt-20">
      <Work />
      <Clients />
    </div>
  );
}
