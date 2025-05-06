import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react"

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/username",
    icon: <Github size={16} />,
    color: "#f0f6fc",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/username",
    icon: <Twitter size={16} />,
    color: "#1da1f2",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: <Linkedin size={16} />,
    color: "#0a66c2",
  },
  {
    name: "Email",
    url: "mailto:hello@example.com",
    icon: <Mail size={16} />,
    color: "#f7df1e",
  },
  {
    name: "Personal Site",
    url: "https://example.com",
    icon: <ExternalLink size={16} />,
    color: "#61dafb",
  },
]
