// Books data
const books = [
  {
    id: 1,
    title: "Digital Dreams",
    subtitle: "A Journey Through Code and Creativity",
    description:
      "An inspiring collection of stories about the intersection of technology and human creativity. Explore how digital innovation shapes our world and transforms the way we think, create, and connect.",
    cover: "https://via.placeholder.com/300x400/6366f1/ffffff?text=Digital+Dreams",
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
    cover: "https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Midnight+Algorithms",
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
    cover: "https://via.placeholder.com/300x400/ec4899/ffffff?text=Developer+Mindset",
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
    cover: "https://via.placeholder.com/300x400/10b981/ffffff?text=Quantum+Narratives",
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
    cover: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=Code+Coffee",
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
    cover: "https://via.placeholder.com/300x400/ef4444/ffffff?text=Clean+Architecture",
    category: "technical",
    status: "coming-soon",
    publishDate: "2024-10-01",
    pages: 380,
    tags: ["Architecture", "Design Patterns", "Best Practices", "Software"],
  },
]

const categories = [
  { id: "all", label: "All Books", icon: "book-open" },
  { id: "technical", label: "Technical", icon: "book-open" },
  { id: "fiction", label: "Fiction", icon: "book-open" },
  { id: "poetry", label: "Poetry", icon: "book-open" },
  { id: "self-help", label: "Self-Help", icon: "book-open" },
  { id: "other", label: "Other", icon: "book-open" },
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

let selectedBookCategory = "all"
let hoveredBook = null

// Initialize books page
function initBooks() {
  renderStats()
  renderBookCategories()
  renderBooks()
}

// Render statistics
function renderStats() {
  const statsSection = document.getElementById("stats-section")
  const publishedCount = books.filter((book) => book.status === "published").length
  const draftCount = books.filter((book) => book.status === "draft").length
  const comingSoonCount = books.filter((book) => book.status === "coming-soon").length
  const totalPages = books.reduce((total, book) => total + (book.pages || 0), 0)

  statsSection.innerHTML = `
        <div class="bg-slate-800 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-purple-400 mb-2">${publishedCount}</div>
            <div class="text-gray-300">Published Books</div>
        </div>
        <div class="bg-slate-800 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2">${draftCount}</div>
            <div class="text-gray-300">In Progress</div>
        </div>
        <div class="bg-slate-800 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-blue-400 mb-2">${comingSoonCount}</div>
            <div class="text-gray-300">Coming Soon</div>
        </div>
        <div class="bg-slate-800 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-green-400 mb-2">${totalPages.toLocaleString()}</div>
            <div class="text-gray-300">Total Pages</div>
        </div>
    `
}

// Render book categories
function renderBookCategories() {
  const categoryFilter = document.getElementById("book-category-filter")

  categoryFilter.innerHTML = categories
    .map(
      (category) => `
        <button class="book-category-btn ${category.id === "all" ? "active" : ""} flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
                data-category="${category.id}">
            <i data-lucide="${category.icon}" class="w-4 h-4"></i>
            ${category.label}
        </button>
    `,
    )
    .join("")

  // Setup category filter
  setupBookCategoryFilter()
  window.lucide.createIcons()
}

// Setup book category filter
function setupBookCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".book-category-btn")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-purple-600", "text-white", "shadow-lg")
        btn.classList.add("bg-slate-800", "text-gray-300", "hover:bg-slate-700", "hover:text-white")
      })

      // Add active class to clicked button
      button.classList.add("active", "bg-purple-600", "text-white", "shadow-lg")
      button.classList.remove("bg-slate-800", "text-gray-300", "hover:bg-slate-700", "hover:text-white")

      // Update selected category and re-render
      selectedBookCategory = button.dataset.category
      renderBooks()
    })
  })
}

// Render books based on selected category
function renderBooks() {
  const booksGrid = document.getElementById("books-grid")
  const filteredBooks =
    selectedBookCategory === "all" ? books : books.filter((book) => book.category === selectedBookCategory)

  booksGrid.innerHTML = filteredBooks
    .map(
      (book) => `
        <div class="book-card bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
             data-book-id="${book.id}"
             onmouseenter="setHoveredBook(${book.id})"
             onmouseleave="setHoveredBook(null)">
            <!-- Book Cover -->
            <div class="relative overflow-hidden">
                <img
                    src="${book.cover}"
                    alt="${book.title}"
                    class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />

                <!-- Status Badge -->
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[book.status]}">
                    ${statusLabels[book.status]}
                </div>

                <!-- Hover Overlay -->
                ${
                  book.status === "published"
                    ? `
                    <div class="book-overlay absolute inset-0 bg-purple-600/80 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300">
                        ${
                          book.previewUrl
                            ? `
                            <a
                                href="${book.previewUrl}"
                                class="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                title="Preview"
                            >
                                <i data-lucide="external-link" class="w-6 h-6 text-white"></i>
                            </a>
                        `
                            : ""
                        }
                        ${
                          book.downloadUrl
                            ? `
                            <a
                                href="${book.downloadUrl}"
                                class="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                title="Download"
                            >
                                <i data-lucide="download" class="w-6 h-6 text-white"></i>
                            </a>
                        `
                            : ""
                        }
                    </div>
                `
                    : ""
                }
            </div>

            <!-- Book Content -->
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-purple-300">${book.title}</h3>
                ${book.subtitle ? `<h4 class="text-sm text-purple-200 mb-3 opacity-80">${book.subtitle}</h4>` : ""}

                <p class="text-gray-300 mb-4 leading-relaxed text-sm">${book.description}</p>

                <!-- Book Details -->
                <div class="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div class="flex items-center gap-1">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        ${new Date(book.publishDate).getFullYear()}
                    </div>
                    ${
                      book.pages
                        ? `
                        <div class="flex items-center gap-1">
                            <i data-lucide="book-open" class="w-4 h-4"></i>
                            ${book.pages} pages
                        </div>
                    `
                        : ""
                    }
                </div>

                <!-- Rating -->
                ${
                  book.rating
                    ? `
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex gap-1">
                            ${renderStars(book.rating)}
                        </div>
                        <span class="text-sm text-gray-400">(${book.rating})</span>
                    </div>
                `
                    : ""
                }

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                    ${book.tags
                      .map(
                        (tag) => `
                        <span class="px-2 py-1 bg-slate-700 text-purple-300 text-xs rounded-full">
                            ${tag}
                        </span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  // Re-initialize Lucide icons for new content
  window.lucide.createIcons()
}

// Render star rating
function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating)
    return `<i data-lucide="star" class="w-4 h-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-400"}"></i>`
  }).join("")
}

// Set hovered book
function setHoveredBook(bookId) {
  hoveredBook = bookId

  // Show/hide overlay for the specific book
  const bookCard = document.querySelector(`[data-book-id="${bookId}"]`)
  if (bookCard) {
    const overlay = bookCard.querySelector(".book-overlay")
    if (overlay) {
      if (bookId === null) {
        overlay.style.opacity = "0"
      } else {
        overlay.style.opacity = "1"
      }
    }
  }

  // Hide overlays for other books
  if (bookId === null) {
    document.querySelectorAll(".book-overlay").forEach((overlay) => {
      overlay.style.opacity = "0"
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initBooks)
