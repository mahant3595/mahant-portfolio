import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Certificates } from './components/Certificates.jsx';
import { Projects } from './components/Projects.jsx';
import { OtherCertificates } from './components/OtherCertificates.jsx';
import { Skills } from './components/Skills.jsx';
import { Education } from './components/Education.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { BackToTop } from './components/BackToTop.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen bg-base">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Certificates />
        <Projects />
        <OtherCertificates />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
