"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sword, Users, Crown, Scroll, Filter, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TimelineEvent {
  year: string
  title: string
  description: string
  category: string
  location?: { lat: number; lng: number }
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const [filters, setFilters] = useState<string[]>([])
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const categories = Array.from(new Set(events.map((event) => event.category)))

  const filteredEvents = filters.length > 0 ? events.filter((event) => filters.includes(event.category)) : events

  const toggleFilter = (category: string) => {
    setFilters((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "political":
        return <Crown className="h-4 w-4" />
      case "battle":
        return <Sword className="h-4 w-4" />
      case "uprising":
        return <Users className="h-4 w-4" />
      case "cultural":
        return <Scroll className="h-4 w-4" />
      default:
        return <Crown className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "political":
        return "bg-purple-500"
      case "battle":
        return "bg-red-500"
      case "uprising":
        return "bg-blue-500"
      case "cultural":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "political":
        return "Chính trị"
      case "battle":
        return "Chiến tranh"
      case "uprising":
        return "Khởi nghĩa"
      case "cultural":
        return "Văn hóa"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={filters.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(category)}
            >
              <span className="flex items-center gap-1">
                {getCategoryIcon(category)}
                {getCategoryLabel(category)}
              </span>
            </Badge>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.includes(category)}
                onCheckedChange={() => toggleFilter(category)}
              >
                {getCategoryLabel(category)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Timeline events */}
        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-1.5 h-8 w-8 rounded-full ${getCategoryColor(
                  event.category,
                )} flex items-center justify-center text-white`}
              >
                {getCategoryIcon(event.category)}
              </div>

              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge variant="outline" className="mt-1">
                          {event.year}
                        </Badge>
                      </div>
                      <Badge variant="secondary">{getCategoryLabel(event.category)}</Badge>
                    </div>

                    <p className="text-gray-700 mt-2">{event.description}</p>

                    {event.location && (
                      <Button
                        variant="link"
                        className="p-0 h-auto justify-start text-blue-600"
                        onClick={() => setExpandedEvent(expandedEvent === event.title ? null : event.title)}
                      >
                        {expandedEvent === event.title ? "Ẩn vị trí" : "Xem vị trí"}
                      </Button>
                    )}

                    {expandedEvent === event.title && event.location && (
                      <div className="mt-2 aspect-video w-full rounded-md bg-gray-100 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>
                            Vị trí: {event.location.lat}, {event.location.lng}
                          </p>
                          <p className="text-sm">(Bản đồ chi tiết có trong tab Bản đồ)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
