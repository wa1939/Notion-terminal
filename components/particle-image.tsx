"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface ParticleImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
  dotSpacing?: number
}

// Particle Engine Configuration
const T_SCATTER_HOLD = 200;       // Initial hold of scatter
const T_TO_IMG = 2500;            // Scatter -> Image transition duration
const TOTAL_TIME = T_SCATTER_HOLD + T_TO_IMG;

// Ease-in-out cubic for organic acceleration/deceleration
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Linear interpolation
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleImage({
  src,
  alt,
  className = "",
  width = 400,
  height = 500,
  dotSpacing = 6,
}: ParticleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Allow transparent background to render gooey filter correctly
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let particles: any[] = []
    let cw = canvas.width
    let ch = canvas.height
    let startTime: number | null = null
    const maxDotRadius = dotSpacing * 0.85

    // Image loading & processing
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = () => {
      // 1. Draw image to offscreen canvas to sample data
      const offCanvas = document.createElement("canvas")
      offCanvas.width = cw
      offCanvas.height = ch
      const oCtx = offCanvas.getContext("2d")
      if (!oCtx) return

      // Fill with white so totally transparent areas become white (radius 0)
      oCtx.fillStyle = "#ffffff"
      oCtx.fillRect(0, 0, cw, ch)
      
      // Calculate object-cover dimensions to fill canvas
      const imgRatio = img.width / img.height
      const canvasRatio = cw / ch
      let renderW, renderH, renderX, renderY

      if (imgRatio > canvasRatio) {
        renderH = ch
        renderW = ch * imgRatio
        renderX = (cw - renderW) / 2
        renderY = 0
      } else {
        renderW = cw
        renderH = cw / imgRatio
        renderX = 0
        renderY = (ch - renderH) / 2
      }

      oCtx.drawImage(img, renderX, renderY, renderW, renderH)
      const imgData = oCtx.getImageData(0, 0, cw, ch).data

      // 2. Generate Grid and Particles based on brightness
      const cols = Math.floor(cw / dotSpacing)
      const rows = Math.floor(ch / dotSpacing)
      const offsetX = (cw - cols * dotSpacing) / 2
      const offsetY = (ch - rows * dotSpacing) / 2

      particles = []

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = offsetX + c * dotSpacing + dotSpacing / 2
          const gy = offsetY + r * dotSpacing + dotSpacing / 2

          const safeX = Math.min(Math.floor(gx), cw - 1)
          const safeY = Math.min(Math.floor(gy), ch - 1)
          const i = (safeY * cw + safeX) * 4

          // Brightness (0 to 1), handling transparency
          let b = (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3 / 255
          
          // Target Radius (inverted brightness)
          const targetR = (1 - b) * maxDotRadius

          // Optimization: Drop empty pixels
          if (targetR < 0.2 && Math.random() > 0.05) {
            continue
          }

          // Initial Scattered State
          const startX = Math.random() * cw
          const startY = Math.random() * ch
          const startR = Math.random() * 2 + 0.5 

          particles.push({
            sx: startX, sy: startY, sr: startR, // Start (Scattered)
            tx: gx, ty: gy, tr: targetR       // Target (Resolved)
          })
        }
      }

      setIsLoaded(true)
      startTime = performance.now()
      loop(startTime)
    }

    // 3. Animation Loop
    const loop = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      let t = timestamp - startTime

      ctx.clearRect(0, 0, cw, ch)
      
      // Stable color selection based on theme
      const isMatrix = theme === 'matrix'
      ctx.fillStyle = isMatrix ? "#00ff00" : "#d4d4d8" // clean term-gray/white for default

      ctx.beginPath()

      let p = 0
      if (t < T_SCATTER_HOLD) {
        p = 0
      } else if (t < T_SCATTER_HOLD + T_TO_IMG) {
        p = (t - T_SCATTER_HOLD) / T_TO_IMG
      } else {
        p = 1
      }

      const easedP = easeInOutCubic(Math.min(p, 1))

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i]
        
        const cx = lerp(pt.sx, pt.tx, easedP)
        const cy = lerp(pt.sy, pt.ty, easedP)
        const cr = Math.max(0, lerp(pt.sr, pt.tr, easedP))

        if (cr > 0.5) {
          ctx.moveTo(cx + cr, cy)
          ctx.arc(cx, cy, cr, 0, Math.PI * 2)
        }
      }

      ctx.fill()

      if (p < 1) {
        animationFrameId = requestAnimationFrame(loop)
      } else {
        // We're done animating, keep it static
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [src, dotSpacing, theme])

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden bg-term-darker ${className}`} 
      style={{ width: "100%", height: "100%" }}
    >
      {/* Fallback while loading analysis */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-term-gray text-xs font-mono uppercase tracking-widest">
          [ parsing bio-metrics... ]
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        style={{ 
          transform: "translateZ(0)",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.2s ease"
        }}
      />
    </div>
  )
}
