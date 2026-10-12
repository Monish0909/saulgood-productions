import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { WhySaulGood } from "@/components/sections/WhySaulGood";

export const metadata: Metadata = {
  title: "About | SAULGOOD PRODUCTIONS",
  description: "A specialist hospitality visual production studio in India, focused on thoughtful design and exceptional experiences.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-20">
      <About />
      <WhySaulGood />
    </div>
  );
}
