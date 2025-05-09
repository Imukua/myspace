"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Minimize2, Maximize2, MessageCircle } from "lucide-react"

// --- Import ReactMarkdown and remarkGfm ---
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  role: "user" | "assistant"
  content: string
}

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm lil-Ian. Ask me anything about Ian Mukua and his work!",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [error, setError] = useState<string | null>(null) // New state for error handling
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Show tooltip after a delay when page loads
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 2000)

    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 8000)

    return () => {
      clearTimeout(tooltipTimer)
      clearTimeout(hideTooltipTimer)
    }
  }, [])

  // Set animation flag after initial animation
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setHasAnimated(true)
    }, 4000)

    return () => clearTimeout(animationTimer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
    setShowTooltip(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userQuestion = input.trim()
    // Add user message to state
    const userMessage: Message = { role: "user", content: userQuestion }
    setMessages((prev) => [...prev, userMessage])
    setInput("") // Clear input immediately
    setError(null) // Clear previous errors

    setIsTyping(true) // Indicate AI is thinking

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI.');
      }

      const data = await response.json();
      const aiMessage: Message = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (err: any) {
      console.error("API call failed:", err);
      setError(err.message || "Sorry, I couldn't get an answer right now. Please try again.");
      // Optionally add a fallback message to the chat
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsTyping(false); // AI is done thinking
    }
  }

  // Pulse animation variants
  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      boxShadow: [
        "0 0 0 0 rgba(97, 218, 251, 0.4)",
        "0 0 0 10px rgba(97, 218, 251, 0)",
        "0 0 0 0 rgba(97, 218, 251, 0)",
      ],
      transition: {
        duration: 2,
        repeat: hasAnimated ? 0 : 3,
        repeatType: "loop" as const,
      },
    },
  }

  // Entry animation variants
  const entryVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(97, 218, 251, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  }

  return (
    <>
      {/* Floating chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial="hidden"
        animate="visible"
        variants={entryVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-[#61dafb] text-black flex items-center justify-center shadow-lg hover:bg-[#4fa8c7] transition-colors"
          aria-label="Chat with AI"
          animate={!hasAnimated ? "pulse" : undefined}
          variants={pulseVariants}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </motion.button>

        {/* Notification dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: hasAnimated ? 0 : 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
        />

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-16 right-0 bg-background border border-gray-700 p-3 rounded-lg shadow-lg w-48"
            >
              <div className="flex items-start space-x-2">
                <MessageCircle size={16} className="text-[#61dafb] mt-0.5 flex-shrink-0" />
                <p className="text-xs">Chat with AI to learn more about me and my work!</p>
              </div>
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-background border-r border-b border-gray-700 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-background border border-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden`}
          >
            {/* Chat header */}
            <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-black">
              <div className="flex items-center">
                <Bot size={20} className="text-[#61dafb] mr-2" />
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            {!isMinimized && (
              <div
                className="flex-grow overflow-y-auto p-3 space-y-3 scrollbar-hide"
                style={{ scrollbarWidth: "none" }}
              >
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#61dafb20] border border-[#61dafb]"
                          : "bg-gray-800 border border-gray-700"
                      }`}
                    >
                      {/* --- Start of Change --- */}
                      {message.role === "assistant" ? (
                        <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            // Apply typography classes for beautiful Markdown rendering
                            // and keep original text styling
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                      {/* --- End of Change --- */}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && ( // Display error message if present
                  <div className="flex justify-center">
                    <p className="text-red-500 text-xs text-center p-2 rounded-md bg-red-900 bg-opacity-20 border border-red-700">
                      {error}
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat input */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 bg-black">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about John..." // Consider updating placeholder to be more general or specific to Ian
                    className="flex-grow p-2 bg-transparent border border-gray-700 rounded-l-md focus:outline-none focus:border-[#61dafb]"
                    disabled={isTyping} // Disable input while typing
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping} // Disable button while typing or no input
                    className={`p-2 rounded-r-md ${
                      !input.trim() || isTyping
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-[#61dafb] text-black hover:bg-[#4fa8c7]"
                    } transition-colors`}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AiChat
