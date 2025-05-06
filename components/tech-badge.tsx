"use client"

import { techColors } from "@/data/tech-colors"

interface TechBadgeProps {
  technology: string
  small?: boolean
}

const TechBadge = ({ technology, small = false }: TechBadgeProps) => {
  const techColor = techColors[technology.toLowerCase()] || techColors.default

  return (
    <span
      className={`${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"} inline-flex items-center justify-center`}
      style={{
        backgroundColor: `${techColor}15`, // 15% opacity version of the color
        border: `1px solid ${techColor}`,
        color: techColor,
      }}
    >
      {technology}
    </span>
  )
}

export default TechBadge
