import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Solutions } from "@/components/sections/Solutions";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Solutions />
        <Projects />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
