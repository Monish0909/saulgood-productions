"use client";

import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { About } from "@/components/sections/About";
import { Specialisation } from "@/components/sections/Specialisation";
import { CreativeStandard } from "@/components/sections/CreativeStandard";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { WhySaulGood } from "@/components/sections/WhySaulGood";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Philosophy */}
      <Philosophy />

      {/* 3. About */}
      <About />

      {/* 4. Specialisation */}
      <Specialisation />

      {/* 5. Creative Standard */}
      <CreativeStandard />

      {/* 6. Work & Lightbox Gallery */}
      <Work />

      {/* 7. Approach */}
      <Approach />

      {/* 8. Why SaulGood Productions? */}
      <WhySaulGood />

      {/* 9. Clients */}
      <Clients />

      {/* 10. Contact & Inquiry Form */}
      <Contact />
    </div>
  );
}
