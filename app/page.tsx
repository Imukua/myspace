"use client"

import { useState } from "react"
import NavComponent from "@/components/navigation/nav-component"
import IntroSection from "@/components/intro-section"
import ActivitiesSection from "@/components/activities-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import LinksSection from "@/components/links-section"
import AiChat from "@/components/ai-chat"


const CURRENT_NAV_VARIANT = "default"

export default function Home() {
  const [currentSection, setCurrentSection] = useState("intro")
  const [navVariant, setNavVariant] = useState(CURRENT_NAV_VARIANT)

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "intro":
        return <IntroSection />
      case "projects":
        return <ProjectsSection />
      case "experience":
        return <ExperienceSection />
      case "activities":
        return <ActivitiesSection />
      case "links":
        return <LinksSection />
      default:
        return <IntroSection />
    }
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground font-mono theme-transition">
      <div className="w-full h-full flex flex-col p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <NavComponent
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            variant={navVariant as any}
          />
        </div>
        <div className="mt-6 flex-grow w-full max-w-screen-xl mx-auto">{renderCurrentSection()}</div>
      </div>
      <AiChat />
    </main>
  )
}
