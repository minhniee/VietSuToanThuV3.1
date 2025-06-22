"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Sword,
  Crown,
  Scroll,
  Users,
  Calendar,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MapLocation {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  description: string
  events: string[]
  type: "capital" | "battle" | "cultural" | "uprising" | "trade" | "religious"
  period: string
  year: number
  importance: "low" | "medium" | "high"
  images?: string[]
  relatedEvents?: string[]
  modernName?: string
  population?: number
  area?: number
  keyFigures?: string[]
  artifacts?: string[]
  accessibility?: {
    hasAudio: boolean
    hasVideo: boolean
    hasTranscript: boolean
  }
}

interface MapFilters {
  searchQuery: string
  selectedTypes: string[]
  selectedPeriods: string[]
  yearRange: [number, number]
  importanceLevel: string[]
  showLabels: boolean
  showConnections: boolean
  mapStyle: "default" | "satellite" | "terrain" | "historical"
}

interface EnhancedInteractiveMapProps {
  locations: MapLocation[]
  className?: string
}

// Sample enhanced location data
const sampleLocations: MapLocation[] = [
  {
    id: "thang-long",
    name: "Thăng Long",
    coordinates: { lat: 21.0285, lng: 105.8542 },
    description: "Kinh đô của nhiều triều đại phong kiến Việt Nam, nay là Hà Nội.",
    events: ["Lý Thái Tổ dời đô (1010)", "Trần Thủ Độ cải cách (1225)", "Lê Lợi lên ngôi (1428)"],
    type: "capital",
    period: "Thời kỳ phong kiến",
    year: 1010,
    importance: "high",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Hà Nội",
    population: 8000000,
    keyFigures: ["Lý Thái Tổ", "Trần Thủ Độ", "Lê Lợi"],
    accessibility: { hasAudio: true, hasVideo: true, hasTranscript: true },
  },
  {
    id: "bach-dang",
    name: "Sông Bạch Đằng",
    coordinates: { lat: 20.9, lng: 106.8 },
    description: "Nơi diễn ra các trận thủy chiến lịch sử chống quân xâm lược.",
    events: ["Ngô Quyền đại phá quân Nam Hán (938)", "Trần Hưng Đạo đánh Nguyên Mông (1288)"],
    type: "battle",
    period: "Thời kỳ Bắc thuộc",
    year: 938,
    importance: "high",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Quảng Ninh - Hải Phòng",
    keyFigures: ["Ngô Quyền", "Trần Hưng Đạo"],
    accessibility: { hasAudio: true, hasVideo: false, hasTranscript: true },
  },
  {
    id: "me-linh",
    name: "Mê Linh",
    coordinates: { lat: 21.1667, lng: 105.7333 },
    description: "Quê hương của Hai Bà Trưng, nơi khởi phát cuộc khởi nghĩa chống Hán.",
    events: ["Khởi nghĩa Hai Bà Trưng (40-43)", "Thành lập nước Việt Nam đầu tiên"],
    type: "uprising",
    period: "Thời kỳ Bắc thuộc",
    year: 40,
    importance: "high",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Hà Nội",
    keyFigures: ["Trưng Trắc", "Trưng Nhị"],
    accessibility: { hasAudio: true, hasVideo: true, hasTranscript: true },
  },
  {
    id: "hoi-an",
    name: "Hội An",
    coordinates: { lat: 15.8801, lng: 108.338 },
    description: "Thương cảng quốc tế quan trọng thời Nguyễn chúa.",
    events: ["Thành lập thương cảng (thế kỷ 15)", "Giao thương quốc tế phát triển"],
    type: "trade",
    period: "Thời kỳ phong kiến",
    year: 1400,
    importance: "medium",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Quảng Nam",
    accessibility: { hasAudio: false, hasVideo: true, hasTranscript: true },
  },
  {
    id: "van-mieu",
    name: "Văn Miếu",
    coordinates: { lat: 21.0267, lng: 105.8355 },
    description: "Trường đại học đầu tiên của Việt Nam, nơi thờ Khổng Tử.",
    events: ["Xây dựng Văn Miếu (1070)", "Thành lập Quốc Tử Giám (1076)"],
    type: "cultural",
    period: "Thời kỳ phong kiến",
    year: 1070,
    importance: "high",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Hà Nội",
    keyFigures: ["Lý Thánh Tông"],
    accessibility: { hasAudio: true, hasVideo: true, hasTranscript: true },
  },
  {
    id: "dien-bien-phu",
    name: "Điện Biên Phủ",
    coordinates: { lat: 21.3833, lng: 103.0167 },
    description: "Nơi diễn ra chiến thắng lịch sử chống thực dân Pháp.",
    events: ["Chiến dịch Điện Biên Phủ (1954)", "Kết thúc ách đô hộ của Pháp"],
    type: "battle",
    period: "Thời kỳ hiện đại",
    year: 1954,
    importance: "high",
    images: ["/placeholder.svg?height=200&width=300"],
    modernName: "Điện Biên",
    keyFigures: ["Võ Nguyên Giáp", "Hồ Chí Minh"],
    accessibility: { hasAudio: true, hasVideo: true, hasTranscript: true },
  },
]

