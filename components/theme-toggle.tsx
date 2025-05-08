"use client"

import { motion } from "framer-motion"
import { Moon, Waves } from "lucide-react"
import { useTheme } from "@/context/theme-context"

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onClick={toggleTheme}
      className={`p-2 border border-gray-600 hover:border-gray-400 transition-colors ${className}`}
      aria-label={`Switch to ${isDark ? "blue" : "dark"} mode`}
      title={`Switch to ${isDark ? "blue" : "dark"} mode`}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-[#f7df1e]"
        >
          <Moon size={18} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-[#61dafb]"
        >
          <Waves size={18} />
        </motion.div>
      </div>
    </motion.button>
  )
}

export default ThemeToggle
