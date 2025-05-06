import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react"

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Imukua",
    icon: <Github size={16} />,
    color: "#f0f6fc",
  },
  {
    name: "Twitter",
    url: "https://x.com/I_Mukua",
    icon: <Twitter size={16} />,
    color: "#1da1f2",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ian-mukua-b78484261",
    icon: <Linkedin size={16} />,
    color: "#0a66c2",
  },
  {
    name: "Email",
    url: "mailto:ian@mukua.dev",
    icon: <Mail size={16} />,
    color: "#f7df1e",
  },
  {
    name: "Personal Site",
    url: "mukua.dev",
    icon: <ExternalLink size={16} />,
    color: "#61dafb",
  },
]