export function EnhancedInteractiveMap({ locations = sampleLocations, className }: EnhancedInteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showFilters, setShowFilters] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0)

  const [filters, setFilters] = useState<MapFilters>({
    searchQuery: "",
    selectedTypes: [],
    selectedPeriods: [],
    yearRange: [0, 2000],
    importanceLevel: [],
    showLabels: true,
    showConnections: false,
    mapStyle: "default",
  })

  // Get unique values for filters
  const uniqueTypes = useMemo(() => Array.from(new Set(locations.map((loc) => loc.type))), [locations])

  const uniquePeriods = useMemo(() => Array.from(new Set(locations.map((loc) => loc.period))), [locations])

  const minYear = useMemo(() => Math.min(...locations.map((loc) => loc.year)), [locations])

  const maxYear = useMemo(() => Math.max(...locations.map((loc) => loc.year)), [locations])

  // Filter locations based on current filters
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        location.events.some((event) => event.toLowerCase().includes(filters.searchQuery.toLowerCase()))

      const matchesType = filters.selectedTypes.length === 0 || filters.selectedTypes.includes(location.type)
      const matchesPeriod = filters.selectedPeriods.length === 0 || filters.selectedPeriods.includes(location.period)
      const matchesYear = location.year >= filters.yearRange[0] && location.year <= filters.yearRange[1]
      const matchesImportance =
        filters.importanceLevel.length === 0 || filters.importanceLevel.includes(location.importance)

      return matchesSearch && matchesType && matchesPeriod && matchesYear && matchesImportance
    })
  }, [locations, filters])

  // Timeline functionality
  const timelineLocations = useMemo(() => {
    return [...filteredLocations].sort((a, b) => a.year - b.year)
  }, [filteredLocations])

  useEffect(() => {
    if (isPlaying && timelineLocations.length > 0) {
      const interval = setInterval(() => {
        setCurrentTimelineIndex((prev) => {
          if (prev >= timelineLocations.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, timelineLocations.length])

  useEffect(() => {
    if (isPlaying && timelineLocations[currentTimelineIndex]) {
      setSelectedLocation(timelineLocations[currentTimelineIndex])
    }
  }, [currentTimelineIndex, isPlaying, timelineLocations])

  // Map interaction handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    },
    [pan],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setSelectedLocation(null)
  }, [])

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
      case "trade":
        return <MapPin className="h-4 w-4" />
      case "religious":
        return <Calendar className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getLocationColor = (type: string, importance: string) => {
    const baseColors = {
      capital: "purple",
      battle: "red",
      cultural: "green",
      uprising: "blue",
      trade: "amber",
      religious: "indigo",
    }

    const intensities = {
      low: "400",
      medium: "500",
      high: "600",
    }

    const color = baseColors[type as keyof typeof baseColors] || "gray"
    const intensity = intensities[importance as keyof typeof intensities] || "500"

    return `bg-${color}-${intensity} hover:bg-${color}-${Number.parseInt(intensity) + 100}`
  }

  const convertCoordinates = (lat: number, lng: number) => {
    // Convert lat/lng to x/y coordinates on our map
    const x = ((lng - 102) / 10) * 100
    const y = ((23 - lat) / 14) * 100
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
  }

  const handleExport = () => {
    const data = {
      locations: filteredLocations,
      filters,
      selectedLocation: selectedLocation?.id,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vietnam-historical-map-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Bản đồ lịch sử Việt Nam",
          text: `Khám phá ${filteredLocations.length} địa điểm lịch sử`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Đã sao chép liên kết vào clipboard!")
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bản Đồ Lịch Sử Tương Tác</h2>
          <p className="text-gray-600">Khám phá {filteredLocations.length} địa điểm lịch sử trên bản đồ Việt Nam</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất dữ liệu
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm địa điểm, sự kiện, hoặc nhân vật lịch sử..."
          value={filters.searchQuery}
          onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
          className="pl-10"
          aria-label="Tìm kiếm địa điểm lịch sử"
        />
      </div>

      {/* Filters panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Bộ lọc nâng cao
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} aria-label="Đóng bộ lọc">
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type filter */}
              <div>
                <Label className="text-sm font-medium">Loại địa điểm</Label>
                <div className="mt-2 space-y-2">
                  {uniqueTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.selectedTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              selectedTypes: [...prev.selectedTypes, type],
                            }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              selectedTypes: prev.selectedTypes.filter((t) => t !== type),
                            }))
                          }
                        }}
                        className="rounded"
                      />
                      <span className="flex items-center gap-2 text-sm">
                        {getLocationIcon(type)}
                        {type === "capital" && "Kinh đô"}
                        {type === "battle" && "Chiến trận"}
                        {type === "cultural" && "Văn hóa"}
                        {type === "uprising" && "Khởi nghĩa"}
                        {type === "trade" && "Thương mại"}
                        {type === "religious" && "Tôn giáo"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Period filter */}
              <div>
                <Label className="text-sm font-medium">Thời kỳ lịch sử</Label>
                <div className="mt-2 space-y-2">
                  {uniquePeriods.map((period) => (
                    <label key={period} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.selectedPeriods.includes(period)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              selectedPeriods: [...prev.selectedPeriods, period],
                            }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              selectedPeriods: prev.selectedPeriods.filter((p) => p !== period),
                            }))
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{period}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Importance filter */}
              <div>
                <Label className="text-sm font-medium">Mức độ quan trọng</Label>
                <div className="mt-2 space-y-2">
                  {["high", "medium", "low"].map((importance) => (
                    <label key={importance} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.importanceLevel.includes(importance)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              importanceLevel: [...prev.importanceLevel, importance],
                            }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              importanceLevel: prev.importanceLevel.filter((i) => i !== importance),
                            }))
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">
                        {importance === "high" && "Cao"}
                        {importance === "medium" && "Trung bình"}
                        {importance === "low" && "Thấp"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Year range slider */}
            <div>
              <Label className="text-sm font-medium">
                Khoảng thời gian: {filters.yearRange[0]} - {filters.yearRange[1]}
              </Label>
              <div className="mt-2">
                <Slider
                  value={filters.yearRange}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      yearRange: value as [number, number],
                    }))
                  }
                  min={minYear}
                  max={maxYear}
                  step={50}
                  className="w-full"
                />
              </div>
            </div>

            {/* Display options */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <Switch
                  checked={filters.showLabels}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      showLabels: checked,
                    }))
                  }
                />
                <span className="text-sm">Hiển thị nhãn</span>
              </label>
              <label className="flex items-center space-x-2">
                <Switch
                  checked={filters.showConnections}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      showConnections: checked,
                    }))
                  }
                />
                <span className="text-sm">Hiển thị kết nối</span>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline controls */}
      {timelineLocations.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Dòng thời gian lịch sử</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTimelineIndex(Math.max(0, currentTimelineIndex - 1))}
                  disabled={currentTimelineIndex === 0}
                  aria-label="Sự kiện trước"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Tạm dừng" : "Phát"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentTimelineIndex(Math.min(timelineLocations.length - 1, currentTimelineIndex + 1))
                  }
                  disabled={currentTimelineIndex === timelineLocations.length - 1}
                  aria-label="Sự kiện tiếp theo"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {currentTimelineIndex + 1} / {timelineLocations.length}: {timelineLocations[currentTimelineIndex]?.name} (
              {timelineLocations[currentTimelineIndex]?.year})
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main map container */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {/* Map controls */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  aria-label="Phóng to"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  aria-label="Thu nhỏ"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  aria-label="Đặt lại"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Interactive map */}
              <div
                ref={mapRef}
                className="relative w-full h-[600px] overflow-hidden rounded-lg bg-gradient-to-b from-blue-100 to-green-100 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                role="application"
                aria-label="Bản đồ lịch sử Việt Nam tương tác"
                tabIndex={0}
              >
                {/* Vietnam map background */}
                <div
                  className="absolute inset-0 transition-transform duration-200"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center",
                  }}
                >
                  {/* Simplified Vietnam outline */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}
                  >
                    <defs>
                      <linearGradient id="vietnamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M45 10 Q50 8 55 10 L60 15 Q65 20 62 25 L58 30 Q55 35 50 32 L45 28 Q40 25 42 20 L45 15 Q43 12 45 10 Z
                         M42 35 Q48 33 52 35 L55 40 Q58 45 55 50 L52 55 Q50 60 48 58 L45 55 Q42 50 44 45 L42 40 Q40 37 42 35 Z
                         M44 62 Q50 60 54 62 L58 67 Q62 72 60 77 L58 82 Q55 87 52 85 L48 82 Q44 77 46 72 L44 67 Q42 64 44 62 Z"
                      fill="url(#vietnamGradient)"
                      stroke="#047857"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {/* Location markers */}
                  {filteredLocations.map((location) => {
                    const { x, y } = convertCoordinates(location.coordinates.lat, location.coordinates.lng)
                    const isSelected = selectedLocation?.id === location.id
                    const isTimelineActive = isPlaying && timelineLocations[currentTimelineIndex]?.id === location.id

                    return (
                      <div key={location.id} className="absolute">
                        {/* Connection lines */}
                        {filters.showConnections && location.relatedEvents && (
                          <svg className="absolute inset-0 pointer-events-none">
                            {/* Add connection lines logic here */}
                          </svg>
                        )}

                        {/* Marker */}
                        <button
                          className={cn(
                            "absolute rounded-full p-2 text-white transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2",
                            "hover:scale-125 focus:scale-125 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
                            getLocationColor(location.type, location.importance),
                            isSelected && "ring-4 ring-white ring-opacity-70 scale-125",
                            isTimelineActive && "animate-pulse ring-4 ring-yellow-400",
                          )}
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            zIndex: isSelected ? 20 : 10,
                          }}
                          onClick={() => setSelectedLocation(location)}
                          aria-label={`${location.name} - ${location.description}`}
                          aria-pressed={isSelected}
                        >
                          {getLocationIcon(location.type)}
                        </button>

                        {/* Label */}
                        {filters.showLabels && (
                          <div
                            className="absolute text-xs font-medium text-gray-800 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm pointer-events-none"
                            style={{
                              left: `${x}%`,
                              top: `${y + 3}%`,
                              transform: "translateX(-50%)",
                              zIndex: 5,
                            }}
                          >
                            {location.name}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-sm font-medium">
                  {Math.round(zoom * 100)}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location details panel */}
        <div>
          <Card className="h-[600px] overflow-hidden">
            <CardContent className="p-0 h-full">
              {selectedLocation ? (
                <div className="h-full overflow-y-auto">
                  {/* Location image */}
                  {selectedLocation.images && selectedLocation.images[0] && (
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={selectedLocation.images[0] || "/placeholder.svg"}
                        alt={selectedLocation.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">{selectedLocation.year}</Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={cn(
                            "rounded-full p-2 text-white",
                            getLocationColor(selectedLocation.type, selectedLocation.importance).split(" ")[0],
                          )}
                        >
                          {getLocationIcon(selectedLocation.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{selectedLocation.name}</h3>
                          {selectedLocation.modernName && (
                            <p className="text-sm text-gray-600">({selectedLocation.modernName})</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{selectedLocation.period}</Badge>
                        <Badge variant="outline">
                          {selectedLocation.importance === "high" && "Quan trọng cao"}
                          {selectedLocation.importance === "medium" && "Quan trọng trung bình"}
                          {selectedLocation.importance === "low" && "Quan trọng thấp"}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold mb-2">Mô tả</h4>
                      <p className="text-sm text-gray-700">{selectedLocation.description}</p>
                    </div>

                    {/* Historical events */}
                    {selectedLocation.events.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Sự kiện lịch sử</h4>
                        <ul className="space-y-1">
                          {selectedLocation.events.map((event, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-green-600 mt-0.5 flex-shrink-0">•</span>
                              <span>{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key figures */}
                    {selectedLocation.keyFigures && selectedLocation.keyFigures.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Nhân vật lịch sử</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedLocation.keyFigures.map((figure, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {figure}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accessibility features */}
                    {selectedLocation.accessibility && (
                      <div>
                        <h4 className="font-semibold mb-2">Tính năng hỗ trợ</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.accessibility.hasAudio && (
                            <Badge variant="outline" className="text-xs">
                              🔊 Âm thanh
                            </Badge>
                          )}
                          {selectedLocation.accessibility.hasVideo && (
                            <Badge variant="outline" className="text-xs">
                              📹 Video
                            </Badge>
                          )}
                          {selectedLocation.accessibility.hasTranscript && (
                            <Badge variant="outline" className="text-xs">
                              📝 Phụ đề
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Coordinates */}
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Tọa độ: {selectedLocation.coordinates.lat}°N, {selectedLocation.coordinates.lng}°E
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1">
                        Tìm hiểu thêm
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <MapPin className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Chọn địa điểm</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Nhấp vào các điểm đánh dấu trên bản đồ để xem thông tin chi tiết về các địa điểm lịch sử.
                  </p>
                  <div className="text-xs text-gray-400">
                    <p>💡 Mẹo: Sử dụng chuột để kéo và phóng to bản đồ</p>
                    <p>🔍 Sử dụng thanh tìm kiếm để tìm địa điểm cụ thể</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {filteredLocations.length} / {locations.length} địa điểm
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>🖱️ Kéo để di chuyển</span>
              <span>🔍 Cuộn để phóng to</span>
              <span>📍 Nhấp để xem chi tiết</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
