import { Hero } from "@/components/homepage/Hero";
import { Section2 } from "@/components/homepage/Section2";
import { Section3 } from "@/components/homepage/Section3";
import { Section4 } from "@/components/homepage/Section4";
import { Section5 } from "@/components/homepage/Section5";

export default function Home() {
  return (
    <main>
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </main>
  );
}
