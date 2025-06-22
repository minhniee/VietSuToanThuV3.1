"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Sword, Crown, Scroll, Users } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  description: string
  events: string[]
  type: string
}

interface DetailedMapProps {
  locations: MapLocation[]
}

export function DetailedMap({ locations }: DetailedMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)

  const types = Array.from(new Set(locations.map((location) => location.type)))

  const filteredLocations = activeType ? locations.filter((location) => location.type === activeType) : locations

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "capital":
        return <Crown className="h-4 w-4" />
      case "battle":
        return <Sword className="h-4 w-4" />
      case "cultural":
        return <Scroll className="h-4 w-4" />
      case "uprising":
        return <Users className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getLocationColor = (type: string) => {
    switch (type) {
      case "capital":
        return "bg-purple-500"
      case "battle":
        return "bg-red-500"
      case "cultural":
        return "bg-green-500"
      case "uprising":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLocationLabel = (type: string) => {
    switch (type) {
      case "capital":
        return "Kinh đô"
      case "battle":
        return "Chiến trận"
      case "cultural":
        return "Văn hóa"
      case "uprising":
        return "Khởi nghĩa"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={activeType === null ? "default" : "outline"} size="sm" onClick={() => setActiveType(null)}>
          Tất cả
        </Button>
        {types.map((type) => (
          <Button
            key={type}
            variant={activeType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveType(type)}
            className="flex items-center gap-1"
          >
            {getLocationIcon(type)}
            {getLocationLabel(type)}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-200 to-green-200">
                {/* Vietnam map outline - simplified */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                >
                  <path
                    d="M45 10 Q50 8 55 10 L60 15 Q65 20 62 25 L58 30 Q55 35 50 32 L45 28 Q40 25 42 20 L45 15 Q43 12 45 10 Z
                       M42 35 Q48 33 52 35 L55 40 Q58 45 55 50 L52 55 Q50 60 48 58 L45 55 Q42 50 44 45 L42 40 Q40 37 42 35 Z
                       M44 62 Q50 60 54 62 L58 67 Q62 72 60 77 L58 82 Q55 87 52 85 L48 82 Q44 77 46 72 L44 67 Q42 64 44 62 Z"
                    fill="#10b981"
                    stroke="#059669"
                    strokeWidth="0.5"
                    opacity="0.8"
                  />
                </svg>

                {/* Location markers */}
                {filteredLocations.map((location) => {
                  // Convert lat/lng to approximate x/y coordinates on our simplified map
                  // This is a very simplified conversion for demonstration
                  const x = ((location.coordinates.lng - 102) / 10) * 100
                  const y = ((23 - location.coordinates.lat) / 14) * 100

                  return (
                    <button
                      key={location.id}
                      className={`absolute rounded-full p-1 ${getLocationColor(
                        location.type,
                      )} text-white hover:scale-125 transition-transform`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => setSelectedLocation(location)}
                      aria-label={location.name}
                    >
                      {getLocationIcon(location.type)}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-4">
              {selectedLocation ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${getLocationColor(selectedLocation.type)} text-white`}>
                      {getLocationIcon(selectedLocation.type)}
                    </div>
                    <h3 className="text-lg font-semibold">{selectedLocation.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                  {selectedLocation.events.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Sự kiện lịch sử:</h4>
                      <ul className="text-sm space-y-1">
                        {selectedLocation.events.map((event, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    Tọa độ: {selectedLocation.coordinates.lat}°N, {selectedLocation.coordinates.lng}°E
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MapPin className="h-8 w-8 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-600">Chọn địa điểm</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Nhấn vào các điểm trên bản đồ để xem thông tin chi tiết về các địa điểm lịch sử.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
