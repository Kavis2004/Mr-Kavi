// Import Three.js library
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Shape animation data
const shapeData = []
let animationId
let startTime = null

// Animation configuration for each shape
const shapeAnimationConfig = [
  { delay: 0, amplitude: 12, frequency: 0.45, parallaxSpeed: 0.05 },
  { delay: 0.5, amplitude: 15, frequency: 0.35, parallaxSpeed: 0.08 },
  { delay: 1.0, amplitude: 8, frequency: 0.55, parallaxSpeed: 0.03 },
  { delay: 1.5, amplitude: 10, frequency: 0.4, parallaxSpeed: 0.06 },
]

// Initialize 3D Logo
function init3DLogo() {
  const canvas = document.getElementById("logo-canvas")
  if (!canvas) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })

  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  // Create simple 3D text using basic geometry
  const createLetter = (letter, color, position) => {
    const geometry = new THREE.BoxGeometry(0.8, 1.2, 0.15)
    const material = new THREE.MeshStandardMaterial({ color: color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    return mesh
  }

  // Create K and V letters
  const letterK = createLetter("K", 0xdc2626, [-0.6, 0, 0])
  const letterV = createLetter("V", 0xffffff, [0.2, 0, 0])

  scene.add(letterK)
  scene.add(letterV)

  camera.position.z = 5

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 2

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  })
}

// Initialize shape animations
function initShapeAnimations() {
  const shapes = [
    document.getElementById("shape1"),
    document.getElementById("shape2"),
    document.getElementById("shape3"),
    document.getElementById("shape4"),
  ]

  shapes.forEach((element, index) => {
    if (element) {
      const config = shapeAnimationConfig[index % shapeAnimationConfig.length]
      shapeData.push({
        element,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        baseFloatOffsetY: 0,
        animationDelay: config.delay,
        floatAmplitude: config.amplitude,
        floatFrequency: config.frequency,
        parallaxSpeedFactor: config.parallaxSpeed,
      })
    }
  })
}

// Mouse move handler
function handleMouseMove(event) {
  const mouseX = event.clientX
  const mouseY = event.clientY

  // Update target positions for parallax effect
  shapeData.forEach((data) => {
    const xOffset = (mouseX - window.innerWidth / 2) * data.parallaxSpeedFactor
    const yOffset = (mouseY - window.innerHeight / 2) * data.parallaxSpeedFactor

    data.targetX = -xOffset
    data.targetY = -yOffset
  })
}

// Animation loop
function animateShapes(timestamp) {
  if (!startTime) {
    startTime = timestamp
  }

  const elapsedTimeInSeconds = (timestamp - startTime) / 1000

  shapeData.forEach((data) => {
    if (!data.element) return

    // Smooth interpolation for parallax
    const easingFactor = 0.05
    data.currentX += (data.targetX - data.currentX) * easingFactor
    data.currentY += (data.targetY - data.currentY) * easingFactor

    // Calculate floating movement
    const timeForFloat = elapsedTimeInSeconds + data.animationDelay
    data.baseFloatOffsetY = Math.sin(timeForFloat * data.floatFrequency) * data.floatAmplitude

    // Apply transformations
    const finalTranslateX = data.currentX
    const finalTranslateY = data.currentY + data.baseFloatOffsetY

    data.element.style.transform = `translate(${finalTranslateX}px, ${finalTranslateY}px)`
  })

  animationId = requestAnimationFrame(animateShapes)
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init3DLogo()
  initShapeAnimations()

  // Start animations
  document.addEventListener("mousemove", handleMouseMove)
  animationId = requestAnimationFrame(animateShapes)
})

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  document.removeEventListener("mousemove", handleMouseMove)
})
