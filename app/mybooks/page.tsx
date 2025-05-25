"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Calendar, BookOpen, Download, ExternalLink } from "lucide-react"

interface Book {
  id: number
  title: string
  subtitle?: string
  description: string
  cover: string
  category: "fiction" | "technical" | "self-help" | "poetry" | "other"
  status: "published" | "draft" | "coming-soon"
  publishDate: string
  pages?: number
  rating?: number
  downloadUrl?: string
  previewUrl?: string
  tags: string[]
}

const books: Book[] = [
  {
    id: 1,
    title: "Digital Dreams",
    subtitle: "A Journey Through Code and Creativity",
    description:
      "An inspiring collection of stories about the intersection of technology and human creativity. Explore how digital innovation shapes our world and transforms the way we think, create, and connect.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "technical",
    status: "published",
    publishDate: "2024-01-15",
    pages: 245,
    rating: 4.8,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Technology", "Innovation", "Creativity", "Future"],
  },
  {
    id: 2,
    title: "Midnight Algorithms",
    subtitle: "Poetry in the Age of AI",
    description:
      "A unique blend of poetry and programming concepts. Each poem explores the beauty found in algorithms, data structures, and the elegant logic that powers our digital world.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "poetry",
    status: "published",
    publishDate: "2023-09-22",
    pages: 128,
    rating: 4.6,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Poetry", "AI", "Programming", "Art"],
  },
  {
    id: 3,
    title: "The Developer's Mindset",
    subtitle: "Building Mental Models for Success",
    description:
      "A comprehensive guide to developing the right mindset for software development. Learn how to approach problems, think systematically, and build resilience in your coding journey.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "self-help",
    status: "published",
    publishDate: "2023-06-10",
    pages: 312,
    rating: 4.9,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Development", "Mindset", "Career", "Growth"],
  },
  {
    id: 4,
    title: "Quantum Narratives",
    description:
      "A science fiction novel exploring parallel universes through the lens of quantum computing. Follow the protagonist as they navigate multiple realities and discover the true nature of existence.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "fiction",
    status: "draft",
    publishDate: "2024-06-01",
    pages: 420,
    tags: ["Sci-Fi", "Quantum", "Adventure", "Philosophy"],
  },
  {
    id: 5,
    title: "Code & Coffee",
    subtitle: "Daily Reflections for Developers",
    description:
      "A collection of short, daily reflections designed to inspire and motivate developers. Perfect for morning reading with your coffee, each entry offers wisdom for the coding journey ahead.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "self-help",
    status: "coming-soon",
    publishDate: "2024-08-15",
    pages: 180,
    tags: ["Daily", "Motivation", "Development", "Inspiration"],
  },
  {
    id: 6,
    title: "The Art of Clean Architecture",
    description:
      "An in-depth exploration of software architecture principles, design patterns, and best practices. Learn how to build maintainable, scalable, and elegant software systems.",
    cover: "/placeholder.svg?height=400&width=300",
    category: "technical",
    status: "coming-soon",
    publishDate: "2024-10-01",
    pages: 380,
    tags: ["Architecture", "Design Patterns", "Best Practices", "Software"],
  },
]

const categories = [
  { id: "all", label: "All Books", icon: BookOpen },
  { id: "technical", label: "Technical", icon: BookOpen },
  { id: "fiction", label: "Fiction", icon: BookOpen },
  { id: "poetry", label: "Poetry", icon: BookOpen },
  { id: "self-help", label: "Self-Help", icon: BookOpen },
  { id: "other", label: "Other", icon: BookOpen },
]

const statusColors = {
  published: "bg-green-600",
  draft: "bg-yellow-600",
  "coming-soon": "bg-blue-600",
}

const statusLabels = {
  published: "Published",
  draft: "Draft",
  "coming-soon": "Coming Soon",
}

export default function MyBooks() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)

  const filteredBooks = selectedCategory === "all" ? books : books.filter((book) => book.category === selectedCategory)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ))
  }

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
            <h1 className="text-2xl md:text-3xl font-bold text-purple-300">My Books</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Literary Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to my collection of written works. From technical guides to creative fiction, each book represents a
            unique exploration of ideas, experiences, and insights I'm passionate about sharing.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {books.filter((book) => book.status === "published").length}
            </div>
            <div className="text-gray-300">Published Books</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {books.filter((book) => book.status === "draft").length}
            </div>
            <div className="text-gray-300">In Progress</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {books.filter((book) => book.status === "coming-soon").length}
            </div>
            <div className="text-gray-300">Coming Soon</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {books.reduce((total, book) => total + (book.pages || 0), 0).toLocaleString()}
            </div>
            <div className="text-gray-300">Total Pages</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              {/* Book Cover */}
              <div className="relative overflow-hidden">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[book.status]}`}
                >
                  {statusLabels[book.status]}
                </div>

                {/* Hover Overlay */}
                {hoveredBook === book.id && book.status === "published" && (
                  <div className="absolute inset-0 bg-purple-600/80 flex items-center justify-center gap-4">
                    {book.previewUrl && (
                      <a
                        href={book.previewUrl}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        title="Preview"
                      >
                        <ExternalLink className="w-6 h-6 text-white" />
                      </a>
                    )}
                    {book.downloadUrl && (
                      <a
                        href={book.downloadUrl}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        title="Download"
                      >
                        <Download className="w-6 h-6 text-white" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Book Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-purple-300">{book.title}</h3>
                {book.subtitle && <h4 className="text-sm text-purple-200 mb-3 opacity-80">{book.subtitle}</h4>}

                <p className="text-gray-300 mb-4 leading-relaxed text-sm">{book.description}</p>

                {/* Book Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(book.publishDate).getFullYear()}
                  </div>
                  {book.pages && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {book.pages} pages
                    </div>
                  )}
                </div>

                {/* Rating */}
                {book.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">{renderStars(book.rating)}</div>
                    <span className="text-sm text-gray-400">({book.rating})</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-700 text-purple-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4 text-purple-300">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to my newsletter to get notified about new book releases, exclusive previews, and
            behind-the-scenes insights into my writing process.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Subscribe to Updates
          </Link>
        </div>
      </main>
    </div>
  )
}
