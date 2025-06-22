import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: BookOpen,
    value: "100+",
    label: "Bài Học",
    description: "Nội dung phong phú và đa dạng",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Học Viên",
    description: "Cộng đồng học tập sôi động",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    value: "500+",
    label: "Câu Hỏi",
    description: "Hệ thống kiểm tra đa dạng",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Clock,
    value: "50+",
    label: "Giờ Học",
    description: "Thời lượng học tập chất lượng",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export function QuickStats() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Thống Kê Nổi Bật</h2>
          <p className="text-lg text-gray-600">Những con số ấn tượng về nền tảng học lịch sử Việt Nam</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="group transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor}`}
                  >
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`mb-2 text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="mb-1 text-lg font-semibold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
