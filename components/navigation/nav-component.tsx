"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"
import { navigationItems } from "@/data/navigation"
import Logo from "@/components/logo"

export type NavVariant = "default" | "spread" | "centered" | "right"

interface NavComponentProps {
  currentSection: string
  setCurrentSection: (section: string) => void
  variant?: NavVariant
  showLogo?: boolean
}

const NavComponent = ({
  currentSection,
  setCurrentSection,
  variant = "default",
  showLogo = true,
}: NavComponentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId)
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  const getNavClasses = () => {
    switch (variant) {
      case "spread":
        return "flex flex-wrap justify-between w-full"
      case "centered":
        return "flex flex-wrap justify-center gap-12"
      case "right":
        return "flex flex-wrap justify-end gap-8"
      case "default":
      default:
        return "flex flex-wrap gap-12 justify-start"
    }
  }

  return (
    <header className="relative w-full py-4 md:py-6 flex items-center">
      {showLogo && (
        <div className="mr-8">
          <Logo size={isMobile ? "small" : "medium"} onClick={() => handleSectionClick("intro")} />
        </div>
      )}

      {isMobile ? (
        <>
          <div className="flex-grow" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 bg-black z-50 py-4"
              >
                <div className="flex flex-col">
                  {navigationItems.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`px-4 py-3 text-left text-lg flex items-center ${
                        currentSection === section.id ? "text-white font-bold" : "text-gray-400 hover:text-white"
                      } transition-colors`}
                    >
                      <section.icon size={18} className="mr-2" />
                      {section.label}
                    </button>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </>
      ) : (
        <nav className={getNavClasses()}>
          {navigationItems.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`text-lg flex items-center ${
                currentSection === section.id ? "text-white font-bold" : "text-gray-400 hover:text-white"
              } transition-colors`}
            >
              <section.icon size={18} className="mr-2" />
              {section.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

export default NavComponent
