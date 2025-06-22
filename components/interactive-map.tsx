"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Sword, MapPin, Crown, FileText } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const historicalEvents = [
  // Thời kỳ Bắc thuộc (179 TCN - 938)
  {
    id: 1,
    name: "Trận Bạch Đằng",
    year: "938",
    location: "Sông Bạch Đằng",
    coordinates: { x: 65, y: 25 },
    type: "battle",
    description: "Ngô Quyền đánh bại quân Nam Hán, mở đầu thời kỳ độc lập.",
    period: "Thời kỳ Bắc thuộc",
    yearValue: 938,
  },
  {
    id: 2,
    name: "Khởi nghĩa Hai Bà Trưng",
    year: "40-43",
    location: "Mê Linh",
    coordinates: { x: 55, y: 30 },
    type: "uprising",
    description: "Cuộc khởi nghĩa chống ách đô hộ của nhà Hán.",
    period: "Thời kỳ Bắc thuộc",
    yearValue: 40,
  },
  {
    id: 3,
    name: "Khởi nghĩa Bà Triệu",
    year: "248",
    location: "Cửu Chân (Thanh Hóa)",
    coordinates: { x: 53, y: 40 },
    type: "uprising",
    description: "Bà Triệu lãnh đạo khởi nghĩa chống lại nhà Ngô.",
    period: "Thời kỳ Bắc thuộc",
    yearValue: 248,
  },
  {
    id: 4,
    name: "Khởi nghĩa Lý Bí",
    year: "542-546",
    location: "Giao Châu",
    coordinates: { x: 56, y: 28 },
    type: "uprising",
    description: "Lý Bí đánh đuổi quân Lương, thành lập nước Vạn Xuân.",
    period: "Thời kỳ Bắc thuộc",
    yearValue: 542,
  },

  // Thời kỳ phong kiến độc lập (939 - 1884)
  {
    id: 5,
    name: "Thành Thăng Long",
    year: "1010",
    location: "Hà Nội",
    coordinates: { x: 55, y: 28 },
    type: "capital",
    description: "Lý Thái Tổ dời đô về Thăng Long.",
    period: "Thời kỳ phong kiến",
    yearValue: 1010,
  },
  {
    id: 6,
    name: "Trận Chi Lăng - Xương Giang",
    year: "1427",
    location: "Chi Lăng, Lạng Sơn",
    coordinates: { x: 60, y: 20 },
    type: "battle",
    description: "Lê Lợi đánh bại quân Minh, kết thúc thời kỳ Bắc thuộc lần thứ tư.",
    period: "Thời kỳ phong kiến",
    yearValue: 1427,
  },
  {
    id: 7,
    name: "Trận Đống Đa",
    year: "1789",
    location: "Đống Đa, Hà Nội",
    coordinates: { x: 55, y: 29 },
    type: "battle",
    description: "Quang Trung đại phá quân Thanh vào dịp Tết Kỷ Dậu.",
    period: "Thời kỳ phong kiến",
    yearValue: 1789,
  },
  {
    id: 8,
    name: "Kinh đô Huế",
    year: "1802",
    location: "Huế",
    coordinates: { x: 57, y: 55 },
    type: "capital",
    description: "Gia Long thống nhất đất nước, đặt kinh đô tại Huế.",
    period: "Thời kỳ phong kiến",
    yearValue: 1802,
  },

  // Thời kỳ Pháp thuộc (1884 - 1945)
  {
    id: 9,
    name: "Hòa ước Patenôtre",
    year: "1884",
    location: "Huế",
    coordinates: { x: 57, y: 55 },
    type: "event",
    description: "Triều đình Huế ký hiệp ước công nhận sự bảo hộ của Pháp.",
    period: "Thời kỳ Pháp thuộc",
    yearValue: 1884,
  },
  {
    id: 10,
    name: "Khởi nghĩa Yên Thế",
    year: "1884-1913",
    location: "Yên Thế, Bắc Giang",
    coordinates: { x: 58, y: 25 },
    type: "uprising",
    description: "Hoàng Hoa Thám lãnh đạo khởi nghĩa chống Pháp kéo dài 30 năm.",
    period: "Thời kỳ Pháp thuộc",
    yearValue: 1884,
  },

  // Thời kỳ hiện đại (1945 - nay)
  {
    id: 11,
    name: "Cách mạng Tháng Tám",
    year: "1945",
    location: "Hà Nội",
    coordinates: { x: 55, y: 28 },
    type: "liberation",
    description: "Việt Minh giành chính quyền, kết thúc chế độ phong kiến.",
    period: "Thời kỳ hiện đại",
    yearValue: 1945,
  },
  {
    id: 12,
    name: "Chiến thắng Điện Biên Phủ",
    year: "1954",
    location: "Điện Biên Phủ",
    coordinates: { x: 35, y: 35 },
    type: "battle",
    description: "Chiến thắng lịch sử chống thực dân Pháp.",
    period: "Thời kỳ hiện đại",
    yearValue: 1954,
  },
  {
    id: 13,
    name: "Giải phóng Sài Gòn",
    year: "1975",
    location: "TP. Hồ Chí Minh",
    coordinates: { x: 60, y: 85 },
    type: "liberation",
    description: "Kết thúc chiến tranh, thống nhất đất nước.",
    period: "Thời kỳ hiện đại",
    yearValue: 1975,
  },
]

