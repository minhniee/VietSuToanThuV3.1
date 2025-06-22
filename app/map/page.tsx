"use client"

import { EnhancedInteractiveMap } from "@/components/map/enhanced-interactive-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Bản Đồ Lịch Sử Việt Nam</CardTitle>
              <CardDescription className="text-lg">
                Khám phá các địa điểm và sự kiện lịch sử quan trọng của Việt Nam thông qua bản đồ tương tác
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Địa điểm lịch sử</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1000+</div>
                  <div className="text-sm text-gray-600">Năm lịch sử</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-gray-600">Loại địa điểm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <EnhancedInteractiveMap />
      </div>
    </div>
  )
}
