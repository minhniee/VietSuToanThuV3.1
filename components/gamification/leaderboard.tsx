"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, TrendingUp } from "lucide-react"

const leaderboardData = {
  weekly: [
    {
      rank: 1,
      name: "Nguyễn Văn An",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 450,
      change: "+2",
      level: 12,
    },
    {
      rank: 2,
      name: "Trần Thị Bình",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 420,
      change: "-1",
      level: 11,
    },
    {
      rank: 3,
      name: "Lê Minh Cường",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 380,
      change: "+1",
      level: 10,
    },
    {
      rank: 4,
      name: "Phạm Thu Dung",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 350,
      change: "0",
      level: 9,
    },
    {
      rank: 5,
      name: "Hoàng Văn Em",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 320,
      change: "+3",
      level: 8,
    },
    {
      rank: 6,
      name: "Bạn",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 180,
      change: "+1",
      level: 8,
      isCurrentUser: true,
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Trần Thị Bình",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1850,
      change: "+1",
      level: 11,
    },
    {
      rank: 2,
      name: "Nguyễn Văn An",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1720,
      change: "-1",
      level: 12,
    },
    {
      rank: 3,
      name: "Lê Minh Cường",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1650,
      change: "0",
      level: 10,
    },
    {
      rank: 8,
      name: "Bạn",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 980,
      change: "+2",
      level: 8,
      isCurrentUser: true,
    },
  ],
  allTime: [
    {
      rank: 1,
      name: "Nguyễn Văn An",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 8450,
      change: "0",
      level: 12,
    },
    {
      rank: 2,
      name: "Trần Thị Bình",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7920,
      change: "0",
      level: 11,
    },
    {
      rank: 3,
      name: "Lê Minh Cường",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7380,
      change: "0",
      level: 10,
    },
    {
      rank: 15,
      name: "Bạn",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2450,
      change: "+1",
      level: 8,
      isCurrentUser: true,
    },
  ],
}

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (change.startsWith("-")) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    }
    return null
  }

  const renderLeaderboard = (data: typeof leaderboardData.weekly) => {
    const topThree = data.slice(0, 3)
    const others = data.slice(3)
    const currentUser = data.find((user) => user.isCurrentUser)

    return (
      <div className="space-y-6">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={topThree[1]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[1]?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -top-2 -right-2">
                <Medal className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <h3 className="font-semibold text-sm">{topThree[1]?.name}</h3>
            <p className="text-xs text-gray-600">{topThree[1]?.points} điểm</p>
            <div className="w-full h-16 bg-gray-200 rounded-t-lg mt-2 flex items-end justify-center">
              <span className="text-2xl font-bold text-gray-600 mb-2">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={topThree[0]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[0]?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -top-2 -right-2">
                <Crown className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <h3 className="font-semibold">{topThree[0]?.name}</h3>
            <p className="text-sm text-gray-600">{topThree[0]?.points} điểm</p>
            <div className="w-full h-20 bg-yellow-200 rounded-t-lg mt-2 flex items-end justify-center">
              <span className="text-3xl font-bold text-yellow-600 mb-2">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-2 bg-amber-100 rounded-full flex items-center justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={topThree[2]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[2]?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -top-2 -right-2">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <h3 className="font-semibold text-sm">{topThree[2]?.name}</h3>
            <p className="text-xs text-gray-600">{topThree[2]?.points} điểm</p>
            <div className="w-full h-12 bg-amber-200 rounded-t-lg mt-2 flex items-end justify-center">
              <span className="text-xl font-bold text-amber-600 mb-2">3</span>
            </div>
          </div>
        </div>

        {/* Rest of the leaderboard */}
        <div className="space-y-2">
          {others.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-4 p-3 rounded-lg border ${
                user.isCurrentUser ? "bg-blue-50 border-blue-200" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>

              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${user.isCurrentUser ? "text-blue-900" : ""}`}>{user.name}</h3>
                  {user.isCurrentUser && <Badge variant="secondary">Bạn</Badge>}
                </div>
                <p className="text-sm text-gray-600">Cấp {user.level}</p>
              </div>

              <div className="text-right">
                <div className="font-semibold">{user.points} điểm</div>
                <div className="flex items-center gap-1 text-sm">
                  {getChangeIcon(user.change)}
                  <span
                    className={
                      user.change.startsWith("+")
                        ? "text-green-600"
                        : user.change.startsWith("-")
                          ? "text-red-600"
                          : "text-gray-600"
                    }
                  >
                    {user.change !== "0" ? user.change : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Bảng xếp hạng
        </CardTitle>
        <CardDescription>Xem thứ hạng của bạn so với các học viên khác</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Tuần này</TabsTrigger>
            <TabsTrigger value="monthly">Tháng này</TabsTrigger>
            <TabsTrigger value="allTime">Tổng thể</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">{renderLeaderboard(leaderboardData.weekly)}</TabsContent>

          <TabsContent value="monthly">{renderLeaderboard(leaderboardData.monthly)}</TabsContent>

          <TabsContent value="allTime">{renderLeaderboard(leaderboardData.allTime)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
