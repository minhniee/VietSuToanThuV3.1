import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const periods = [
  {
    id: "bac-thuoc",
    title: "Thời Kỳ Bắc Thuộc",
    period: "179 TCN - 938",
    description: "Giai đoạn Việt Nam bị các triều đại phương Bắc đô hộ và tiến trình đấu tranh giành độc lập.",
    lessons: 9,
    duration: "8 giờ",
    difficulty: "Cơ bản",
    color: "bg-blue-500",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/%E6%B1%89%E6%9C%9D%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%28%E7%B9%81%29.png/960px-%E6%B1%89%E6%9C%9D%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%28%E7%B9%81%29.png",
  },
  {
    id: "phong-kien",
    title: "Thời Kỳ Phong Kiến Độc Lập",
    period: "939 - 1884",
    description: "Giai đoạn độc lập với nhiều cuộc chiến bảo vệ lãnh thổ và phát triển văn hóa dân tộc.",
    lessons: 12,
    duration: "15 giờ",
    difficulty: "Trung bình",
    color: "bg-red-500",
    image: "https://ordi.vn/wp-content/uploads/2025/06/thumbs/anh-612-406.jpg",
  },
  {
    id: "thuc-dan",
    title: "Thời Kỳ Thực Dân Pháp",
    period: "1884 - 1945",
    description: "Giai đoạn bị thực dân Pháp đô hộ và các phong trào đấu tranh giải phóng dân tộc.",
    lessons: 10,
    duration: "12 giờ",
    difficulty: "Trung bình",
    color: "bg-purple-500",
    image: "https://nguonluc.com.vn/uploads/images/2023/05/10/19-thang-8-20200820075825-1683729387.jpg",
  },
  {
    id: "hien-dai",
    title: "Thời Kỳ Hiện Đại",
    period: "1945 - nay",
    description: "Từ tuyên bố độc lập đến thống nhất đất nước và thời kỳ đổi mới phát triển.",
    lessons: 8,
    duration: "14 giờ",
    difficulty: "Nâng cao",
    color: "bg-green-500",
    image: "https://quocphongthudo.vn/upload/2001606/fck/sophia1712/2-Thanh-Pho-Ho-Chi-M.jpg",
  },
]

export function FeaturedPeriods() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Các Thời Kỳ Lịch Sử</h2>
          <p className="text-lg text-gray-600">
            Khám phá hành trình 4000 năm lịch sử Việt Nam qua các thời kỳ quan trọng
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {periods.map((period) => (
            <Card key={period.id} className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="relative">
                <img
                  src={period.image || "/placeholder.svg"}
                  alt={period.title}
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge variant="secondary" className="mb-2">
                    {period.period}
                  </Badge>
                  <h3 className="text-xl font-bold">{period.title}</h3>
                </div>
              </div>

              <CardHeader>
                <CardDescription className="text-sm text-gray-600">{period.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <BookOpen className="h-4 w-4" />
                    {period.lessons} bài học
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {period.duration}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {period.difficulty}
                  </Badge>
                </div>

                <Link href={`/periods/${period.id}`}>
                  <Button className="w-full gap-2 group-hover:bg-primary/90">
                    Khám Phá
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/periods">
            <Button variant="outline" size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Xem Tất Cả Thời Kỳ
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
