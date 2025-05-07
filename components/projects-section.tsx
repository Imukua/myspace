"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronDown, ChevronUp, Plus, Minus, Filter, X } from "lucide-react"
import { projects } from "@/data/projects"
import { techColors } from "@/data/tech-colors"
import TechBadge from "@/components/tech-badge"

const ProjectsSection = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({})
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Extract all unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techSet.add(tech)
      })
    })
    return Array.from(techSet).sort()
  }, [])

  // Filter projects based on selected technologies
  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) {
      return projects
    }
    return projects.filter((project) => {
      return selectedFilters.every((filter) => project.technologies.includes(filter))
    })
  }, [selectedFilters])

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

  const toggleFilter = (tech: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech)
      } else {
        return [...prev, tech]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  // Get color for a technology
  const getTechColor = (tech: string) => {
    return techColors[tech.toLowerCase()] || techColors.default
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold border-b border-white pb-2"
        >
          EXHIBITS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-700 hover:border-gray-500 transition-colors"
            aria-expanded={showFilters}
          >
            <Filter size={14} />
            <span className="text-sm">Filter</span>
            {selectedFilters.length > 0 && (
              <span className="ml-1 bg-[#61dafb] text-black text-xs px-1.5 rounded-full">{selectedFilters.length}</span>
            )}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-800 p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Filter by technology</h3>
              {selectedFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={12} className="mr-1" /> Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => {
                const techColor = getTechColor(tech)
                const isSelected = selectedFilters.includes(tech)

                return (
                  <button
                    key={tech}
                    onClick={() => toggleFilter(tech)}
                    className={`px-2 py-1 text-xs border rounded-sm transition-colors`}
                    style={{
                      backgroundColor: isSelected ? techColor : `${techColor}15`,
                      borderColor: techColor,
                      color: isSelected ? "black" : techColor,
                    }}
                  >
                    {tech}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 border border-gray-800"
        >
          <p className="text-gray-400">No projects match the selected filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-[#61dafb] hover:underline text-sm flex items-center mx-auto"
          >
            <X size={14} className="mr-1" /> Clear filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProjects[project.title] || false
            const isTechExpanded = expandedTech[project.title] || false
            const isHovered = hoveredProject === project.title

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border border-gray-800 bg-black p-4 flex flex-col h-full hover:border-gray-700 transition-colors"
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
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
                        className="text-[#61dafb] hover:text-[#61dafb] hover:brightness-110 transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {project.image && (
                  <div className="mb-3 border border-gray-800 overflow-hidden h-24">
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
                      className="inline-flex items-center text-xs text-[#f7df1e] hover:text-[#f7df1e] hover:brightness-110 transition-colors"
                    >
                      <Plus size={12} className="mr-1" /> {project.technologies.length - 3} more
                    </button>
                  )}
                  {isTechExpanded && (
                    <button
                      onClick={() => toggleTech(project.title)}
                      className="inline-flex items-center text-xs text-[#f7df1e] hover:text-[#f7df1e] hover:brightness-110 transition-colors"
                    >
                      <Minus size={12} className="mr-1" /> Show less
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

export default ProjectsSection
