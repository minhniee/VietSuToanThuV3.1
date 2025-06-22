import { Hero } from "@/components/hero"
import { FeaturedPeriods } from "@/components/featured-periods"
import { InteractiveMap } from "@/components/interactive-map"
import { QuickStats } from "@/components/quick-stats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white relative">
      {/* Background Vietnam Map */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vietnam_location_map.svg/500px-Vietnam_location_map.svg.png"
          alt="Vietnam Map Background"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <QuickStats />
        <FeaturedPeriods />
        <InteractiveMap />
      </div>
    </div>
  )
}
