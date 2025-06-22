"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Clock, TrendingUp, BookOpen, Award, Calendar, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { subscriptionFeatures } from "@/lib/subscription"

interface DashboardStats {
  totalQuizzes: number
  averageScore: number
  timeSpent: number
  currentStreak: number
  completedEvents: number
  totalEvents: number
  weeklyGoal: number
  weeklyProgress: number
}

// Mock dashboard data - in production, this would come from an API
const mockStats: DashboardStats = {
  totalQuizzes: 47,
  averageScore: 85,
  timeSpent: 1240, // minutes
  currentStreak: 12,
  completedEvents: 6,
  totalEvents: 8,
  weeklyGoal: 5,
  weeklyProgress: 3,
}

export function DashboardOverview() {
  const { user } = useAuth()
  const { userStats } = useGamification(user?.id || "1")

  if (!user) return null

  const subscriptionLevel = user.subscription.level
  const features = subscriptionFeatures[subscriptionLevel]
  const stats = mockStats

  const getSubscriptionColor = (level: string) => {
    switch (level) {
      case "free":
        return "bg-gray-100 text-gray-800"
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSubscriptionLabel = (level: string) => {
    switch (level) {
      case "free":
        return "Miễn phí"
      case "basic":
        return "Cơ bản"
      case "premium":
        return "Cao cấp"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chào mừng trở lại, {user.name}!</h1>
            <p className="text-red-100 mt-1">Hôm nay là ngày tuyệt vời để học thêm về lịch sử Việt Nam</p>
          </div>
          <div className="text-right">
            <Badge className={`${getSubscriptionColor(subscriptionLevel)} mb-2`}>
              {getSubscriptionLabel(subscriptionLevel)}
            </Badge>
            <div className="text-sm text-red-100">Chuỗi học tập: {stats.currentStreak} ngày</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Quiz</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">+3 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">+5% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian học</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(stats.timeSpent / 60)}h</div>
            <p className="text-xs text-muted-foreground">{stats.timeSpent % 60} phút</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm tích lũy</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.totalPoints || 0}</div>
            <p className="text-xs text-muted-foreground">Level {userStats?.level || 1}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tiến độ học tập
            </CardTitle>
            <CardDescription>Theo dõi quá trình hoàn thành các sự kiện lịch sử</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sự kiện đã hoàn thành</span>
                <span>
                  {stats.completedEvents}/{stats.totalEvents}
                </span>
              </div>
              <Progress value={(stats.completedEvents / stats.totalEvents) * 100} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Mục tiêu tuần này</span>
                <span>
                  {stats.weeklyProgress}/{stats.weeklyGoal} quiz
                </span>
              </div>
              <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Thành tích gần đây
            </CardTitle>
            <CardDescription>Các cột mốc và thành tựu của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Học giả lịch sử</p>
                  <p className="text-xs text-muted-foreground">Hoàn thành 5 sự kiện lịch sử</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Kiên trì</p>
                  <p className="text-xs text-muted-foreground">Học liên tục 10 ngày</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Thạc sĩ Quiz</p>
                  <p className="text-xs text-muted-foreground">Đạt điểm trung bình trên 80%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
          <CardDescription>Tiếp tục hành trình học tập của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              <span>Tiếp tục Quiz</span>
              <span className="text-xs text-muted-foreground">Chiến thắng Đống Đa</span>
            </Button>

            <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
              <Target className="h-6 w-6" />
              <span>Luyện tập</span>
              <span className="text-xs text-muted-foreground">Chế độ tự do</span>
            </Button>

            <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
              <Trophy className="h-6 w-6" />
              <span>Bảng xếp hạng</span>
              <span className="text-xs text-muted-foreground">Xem thứ hạng</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
