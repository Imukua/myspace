"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Code,
    BookOpen,
    Mic, // Note: Mic icon might still be used in ActivityCard if 'SPEAKING' case isn't updated or removed
    Github,
    Zap,
    Lightbulb,
    Music,
    Keyboard,
    Palette,
    ChevronLeft,
    ChevronRight,
    Tv,
    Headphones,
    Play,
    ExternalLink,
    Star,
    Calendar,
    Clock,
    X,
} from "lucide-react"
import { activities, currentlyWatching, currentlyListening } from "@/data/activities" // currentlyListening is still imported but commented out below

const ActivityCard = ({ activity, index }: { activity: (typeof activities)[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    const getIcon = () => {
        switch (activity.title) {
            case "OPEN SOURCE":
                return <Github size={24} />
            case "LEARNING":
                return <BookOpen size={24} />
            case "WRITING":
                return <Code size={24} />
            case "READING": // Assuming you've updated the activity title as discussed
                return <BookOpen size={24} /> // Using BookOpen for Reading
            // case "SPEAKING": // Commented out based on previous request to change to READING
            //     return <Mic size={24} />
            default:
                return <Zap size={24} />
        }
    }

    const getColor = () => {
        switch (activity.title) {
            case "OPEN SOURCE":
                return "#f0f6fc" // Example color, adjust if needed
            case "LEARNING":
                return "#f7df1e" // Example color, adjust if needed
            case "WRITING":
                return "#61dafb" // Example color, adjust if needed
             case "READING": // Assuming you've updated the activity title
                return "#e44d26" // Example color for Reading, adjust if needed
            // case "SPEAKING": // Commented out
            //     return "#e44d26"
            default:
                return "#ffffff"
        }
    }

    const color = getColor()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="border border-gray-800 p-5 h-full bg-black"
                animate={{
                    y: isHovered ? -5 : 0,
                    boxShadow: isHovered ? `0 5px 15px rgba(0, 0, 0, 0.2)` : "none",
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-start mb-3">
                    <div
                        className="p-2 mr-3 rounded-full"
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                        }}
                    >
                        {getIcon()}
                    </div>
                    <h3 className="text-lg font-bold" style={{ color }}>
                        {activity.title}
                    </h3>
                </div>
                <p className="text-sm leading-relaxed">{activity.description}</p>

                {activity.details && (
                    <ul className="mt-3 space-y-1 text-xs text-gray-300">
                        {activity.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                                <span className="mr-2 mt-0.5">•</span>
                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </motion.div>
    )
}

interface MediaItemProps {
    item: any // Using any for flexibility after commenting out specific types
    index: number
    type: "watching" | "listening"
    onSelect: (item: any) => void
}

const MediaItem = ({ item, index, type, onSelect }: MediaItemProps) => {
    const isWatching = type === "watching"
    // Removed listening color logic as section is commented out, using watching colors for consistency
    // const color = isWatching ? "#e44d26" : "#1DB954"
    // const bgColor = isWatching ? "#2d1b18" : "#132218"
    // const icon = isWatching ? <Tv size={14} /> : <Music size={14} />

    // Simplified colors and icon based on the Watching section
    const color = "#e44d26"; // Defaulting to Watching color
    const bgColor = "#2d1b18"; // Defaulting to Watching background color
    const icon = isWatching ? <Tv size={14} /> : <Headphones size={14} />; // Keeping the icons based on type


    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="group relative"
            onClick={() => onSelect(item)}
            whileHover={{ scale: 1.03 }}
        >
            <div className="relative overflow-hidden rounded-lg cursor-pointer" style={{ backgroundColor: bgColor }}>
                <div className="aspect-[3/4] w-full relative">
                    <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center space-x-1 mb-1">
                            <div
                                className="text-xs px-1.5 py-0.5 rounded-sm flex items-center"
                                style={{ backgroundColor: `${color}30`, color }}
                            >
                                {icon}
                                <span className="ml-1">{isWatching ? item.network : item.artist ? item.artist : "Media"}</span> {/* Adjusted text for listening */}
                            </div>

                            {item.rating && (
                                <div className="text-xs px-1.5 py-0.5 rounded-sm flex items-center bg-yellow-500/20 text-yellow-500">
                                    <Star size={12} className="mr-1" />
                                    <span>{item.rating}</span>
                                </div>
                            )}
                        </div>

                        <h4 className="font-bold text-sm leading-tight group-hover:text-white transition-colors">{item.title}</h4>
                        <p className="text-xs text-gray-300 mt-0.5 truncate">{isWatching ? item.genre : item.album || item.genre}</p> {/* Adjusted text for listening */}
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                    <Play size={18} fill="black" className="text-black ml-1" />
                </div>
            </div>
        </motion.div>
    )
}

const MediaDetailModal = ({
    item,
    type,
    onClose,
}: { item: any; type: "watching" | "listening"; onClose: () => void }) => {
    const isWatching = type === "watching"
     // Removed listening color logic as section is commented out, using watching colors for consistency
    // const color = isWatching ? "#e44d26" : "#1DB954"
     const color = "#e44d26"; // Defaulting to Watching color


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-gray-800 rounded-lg max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-64">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/80 transition-colors"
                    >
                        <X size={18} />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center space-x-2 mb-1">
                            <div
                                className="text-xs px-2 py-1 rounded flex items-center"
                                style={{ backgroundColor: `${color}30`, color }}
                            >
                                {isWatching ? <Tv size={14} className="mr-1" /> : <Headphones size={14} className="mr-1" />} {/* Keeping icons based on type */}
                                <span>{isWatching ? item.network : item.artist ? item.artist : "Media"}</span> {/* Adjusted text for listening */}
                            </div>

                            {item.rating && (
                                <div className="text-xs px-2 py-1 rounded flex items-center bg-yellow-500/20 text-yellow-500">
                                    <Star size={12} className="mr-1" />
                                    <span>{item.rating}</span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold">{item.title}</h3>
                         {/* Adjusted text for listening, showing album if available */}
                        <p className="text-sm text-gray-300">{isWatching ? item.genre : item.album || item.genre}</p>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {isWatching ? (
                        <>
                            <div className="flex items-center text-sm text-gray-400">
                                <Calendar size={16} className="mr-2" />
                                <span>Released: {item.year}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                                <Clock size={16} className="mr-2" />
                                <span>Episodes: {item.episodes}</span>
                            </div>
                            <p className="text-sm mt-3">{item.description}</p>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
                                <div className="text-sm">
                                    <span className="text-gray-400">Status: </span>
                                    <span className="text-white">{item.status}</span>
                                </div>

                                {/* Link might need updating based on what "Watch Now" means */}
                                <a href="#" className="flex items-center text-sm" style={{ color }}>
                                    <span className="mr-1">Watch Now</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </>
                    ) : (
                        // Adjusted details for listening content
                        <>
                             <div className="flex items-center text-sm text-gray-400">
                                <Headphones size={16} className="mr-2" />
                                <span>Artist: {item.artist}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                                <Calendar size={16} className="mr-2" />
                                <span>Album: {item.album}</span> {/* Added Album */}
                            </div>
                             {item.duration && ( // Added duration if available
                                 <div className="flex items-center text-sm text-gray-400">
                                     <Clock size={16} className="mr-2" />
                                     <span>Duration: {item.duration}</span>
                                 </div>
                             )}
                            <p className="text-sm mt-3">{item.description || "No description available."}</p> {/* Added fallback description */}


                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
                                <div className="text-sm">
                                    <span className="text-gray-400">Genre: </span>
                                    <span className="text-white">{item.genre || "N/A"}</span> {/* Added fallback genre */}
                                </div>

                                 {/* Link might need updating based on where to listen */}
                                <a href="#" className="flex items-center text-sm" style={{ color }}>
                                    <span className="mr-1">Listen Here</span> {/* Changed text */}
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

const MediaSection = ({ title, items, type }: { title: string; items: any[]; type: "watching" | "listening" }) => {
    const [selectedItem, setSelectedItem] = useState<any | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const color = type === "watching" ? "#e44d26" : "#1DB954"
    const icon = type === "watching" ? <Tv size={18} /> : <Headphones size={18} />

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const scrollEl = scrollRef.current
        if (scrollEl) {
            scrollEl.addEventListener("scroll", checkScrollButtons)
            // Initial check
            checkScrollButtons()

            return () => scrollEl.removeEventListener("scroll", checkScrollButtons)
        }
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = current.clientWidth * 0.75

            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="p-1.5 mr-2 rounded-full"
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                        }}
                    >
                        {icon}
                    </div>
                    <h3 className="text-md font-bold" style={{ color }}>
                        {title}
                    </h3>
                </div>

                <div className="flex space-x-1">
                    <button
                        onClick={() => scroll("left")}
                        className={`p-1 rounded-full transition-colors ${
                            showLeftArrow ? `hover:bg-gray-800` : `opacity-30 cursor-not-allowed`
                        }`}
                        disabled={!showLeftArrow}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className={`p-1 rounded-full transition-colors ${
                            showRightArrow ? `hover:bg-gray-800` : `opacity-30 cursor-not-allowed`
                        }`}
                        disabled={!showRightArrow}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="grid grid-flow-col auto-cols-[160px] gap-3 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {items.map((item, index) => (
                    <MediaItem key={index} item={item} index={index} type={type} onSelect={setSelectedItem} />
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && <MediaDetailModal item={selectedItem} type={type} onClose={() => setSelectedItem(null)} />}
            </AnimatePresence>
        </motion.div>
    )
}

const InterestBadge = ({ interest, icon, index }: { interest: string; icon: React.ReactNode; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-600 bg-black"
            whileHover={{ scale: 1.05, borderColor: "#61dafb" }}
        >
            {icon}
            <span className="text-sm">{interest}</span>
        </motion.div>
    )
}

const ActivitiesSection = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between"
            >
                <motion.h2 className="text-2xl font-bold">FEED</motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 md:mt-0 text-sm text-gray-400"
                >
                    <span className="text-[#61dafb]">What I'm focused on</span> right now
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.map((activity, index) => (
                    <ActivityCard key={activity.title} activity={activity} index={index} />
                ))}
            </div>

            {/* Media Sections */}
            <div className="space-y-8">
                <MediaSection title="WHAT I'M WATCHING" items={currentlyWatching} type="watching" />
                {/* TODO: Update "What I'm Listening To" content */}
                {/* <MediaSection title="WHAT I'M LISTENING TO" items={currentlyListening} type="listening" /> */}
            </div>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-gray-800"
            >
                <h3 className="text-lg font-bold mb-4 text-[#f7df1e]">OTHER INTERESTS</h3>
                <div className="flex flex-wrap gap-3">
                    <InterestBadge interest="Generative Art" icon={<Palette size={16} />} index={0} />
                    <InterestBadge interest="Electronic Music" icon={<Music size={16} />} index={1} />
                    <InterestBadge interest="Mechanical Keyboards" icon={<Keyboard size={16} />} index={2} />
                    <InterestBadge interest="Creative Coding" icon={<Code size={16} />} index={3} />
                    <InterestBadge interest="New Technologies" icon={<Lightbulb size={16} />} index={4} />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ActivitiesSection