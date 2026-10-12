import type { Metadata } from "next";
import { Specialisation } from "@/components/sections/Specialisation";
import { CreativeStandard } from "@/components/sections/CreativeStandard";
import { ImageBand } from "@/components/sections/ImageBand";
import { Approach } from "@/components/sections/Approach";
import { mediaManifest } from "@/content/media";

export const metadata: Metadata = {
  title: "Services | SAULGOOD PRODUCTIONS",
  description: "Premium photography, cinematic videography and aerial visuals, made for luxury hospitality properties.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-20">
      <Specialisation />
      <CreativeStandard />
      <ImageBand image={mediaManifest.services.aerial} />
      <Approach />
    </div>
  );
}