export function InteractiveMap() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof historicalEvents)[0] | null>(null)
  const [timeRange, setTimeRange] = useState<[number, number]>([-200, 2000])
  const [activePeriod, setActivePeriod] = useState<string | null>(null)

  const periods = Array.from(new Set(historicalEvents.map((event) => event.period)))

  const filteredEvents = historicalEvents.filter((event) => {
    const matchesPeriod = activePeriod ? event.period === activePeriod : true
    const matchesTimeRange = event.yearValue >= timeRange[0] && event.yearValue <= timeRange[1]
    return matchesPeriod && matchesTimeRange
  })

  const getEventIcon = (type: string) => {
    switch (type) {
      case "battle":
        return <Sword className="h-4 w-4" />
      case "uprising":
        return <Users className="h-4 w-4" />
      case "capital":
        return <Crown className="h-4 w-4" />
      case "liberation":
        return <Calendar className="h-4 w-4" />
      case "event":
        return <FileText className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "battle":
        return "bg-red-500 hover:bg-red-600"
      case "uprising":
        return "bg-blue-500 hover:bg-blue-600"
      case "capital":
        return "bg-purple-500 hover:bg-purple-600"
      case "liberation":
        return "bg-green-500 hover:bg-green-600"
      case "event":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Bản Đồ Lịch Sử Tương Tác</h2>
          <p className="text-gray-600">Khám phá các sự kiện lịch sử trên bản đồ và danh sách</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map Section */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Bản Đồ Việt Nam</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activePeriod === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setActivePeriod(null)
                      setTimeRange([-200, 2000])
                    }}
                  >
                    Tất cả
                  </Button>
                  {periods.map((period) => (
                    <Button
                      key={period}
                      variant={activePeriod === period ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setActivePeriod(period)
                        switch (period) {
                          case "Thời kỳ Bắc thuộc":
                            setTimeRange([-200, 938])
                            break
                          case "Thời kỳ phong kiến":
                            setTimeRange([939, 1883])
                            break
                          case "Thời kỳ Pháp thuộc":
                            setTimeRange([1884, 1944])
                            break
                          case "Thời kỳ hiện đại":
                            setTimeRange([1945, 2000])
                            break
                          default:
                            setTimeRange([-200, 2000])
                        }
                      }}
                    >
                      {period.split(" ")[2] || period.split(" ")[1] || period}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="relative w-full overflow-hidden rounded-lg bg-gray-100 mb-4"
                  style={{ aspectRatio: "1/1.2" }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vietnam_location_map.svg/960px-Vietnam_location_map.svg.png"
                    alt="Bản đồ Việt Nam"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                  {filteredEvents.map((event) => (
                    <button
                      key={event.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-white transition-all hover:scale-125 ${
                        selectedEvent?.id === event.id ? "ring-2 ring-white scale-125" : ""
                      } ${getEventColor(event.type)}`}
                      style={{
                        left: `${event.coordinates.x}%`,
                        top: `${event.coordinates.y}%`,
                      }}
                      onClick={() => setSelectedEvent(event)}
                      title={event.name}
                    >
                      {getEventIcon(event.type)}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-red-500 p-1 text-white">
                      <Sword className="h-2 w-2" />
                    </div>
                    <span>Trận chiến</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-blue-500 p-1 text-white">
                      <Users className="h-2 w-2" />
                    </div>
                    <span>Khởi nghĩa</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-purple-500 p-1 text-white">
                      <Crown className="h-2 w-2" />
                    </div>
                    <span>Thủ đô</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-green-500 p-1 text-white">
                      <Calendar className="h-2 w-2" />
                    </div>
                    <span>Giải phóng</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-amber-500 p-1 text-white">
                      <FileText className="h-2 w-2" />
                    </div>
                    <span>Sự kiện</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Danh Sách Sự Kiện</CardTitle>
                  <Badge variant="outline">{filteredEvents.length} sự kiện</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredEvents.length > 0 ? (
                    filteredEvents
                      .sort((a, b) => a.yearValue - b.yearValue)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
                            selectedEvent?.id === event.id ? "bg-blue-50 border-blue-200" : ""
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 rounded-full p-1.5 text-white ${getEventColor(event.type).split(" ")[0]}`}
                            >
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-sm truncate">{event.name}</h4>
                                <span className="text-xs text-gray-500 ml-2">{event.year}</span>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2 mb-1">{event.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {event.location}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {selectedEvent?.id === event.id && (
                            <div className="mt-3 pt-3 border-t flex gap-2">
                              <Button size="sm" className="text-xs h-7">
                                Chi tiết
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                Xem quiz
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Không có sự kiện nào</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Dòng Thời Gian Lịch Sử</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Thời gian: {timeRange[0] < 0 ? `${Math.abs(timeRange[0])} TCN` : timeRange[0]} - {timeRange[1]}
                  </h4>
                  <Slider
                    defaultValue={[-200, 2000]}
                    min={-200}
                    max={2000}
                    step={50}
                    value={timeRange}
                    onValueChange={(value) => {
                      const newRange = value as [number, number]
                      setTimeRange(newRange)

                      // Auto-detect period based on time range
                      const [start, end] = newRange
                      if (start >= -200 && end <= 938) {
                        setActivePeriod("Thời kỳ Bắc thuộc")
                      } else if (start >= 939 && end <= 1883) {
                        setActivePeriod("Thời kỳ phong kiến")
                      } else if (start >= 1884 && end <= 1944) {
                        setActivePeriod("Thời kỳ Pháp thuộc")
                      } else if (start >= 1945 && end <= 2000) {
                        setActivePeriod("Thời kỳ hiện đại")
                      } else {
                        setActivePeriod(null)
                      }
                    }}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>200 TCN</span>
                    <span>500</span>
                    <span>1000</span>
                    <span>1500</span>
                    <span>2000</span>
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Sự kiện trong khoảng thời gian đã chọn</h4>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents
                      .sort((a, b) => a.yearValue - b.yearValue)
                      .slice(0, 6)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                            selectedEvent?.id === event.id ? "bg-blue-100" : "hover:bg-white"
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div
                            className={`flex-shrink-0 rounded-full p-1 text-white ${getEventColor(event.type).split(" ")[0]}`}
                          >
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{event.name}</div>
                            <div className="text-xs text-gray-500">{event.year}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {filteredEvents.length > 6 && (
                    <div className="mt-2 text-center">
                      <span className="text-xs text-gray-500">và {filteredEvents.length - 6} sự kiện khác...</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
