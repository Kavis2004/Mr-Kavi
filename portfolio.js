// Projects data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce",
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
    image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Task+Manager",
    technologies: ["React Native", "Firebase", "Redux", "AsyncStorage"],
    githubUrl: "https://github.com",
    category: "mobile",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    description:
      "Complete brand identity design for a tech startup including logo, color palette, typography, and marketing materials.",
    image: "https://via.placeholder.com/400x300/ec4899/ffffff?text=Brand+Design",
    technologies: ["Adobe Illustrator", "Figma", "Photoshop"],
    category: "design",
  },
  {
    id: 4,
    title: "AI Chat Application",
    description:
      "Real-time chat application with AI integration, featuring natural language processing and smart responses.",
    image: "https://via.placeholder.com/400x300/10b981/ffffff?text=AI+Chat",
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
    image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Dashboard",
    technologies: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
    liveUrl: "https://example.com",
    category: "web",
  },
  {
    id: 6,
    title: "IoT Home Automation",
    description: "Smart home automation system with IoT devices, mobile control, and energy monitoring capabilities.",
    image: "https://via.placeholder.com/400x300/ef4444/ffffff?text=IoT+Home",
    technologies: ["Arduino", "Raspberry Pi", "React Native", "MQTT"],
    githubUrl: "https://github.com",
    category: "other",
  },
]

let selectedCategory = "all"
let hoveredProject = null

// Initialize portfolio
function initPortfolio() {
  renderProjects()
  setupCategoryFilter()
}

// Render projects based on selected category
function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid")
  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  projectsGrid.innerHTML = filteredProjects
    .map(
      (project) => `
        <div class="project-card bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
             data-project-id="${project.id}"
             onmouseenter="setHoveredProject(${project.id})"
             onmouseleave="setHoveredProject(null)">
            <!-- Project Image -->
            <div class="relative overflow-hidden">
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div class="project-overlay absolute inset-0 bg-purple-600/80 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300">
                    ${
                      project.liveUrl
                        ? `
                        <a
                            href="${project.liveUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            title="View Live Demo"
                        >
                            <i data-lucide="external-link" class="w-6 h-6 text-white"></i>
                        </a>
                    `
                        : ""
                    }
                    ${
                      project.githubUrl
                        ? `
                        <a
                            href="${project.githubUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            title="View Source Code"
                        >
                            <i data-lucide="github" class="w-6 h-6 text-white"></i>
                        </a>
                    `
                        : ""
                    }
                </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3 text-purple-300">${project.title}</h3>
                <p class="text-gray-300 mb-4 leading-relaxed">${project.description}</p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2">
                    ${project.technologies
                      .map(
                        (tech) => `
                        <span class="px-3 py-1 bg-slate-700 text-purple-300 text-sm rounded-full">
                            ${tech}
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
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }
}

// Setup category filter
function setupCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn")

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
      selectedCategory = button.dataset.category
      renderProjects()
    })
  })
}

// Set hovered project
function setHoveredProject(projectId) {
  hoveredProject = projectId

  // Show/hide overlay for the specific project
  const projectCard = document.querySelector(`[data-project-id="${projectId}"]`)
  if (projectCard) {
    const overlay = projectCard.querySelector(".project-overlay")
    if (overlay) {
      if (projectId === null) {
        overlay.style.opacity = "0"
      } else {
        overlay.style.opacity = "1"
      }
    }
  }

  // Hide overlays for other projects
  if (projectId === null) {
    document.querySelectorAll(".project-overlay").forEach((overlay) => {
      overlay.style.opacity = "0"
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initPortfolio)
