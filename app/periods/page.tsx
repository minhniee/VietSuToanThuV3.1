import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"
import { getAllPeriods } from "@/lib/periods-data"

export default function PeriodsPage() {
  const periods = getAllPeriods()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Chương Trình Học Lịch Sử Việt Nam</h1>
          <p className="text-lg text-gray-600">
            Khám phá từng giai đoạn lịch sử qua các bài học có cấu trúc và tương tác
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {periods.map((period) => {
            const completedLessons = period.completedLessons || 0
            const progress = (completedLessons / period.lessons.length) * 100

            return (
              <Card key={period.id} className="group transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl">
                        {period.title} ({period.period})
                      </CardTitle>
                      <CardDescription className="text-base">{period.description}</CardDescription>
                    </div>
                    <Badge variant={progress > 0 ? "default" : "secondary"}>
                      {progress > 0 ? `${Math.round(progress)}%` : "Chưa bắt đầu"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{period.lessons.length} bài học</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{period.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{period.difficulty}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tiến độ học tập</span>
                      <span>
                        {completedLessons}/{period.lessons.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Chủ đề chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {period.topics &&
                        period.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      {period.topics && period.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{period.topics.length - 3} khác
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/periods/${period.id}`}>{progress > 0 ? "Tiếp tục học" : "Bắt đầu học"}</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/periods/${period.id}/overview`}>Xem tổng quan</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
