import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PointsOverview } from "@/components/gamification/points-overview"
import { Achievements } from "@/components/gamification/achievements"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { GiftCatalog } from "@/components/gamification/gift-catalog"
import { UserProgress } from "@/components/gamification/user-progress"
import { Trophy, Gift, Target, Users } from "lucide-react"

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Hệ Thống Điểm Thưởng</h1>
          <p className="text-lg text-gray-600">Tích lũy điểm qua việc học tập và đổi quà hấp dẫn</p>
        </div>

        <div className="mb-8">
          <PointsOverview />
        </div>

        <Tabs defaultValue="progress" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Tiến độ</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Thành tựu</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Bảng xếp hạng</span>
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>Đổi quà</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <UserProgress />
          </TabsContent>

          <TabsContent value="achievements">
            <Achievements />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="gifts">
            <GiftCatalog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
