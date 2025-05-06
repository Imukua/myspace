"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { personalInfo } from "@/data/personal-info"
import { certifications } from "@/data/certifications"
import TechBadge from "@/components/tech-badge"
import CertificationBadge from "@/components/certification-badge"

const IntroSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-4"
      >
        <div className="w-20 h-20 border border-white flex items-center justify-center text-3xl">ツ</div>
        <div>
          <h2 className="text-3xl font-bold">{personalInfo.name}</h2>
          <div className="flex items-center mt-1">
            <span className="text-[#61dafb] font-medium">{personalInfo.title}</span>
            <span className="mx-2 text-gray-500">//</span>
            <div className="flex items-center text-[#f7df1e]">
              <MapPin size={14} className="mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
        <p className="leading-relaxed text-lg">{personalInfo.bio}</p>
        <p className="leading-relaxed text-lg">{personalInfo.description}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-2">
        <div className="flex flex-wrap gap-3">
          {personalInfo.keyTechnologies.map((tech, index) => (
            <TechBadge key={tech} technology={tech} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-gray-800 pt-6"
      >
        <h3 className="text-sm uppercase text-gray-400 mb-3">Certifications</h3>
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert, index) => (
            <CertificationBadge
              key={cert.name}
              name={cert.name}
              issuer={cert.issuer}
              icon={cert.icon}
              color={cert.color}
              delay={0.9 + index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default IntroSection
