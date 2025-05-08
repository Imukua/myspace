"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { experiences } from "@/data/experience"
import TechBadge from "@/components/tech-badge"

const ExperienceCard = ({ exp, index }: { exp: (typeof experiences)[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      key={exp.company}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.15 }}
      className="space-y-3 border border-gray-800 p-4 hover:border-gray-700 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <h3 className="font-bold text-xl">{exp.company}</h3>
        <span className="text-sm opacity-70">{exp.period}</span>
      </div>
      <p className="text-md opacity-90 font-medium">{exp.title}</p>
      <p className="text-sm leading-relaxed">{exp.description}</p>

      <div className="flex flex-wrap gap-2 pt-2">
        {exp.technologies.map((tech) => (
          <TechBadge key={tech} technology={tech} small />
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-xs text-[#61dafb] hover:text-[#61dafb] hover:brightness-110 transition-colors mt-2"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            <ChevronUp size={14} className="mr-1" /> Hide achievements
          </>
        ) : (
          <>
            <ChevronDown size={14} className="mr-1" /> Show achievements
          </>
        )}
      </button>

      {isExpanded && exp.achievements && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="list-disc list-inside text-sm space-y-1 pl-2 pt-2"
        >
          {exp.achievements.map((achievement, i) => (
            <li key={i}>{achievement}</li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  )
}

const ExperienceSection = () => {
  const [showNonTech, setShowNonTech] = useState(false)
  const techExperiences = experiences.filter((exp) => exp.category === "tech")
  const nonTechExperiences = experiences.filter((exp) => exp.category === "non-tech")

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10 w-full">
      <div className="space-y-10">
        {/* Tech Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Code size={20} className="text-[#61dafb]" />
            <h3 className="text-xl font-bold text-[#61dafb]">TECH EXPERIENCE</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {techExperiences.map((exp, index) => (
              <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Non-Tech Experience Section */}
        <div className="space-y-6">
          <button
            onClick={() => setShowNonTech(!showNonTech)}
            className="flex items-center space-x-3 w-full group"
            aria-expanded={showNonTech}
          >
            <Briefcase size={20} className="text-[#f7df1e]" />
            <h3 className="text-xl font-bold text-[#f7df1e]">NON-TECH EXPERIENCE</h3>
            <div className="ml-3 flex items-center justify-center h-5 w-5 rounded-full border border-[#f7df1e] text-[#f7df1e] group-hover:bg-[#f7df1e10] transition-colors">
              {showNonTech ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </button>

          <AnimatePresence>
            {showNonTech && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {nonTechExperiences.map((exp, index) => (
                  <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceSection
