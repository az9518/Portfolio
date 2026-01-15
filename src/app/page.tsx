import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import ResumeSection from '@/components/resume-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background w-full items-center">
      <Header />
      <main className="flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
}
