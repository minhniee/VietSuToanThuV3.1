"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, BookOpen, HelpCircle, Calendar, Award, Lock } from "lucide-react"

const achievements = [
  {
    id: "first-quiz",
    title: "Quiz đầu tiên",
    description: "Hoàn thành quiz đầu tiên",
    icon: HelpCircle,
    points: 50,
    unlocked: true,
    progress: 100,
    maxProgress: 1,
    category: "quiz",
  },
  {
    id: "quiz-master",
    title: "Bậc thầy Quiz",
    description: "Hoàn thành 50 quiz",
    icon: Trophy,
    points: 500,
    unlocked: false,
    progress: 24,
    maxProgress: 50,
    category: "quiz",
  },
  {
    id: "perfect-score",
    title: "Điểm số hoàn hảo",
    description: "Đạt 100% trong 10 quiz",
    icon: Star,
    points: 300,
    unlocked: true,
    progress: 100,
    maxProgress: 10,
    category: "quiz",
  },
  {
    id: "lesson-learner",
    title: "Người học tích cực",
    description: "Hoàn thành 25 bài học",
    icon: BookOpen,
    points: 250,
    unlocked: false,
    progress: 18,
    maxProgress: 25,
    category: "lesson",
  },
  {
    id: "week-streak",
    title: "Tuần hoàn hảo",
    description: "Học liên tục 7 ngày",
    icon: Calendar,
    points: 200,
    unlocked: true,
    progress: 100,
    maxProgress: 7,
    category: "streak",
  },
  {
    id: "history-expert",
    title: "Chuyên gia lịch sử",
    description: "Hoàn thành tất cả thời kỳ",
    icon: Award,
    points: 1000,
    unlocked: false,
    progress: 1,
    maxProgress: 4,
    category: "completion",
  },
  {
    id: "point-collector",
    title: "Thợ săn điểm",
    description: "Tích lũy 5000 điểm",
    icon: Target,
    points: 500,
    unlocked: false,
    progress: 2450,
    maxProgress: 5000,
    category: "points",
  },
  {
    id: "speed-learner",
    title: "Tốc độ ánh sáng",
    description: "Hoàn thành 5 quiz trong 1 ngày",
    icon: Star,
    points: 150,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    category: "speed",
  },
]

const categories = [
  { id: "all", name: "Tất cả", icon: Trophy },
  { id: "quiz", name: "Quiz", icon: HelpCircle },
  { id: "lesson", name: "Bài học", icon: BookOpen },
  { id: "streak", name: "Chuỗi ngày", icon: Calendar },
  { id: "completion", name: "Hoàn thành", icon: Award },
  { id: "points", name: "Điểm số", icon: Target },
  { id: "speed", name: "Tốc độ", icon: Star },
]

export function Achievements() {
  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
                <div className="text-sm text-gray-600">Thành tựu đã mở</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="text-sm text-gray-600">Điểm từ thành tựu</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Tỷ lệ hoàn thành</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thành tựu</CardTitle>
          <CardDescription>Hoàn thành các thử thách để mở khóa thành tựu và nhận điểm thưởng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

              return (
                <div
                  key={achievement.id}
                  className={`border rounded-lg p-4 transition-all ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.unlocked ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {achievement.unlocked ? <IconComponent className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                          {achievement.title}
                        </h3>
                        <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                          {achievement.points} điểm
                        </Badge>
                      </div>

                      <p className={`text-sm mb-3 ${achievement.unlocked ? "text-gray-700" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>

                      {!achievement.unlocked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Tiến độ</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}

                      {achievement.unlocked && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Trophy className="h-4 w-4" />
                          <span>Đã mở khóa</span>
                        </div>
                      )}
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
