"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LogoProps {
  size?: "small" | "medium" | "large"
  onClick?: () => void
}

const Logo = ({ size = "medium", onClick }: LogoProps) => {
  const sizes = {
    small: { width: 50, height: 50 },
    medium: { width: 70, height: 70 },
    large: { width: 90, height: 90 },
  }

  const { width, height } = sizes[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative" style={{ width, height }}>
        <Image
          src="/images/skeleton-logo-blue.png"
          alt="Skeleton Developer Logo"
          fill
          sizes="(max-width: 768px) 50px, 70px"
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}

export default Logo
