"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Crown, Star, Shield, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { subscriptionFeatures } from "@/lib/subscription"

const subscriptionPlans = [
  {
    id: "free",
    name: "Miễn phí",
    price: "0đ",
    period: "/tháng",
    description: "Phù hợp cho người mới bắt đầu",
    icon: Shield,
    features: ["3 quiz mỗi ngày", "Truy cập nội dung cơ bản", "Theo dõi tiến độ cơ bản", "Hỗ trợ cộng đồng"],
    limitations: ["Giới hạn số lượng quiz", "Không có phân tích chi tiết", "Không thể tải kết quả"],
  },
  {
    id: "basic",
    name: "Cơ bản",
    price: "89,000đ",
    period: "/tháng",
    description: "Dành cho học viên nghiêm túc",
    icon: Star,
    popular: true,
    features: [
      "10 quiz mỗi ngày",
      "Truy cập tất cả nội dung cơ bản",
      "Phân tích chi tiết",
      "Tải xuống kết quả",
      "Hỗ trợ email",
    ],
    limitations: ["Không có quiz tùy chỉnh", "Không có hỗ trợ ưu tiên"],
  },
  {
    id: "premium",
    name: "Cao cấp",
    price: "800,000đ",
    period: "/tháng",
    description: "Trải nghiệm hoàn hảo nhất",
    icon: Crown,
    features: [
      "Quiz không giới hạn",
      "Truy cập tất cả nội dung",
      "Quiz tùy chỉnh",
      "Phân tích nâng cao",
      "Tải xuống không giới hạn",
      "Hỗ trợ ưu tiên 24/7",
      "Tính năng độc quyền",
    ],
    limitations: [],
  },
]

export function SubscriptionManagement() {
  const { user, updateSubscription } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  if (!user) return null

  const currentPlan = user.subscription.level
  const currentFeatures = subscriptionFeatures[currentPlan]

  const handleUpgrade = async (planId: "free" | "basic" | "premium") => {
    if (planId === currentPlan) return

    setLoading(planId)
    setMessage(null)

    try {
      const result = await updateSubscription(planId)

      if (result.success) {
        setMessage({
          type: "success",
          text: `Đã ${planId === "free" ? "hạ cấp" : "nâng cấp"} thành công lên gói ${subscriptionPlans.find((p) => p.id === planId)?.name}!`,
        })
      } else {
        setMessage({
          type: "error",
          text: result.error || "Có lỗi xảy ra khi cập nhật gói",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Có lỗi xảy ra khi cập nhật gói",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Gói hiện tại
          </CardTitle>
          <CardDescription>Thông tin về gói đăng ký của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Gói {subscriptionPlans.find((p) => p.id === currentPlan)?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {user.subscription.endDate
                  ? `Hết hạn: ${new Date(user.subscription.endDate).toLocaleDateString("vi-VN")}`
                  : "Không giới hạn thời gian"}
              </p>
            </div>
            <Badge variant={currentPlan === "premium" ? "default" : "secondary"}>
              {currentPlan === "free" && "Miễn phí"}
              {currentPlan === "basic" && "Cơ bản"}
              {currentPlan === "premium" && "Cao cấp"}
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Quiz/ngày</p>
              <p className="text-muted-foreground">
                {currentFeatures.maxQuizzesPerDay === -1 ? "Không giới hạn" : currentFeatures.maxQuizzesPerDay}
              </p>
            </div>
            <div>
              <p className="font-medium">Phân tích</p>
              <p className="text-muted-foreground">{currentFeatures.detailedAnalytics ? "Chi tiết" : "Cơ bản"}</p>
            </div>
            <div>
              <p className="font-medium">Tải xuống</p>
              <p className="text-muted-foreground">{currentFeatures.downloadResults ? "Có" : "Không"}</p>
            </div>
            <div>
              <p className="font-medium">Hỗ trợ</p>
              <p className="text-muted-foreground">{currentFeatures.prioritySupport ? "Ưu tiên" : "Cộng đồng"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message */}
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Các gói đăng ký</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => {
            const IconComponent = plan.icon
            const isCurrentPlan = plan.id === currentPlan
            const isUpgrade =
              subscriptionPlans.findIndex((p) => p.id === plan.id) >
              subscriptionPlans.findIndex((p) => p.id === currentPlan)

            return (
              <Card key={plan.id} className={`relative ${plan.popular ? "border-red-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-500 text-white">Phổ biến nhất</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-2xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 pt-2 border-t">
                      <p className="text-xs text-muted-foreground font-medium">Giới hạn:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="h-2 w-2 bg-gray-400 rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={isCurrentPlan ? "outline" : "default"}
                    disabled={isCurrentPlan || loading === plan.id}
                    onClick={() => handleUpgrade(plan.id as "free" | "basic" | "premium")}
                  >
                    {loading === plan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isCurrentPlan ? "Gói hiện tại" : isUpgrade ? "Nâng cấp" : "Hạ cấp"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
