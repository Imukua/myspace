"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { socialLinks } from "@/data/social-links"
import { Send } from "lucide-react"

const LinksSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")

      // Reset form
      setFormData({
        name: "",
        contact: "",
        message: "",
      })

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    }, 1000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 w-full">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold border-b border-white pb-2"
      >
        PING
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-transparent border border-white focus:border-[#61dafb] outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-1">
                Email or Phone
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-transparent border border-white focus:border-[#61dafb] outline-none transition-colors"
                placeholder="Your email or phone number"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-transparent border border-white focus:border-[#61dafb] outline-none transition-colors resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center w-full py-2 px-4 border ${
                isSubmitting
                  ? "border-gray-500 text-gray-500 cursor-not-allowed"
                  : "border-[#61dafb] text-[#61dafb] hover:bg-[#61dafb10]"
              } transition-colors`}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send size={16} className="ml-2" />
                </>
              )}
            </button>

            {submitStatus === "success" && <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>}

            {submitStatus === "error" && (
              <p className="text-red-400 text-sm mt-2">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Find me on</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks
                .filter((link) => link.name !== "Personal Site")
                .map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="inline-flex items-center space-x-2 px-3 py-2 transition-colors hover:brightness-110"
                    style={{
                      backgroundColor: `${link.color}15`, // 15% opacity version of the color
                      border: `1px solid ${link.color}`,
                      color: link.color,
                    }}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-lg font-medium text-[#f7df1e]">ありがとうございます</p>
            <p className="text-sm mt-1 text-[#61dafb]">さようなら</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LinksSection
