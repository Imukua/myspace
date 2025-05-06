"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react"
import { projects } from "@/data/projects"
import TechBadge from "@/components/tech-badge"

const ProjectsSection = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({})

  const toggleProject = (projectTitle: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectTitle]: !prev[projectTitle],
    }))
  }

  const toggleTech = (projectTitle: string) => {
    setExpandedTech((prev) => ({
      ...prev,
      [projectTitle]: !prev[projectTitle],
    }))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 w-full">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold border-b border-white pb-2"
      >
        EXHIBITS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const isExpanded = expandedProjects[project.title] || false
          const isTechExpanded = expandedTech[project.title] || false

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="border border-white hover:border-gray-300 transition-colors p-4 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <div className="flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <div className="mb-3 border border-white overflow-hidden h-24">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <p className="text-sm mb-3">{project.description}</p>

              <button
                onClick={() => toggleProject(project.title)}
                className="flex items-center text-xs text-[#61dafb] hover:text-[#61dafb] hover:brightness-110 transition-colors mb-2"
                aria-expanded={isExpanded}
                aria-controls={`details-${project.title}`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={14} className="mr-1" /> Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} className="mr-1" /> Show details
                  </>
                )}
              </button>

              {isExpanded && (
                <div id={`details-${project.title}`} className="mb-3">
                  <h4 className="text-xs font-medium mb-1 text-gray-300">KEY CONTRIBUTIONS:</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 pl-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {(isTechExpanded ? project.technologies : project.technologies.slice(0, 3)).map((tech) => (
                  <TechBadge key={tech} technology={tech} small />
                ))}
                {project.technologies.length > 3 && !isTechExpanded && (
                  <button
                    onClick={() => toggleTech(project.title)}
                    className="inline-flex items-center text-xs px-2 py-1 text-[#f7df1e] border border-[#f7df1e] hover:bg-[#f7df1e10] transition-colors"
                  >
                    <Plus size={12} className="mr-1" /> {project.technologies.length - 3} more
                  </button>
                )}
                {isTechExpanded && (
                  <button
                    onClick={() => toggleTech(project.title)}
                    className="inline-flex items-center text-xs px-2 py-1 text-[#f7df1e] border border-[#f7df1e] hover:bg-[#f7df1e10] transition-colors"
                  >
                    <Minus size={12} className="mr-1" /> Show less
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ProjectsSection
