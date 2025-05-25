"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: "web" | "mobile" | "design" | "other"
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 2,
    title: "Mobile Task Manager",
    description:
      "A React Native mobile app for task management with offline capabilities, push notifications, and cloud synchronization.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Firebase", "Redux", "AsyncStorage"],
    githubUrl: "https://github.com",
    category: "mobile",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    description:
      "Complete brand identity design for a tech startup including logo, color palette, typography, and marketing materials.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Adobe Illustrator", "Figma", "Photoshop"],
    category: "design",
  },
  {
    id: 4,
    title: "AI Chat Application",
    description:
      "Real-time chat application with AI integration, featuring natural language processing and smart responses.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "OpenAI API", "Socket.io", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 5,
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for data visualization with real-time updates, charts, and analytics for business intelligence.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
    liveUrl: "https://example.com",
    category: "web",
  },
  {
    id: 6,
    title: "IoT Home Automation",
    description: "Smart home automation system with IoT devices, mobile control, and energy monitoring capabilities.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Arduino", "Raspberry Pi", "React Native", "MQTT"],
    githubUrl: "https://github.com",
    category: "other",
  },
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "design", label: "Design" },
  { id: "other", label: "Other" },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-purple-300 hover:text-purple-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-300">My Portfolio</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Creative Works & Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my collection of projects spanning web development, mobile applications, design work, and innovative
            solutions. Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-purple-600/80 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-6 h-6 text-white" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-6 h-6 text-white" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-700 text-purple-300 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4 text-purple-300">Interested in Working Together?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and exciting projects. Let's create something amazing
            together!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </Link>
        </div>
      </main>
    </div>
  )
}
