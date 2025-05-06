"use client"

import { motion } from "framer-motion"
import { blogPosts } from "@/data/blog-posts"

const BlogSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 max-w-3xl">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold border-b border-white pb-2"
      >
        LATEST POSTS
      </motion.h2>

      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="space-y-2 border border-white p-3 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="font-bold">{post.title}</h3>
              <span className="text-xs opacity-70">{post.date}</span>
            </div>
            <p className="text-sm">{post.excerpt}</p>
            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="opacity-70">{post.readTime}</span>
              <span>READ MORE →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default BlogSection
