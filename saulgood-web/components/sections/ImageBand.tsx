import Image from "next/image";
import { MediaItem } from "@/content/media";

/** Full-bleed photographic pause between text sections (parallax via ScrollEffects). */
export function ImageBand({ image }: { image: MediaItem }) {
  return (
    <div data-band className="relative h-[60svh] min-h-[360px] w-full overflow-hidden bg-theme-surface md:h-[78svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover scale-[1.25]"
      />
    </div>
  );
}
