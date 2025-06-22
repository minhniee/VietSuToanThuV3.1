"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, HelpCircle, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

const progressData = {
  periods: [
    {
      id: "bac-thuoc",
      name: "Thời kỳ Bắc thuộc",
      totalLessons: 12,
      completedLessons: 8,
      totalQuizzes: 12,
      completedQuizzes: 6,
      points: 480,
      status: "in-progress",
    },
    {
      id: "phong-kien",
      name: "Thời kỳ phong kiến độc lập",
      totalLessons: 25,
      completedLessons: 15,
      totalQuizzes: 25,
      completedQuizzes: 12,
      points: 720,
      status: "in-progress",
    },
    {
      id: "thuc-dan",
      name: "Thời kỳ Pháp thuộc",
      totalLessons: 18,
      completedLessons: 18,
      totalQuizzes: 18,
      completedQuizzes: 18,
      points: 900,
      status: "completed",
    },
    {
      id: "hien-dai",
      name: "Thời kỳ hiện đại",
      totalLessons: 20,
      completedLessons: 5,
      totalQuizzes: 20,
      completedQuizzes: 3,
      points: 200,
      status: "in-progress",
    },
  ],
  weeklyGoals: {
    lessonsTarget: 5,
    lessonsCompleted: 3,
    quizzesTarget: 5,
    quizzesCompleted: 4,
    pointsTarget: 300,
    pointsEarned: 180,
  },
}

export function UserProgress() {
  return (
    <div className="space-y-6">
      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mục tiêu tuần này
          </CardTitle>
          <CardDescription>Hoàn thành mục tiêu để nhận điểm thưởng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bài học</span>
                <span>
                  {progressData.weeklyGoals.lessonsCompleted}/{progressData.weeklyGoals.lessonsTarget}
                </span>
              </div>
              <Progress
                value={(progressData.weeklyGoals.lessonsCompleted / progressData.weeklyGoals.lessonsTarget) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Quiz</span>
                <span>
                  {progressData.weeklyGoals.quizzesCompleted}/{progressData.weeklyGoals.quizzesTarget}
                </span>
              </div>
              <Progress
                value={(progressData.weeklyGoals.quizzesCompleted / progressData.weeklyGoals.quizzesTarget) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Điểm</span>
                <span>
                  {progressData.weeklyGoals.pointsEarned}/{progressData.weeklyGoals.pointsTarget}
                </span>
              </div>
              <Progress
                value={(progressData.weeklyGoals.pointsEarned / progressData.weeklyGoals.pointsTarget) * 100}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Period Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Tiến độ theo thời kỳ</CardTitle>
          <CardDescription>Theo dõi tiến độ học tập của bạn qua từng thời kỳ lịch sử</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.periods.map((period) => {
              const lessonProgress = (period.completedLessons / period.totalLessons) * 100
              const quizProgress = (period.completedQuizzes / period.totalQuizzes) * 100

              return (
                <div key={period.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{period.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={period.status === "completed" ? "default" : "secondary"}>
                          {period.status === "completed" ? "Hoàn thành" : "Đang học"}
                        </Badge>
                        <span className="text-sm text-gray-600">{period.points} điểm</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/periods/${period.id}`}>
                        Tiếp tục
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Bài học</span>
                        </div>
                        <span>
                          {period.completedLessons}/{period.totalLessons}
                        </span>
                      </div>
                      <Progress value={lessonProgress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <HelpCircle className="h-4 w-4" />
                          <span>Quiz</span>
                        </div>
                        <span>
                          {period.completedQuizzes}/{period.totalQuizzes}
                        </span>
                      </div>
                      <Progress value={quizProgress} className="h-2" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
