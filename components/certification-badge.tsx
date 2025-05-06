"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface CertificationBadgeProps {
  name: string
  issuer: string
  icon: LucideIcon
  color: string
  delay?: number
}

const CertificationBadge = ({ name, issuer, icon: Icon, color, delay = 0 }: CertificationBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="group relative"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center space-x-2 p-2 border border-gray-800 bg-black/50 backdrop-blur-sm rounded-sm hover:border-gray-700 transition-colors">
        <div
          className="p-1.5 rounded-sm"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          <Icon size={16} />
        </div>
        <div className="text-xs">
          <p className="font-medium" style={{ color }}>
            {name}
          </p>
          <p className="text-gray-400 text-[10px]">{issuer}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default CertificationBadge
