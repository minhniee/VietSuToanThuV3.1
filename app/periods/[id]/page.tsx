import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Play, HelpCircle, Map } from "lucide-react"
import Link from "next/link"
import { getPeriodById } from "@/lib/periods-data"
import { notFound } from "next/navigation"

export default async function PeriodDetailPage({ params }: { params: { id: string } }) {
  const periodId = params.id
  const period = await getPeriodById(periodId)

  if (!period) {
    return notFound()
  }

  const completedLessons = period.completedLessons || 0
  const progress = (completedLessons / period.lessons.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-4">
            <Link href="/periods" className="text-blue-600 hover:text-blue-800">
              ← Quay lại danh sách thời kỳ
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{period.title}</CardTitle>
              <CardDescription className="text-base">{period.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Tổng quan</h3>
                    <p className="text-gray-700">{period.overview}</p>
                  </div>

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
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tiến độ học tập</span>
                      <span>
                        {completedLessons}/{period.lessons.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/periods/${periodId}/lessons/${period.lessons[0].id}`}>
                        Bắt đầu học
                      </Link>
                    </Button>
                    <Button variant="outline" title="Xem bản đồ thời gian" asChild>
                      <Link href={`/periods/${periodId}/timeline`}>
                        <Map className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Danh sách bài học</h2>

          {period.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
                    {index + 1}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{lesson.title}</h3>
                        <p className="text-gray-600">{lesson.description}</p>
                      </div>
                      <Badge variant={lesson.completed ? "default" : "secondary"}>
                        {lesson.completed ? "Hoàn thành" : "Chưa học"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      {lesson.hasVideo && (
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          <span>Video</span>
                        </div>
                      )}
                      {lesson.hasQuiz && (
                        <div className="flex items-center gap-1">
                          <HelpCircle className="h-4 w-4" />
                          <span>Quiz</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button asChild>
                        <Link href={`/periods/${periodId}/lessons/${lesson.id}`}>
                          {lesson.completed ? "Xem lại" : "Bắt đầu"}
                        </Link>
                      </Button>
                      {lesson.hasQuiz && (
                        <Button asChild variant="outline">
                          <Link href={`/periods/${periodId}/lessons/${lesson.id}/quiz`}>Làm quiz</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
