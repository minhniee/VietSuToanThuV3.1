"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Target, Gift, Star } from "lucide-react"

interface UserStats {
  totalPoints: number
  weeklyPoints: number
  level: number
  nextLevelPoints: number
  currentLevelPoints: number
  streak: number
  completedQuizzes: number
  completedLessons: number
  redeemedGifts: number
}

export function PointsOverview() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 2450,
    weeklyPoints: 180,
    level: 8,
    nextLevelPoints: 3000,
    currentLevelPoints: 2000,
    streak: 7,
    completedQuizzes: 24,
    completedLessons: 18,
    redeemedGifts: 3,
  })

  const progressToNextLevel =
    ((userStats.totalPoints - userStats.currentLevelPoints) /
      (userStats.nextLevelPoints - userStats.currentLevelPoints)) *
    100

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Học sinh mới"
    if (level < 10) return "Người học tích cực"
    if (level < 15) return "Chuyên gia lịch sử"
    if (level < 20) return "Bậc thầy tri thức"
    return "Huyền thoại"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coins className="h-5 w-5" />
            Tổng điểm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+{userStats.weeklyPoints} tuần này</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="h-5 w-5" />
            Cấp độ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">Cấp {userStats.level}</div>
          <div className="text-sm mt-1">{getLevelTitle(userStats.level)}</div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>{userStats.totalPoints}</span>
              <span>{userStats.nextLevelPoints}</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2 bg-purple-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            Chuỗi ngày học
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{userStats.streak} ngày</div>
          <div className="text-sm mt-2">Tiếp tục phát huy!</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gift className="h-5 w-5" />
            Quà đã đổi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{userStats.redeemedGifts}</div>
          <div className="text-sm mt-2">Tổng số quà nhận được</div>
        </CardContent>
      </Card>
    </div>
  )
}
