"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Gift, Coins, Package, Award, BookOpen, Smartphone, Coffee } from "lucide-react"
import { RedemptionDialog } from "./redemption-dialog"

const gifts = [
  {
    id: "history-book",
    name: "Sách Lịch Sử Việt Nam",
    description: "Bộ sách lịch sử Việt Nam 4 tập đầy đủ",
    points: 2000,
    category: "physical",
    image: "/placeholder.svg?height=200&width=200",
    stock: 15,
    icon: BookOpen,
    estimatedDelivery: "3-5 ngày",
  },
  {
    id: "premium-account",
    name: "Tài khoản Premium 3 tháng",
    description: "Truy cập không giới hạn tất cả nội dung premium",
    points: 1500,
    category: "virtual",
    image: "/placeholder.svg?height=200&width=200",
    stock: 999,
    icon: Award,
    estimatedDelivery: "Ngay lập tức",
  },
  {
    id: "coffee-voucher",
    name: "Voucher Cà phê 100k",
    description: "Voucher cà phê trị giá 100,000 VNĐ tại các cửa hàng liên kết",
    points: 800,
    category: "voucher",
    image: "/placeholder.svg?height=200&width=200",
    stock: 50,
    icon: Coffee,
    estimatedDelivery: "1-2 ngày",
  },
  {
    id: "smartphone-case",
    name: "Ốp lưng điện thoại in logo",
    description: "Ốp lưng điện thoại với thiết kế lịch sử Việt Nam",
    points: 600,
    category: "physical",
    image: "/placeholder.svg?height=200&width=200",
    stock: 25,
    icon: Smartphone,
    estimatedDelivery: "5-7 ngày",
  },
  {
    id: "digital-certificate",
    name: "Chứng chỉ hoàn thành khóa học",
    description: "Chứng chỉ điện tử xác nhận hoàn thành khóa học lịch sử",
    points: 1000,
    category: "virtual",
    image: "/placeholder.svg?height=200&width=200",
    stock: 999,
    icon: Award,
    estimatedDelivery: "Ngay lập tức",
  },
  {
    id: "history-map",
    name: "Bản đồ lịch sử Việt Nam",
    description: "Bản đồ lịch sử Việt Nam in trên giấy cao cấp",
    points: 400,
    category: "physical",
    image: "/placeholder.svg?height=200&width=200",
    stock: 30,
    icon: Package,
    estimatedDelivery: "3-5 ngày",
  },
]

const categories = [
  { id: "all", name: "Tất cả", icon: Gift },
  { id: "virtual", name: "Ảo", icon: Award },
  { id: "physical", name: "Vật lý", icon: Package },
  { id: "voucher", name: "Voucher", icon: Coins },
]

export function GiftCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGift, setSelectedGift] = useState<(typeof gifts)[0] | null>(null)
  const userPoints = 2450 // This would come from user context

  const filteredGifts = selectedCategory === "all" ? gifts : gifts.filter((gift) => gift.category === selectedCategory)

  const canAfford = (points: number) => userPoints >= points

  return (
    <div className="space-y-6">
      {/* User Points Display */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Điểm hiện tại của bạn</h3>
              <div className="text-3xl font-bold">{userPoints.toLocaleString()} điểm</div>
            </div>
            <Coins className="h-12 w-12 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Gift Catalog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Danh mục quà tặng
          </CardTitle>
          <CardDescription>Đổi điểm lấy quà hấp dẫn</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGifts.map((gift) => {
                const IconComponent = gift.icon
                const affordable = canAfford(gift.points)

                return (
                  <Card key={gift.id} className={`transition-all hover:shadow-md ${!affordable ? "opacity-60" : ""}`}>
                    <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-t-lg">
                      <img
                        src={gift.image || "/placeholder.svg"}
                        alt={gift.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={affordable ? "default" : "secondary"}>{gift.points} điểm</Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <IconComponent className="h-5 w-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{gift.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{gift.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Còn lại: {gift.stock}</span>
                          <span>{gift.estimatedDelivery}</span>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              disabled={!affordable || gift.stock === 0}
                              onClick={() => setSelectedGift(gift)}
                            >
                              {!affordable ? "Không đủ điểm" : gift.stock === 0 ? "Hết hàng" : "Đổi quà"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <RedemptionDialog gift={gift} userPoints={userPoints} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
