import Image from "next/image"

interface SkillIconProps {
  icon: string
  name: string
  color?: string
}

export default function SkillIcon({ icon, name, color = "cyan" }: SkillIconProps) {
  return (
    <div className="group relative">
      <div
        className={`
        relative w-16 h-16 flex items-center justify-center rounded-xl
        bg-retro-dark border border-retro-${color}/20
        transition-all duration-300
        hover:scale-110 hover:border-retro-${color}
        hover:shadow-[0_0_20px_rgba(100,228,255,0.3)]
      `}
      >
        <Image
          src={icon || "/placeholder.svg"}
          alt={name}
          width={32}
          height={32}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {/* Glow Effect */}
        <div
          className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          bg-gradient-to-r from-retro-${color}/0 via-retro-${color}/10 to-retro-${color}/0
          transition-opacity duration-300
        `}
        ></div>
      </div>

      {/* Tooltip */}
      <div
        className={`
        absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded
        bg-retro-dark border border-retro-${color}/20
        text-xs text-retro-${color}
        opacity-0 group-hover:opacity-100
        transition-all duration-300 transform group-hover:-translate-y-1
      `}
      >
        {name}
      </div>
    </div>
  )
}

