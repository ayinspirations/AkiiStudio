import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { AiAgentSpotlight } from "@/components/AiAgentSpotlight";
import { Work } from "@/components/Work";
import { Faq } from "@/components/Faq";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Process />
        <AiAgentSpotlight />
        <Work />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
