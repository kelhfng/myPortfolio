import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import ResumeAgentSection from "@/components/sections/resume-agent";
import ContactSection from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="w-full">
        <HeroSection />
      </section>

      {/* Separator */}
      <div className="border-t border-neutral-100 dark:border-neutral-900" />

      {/* Projects Section */}
      <section id="projects" className="w-full bg-neutral-50/30 dark:bg-neutral-950/20">
        <ProjectsSection />
      </section>

      {/* Separator */}
      <div className="border-t border-neutral-100 dark:border-neutral-900" />

      {/* AI Resume Agent Section */}
      <section id="resume-agent" className="w-full">
        <ResumeAgentSection />
      </section>

      {/* Separator */}
      <div className="border-t border-neutral-100 dark:border-neutral-900" />

      {/* Contact Section */}
      <section id="contact" className="w-full bg-neutral-50/30 dark:bg-neutral-950/20">
        <ContactSection />
      </section>
    </div>
  );
}
