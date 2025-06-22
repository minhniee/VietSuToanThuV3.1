// Points system configuration
export const POINTS_CONFIG = {
  LESSON_COMPLETION: 50,
  QUIZ_COMPLETION: 30,
  PERFECT_QUIZ_SCORE: 20, // Bonus for 100% score
  DAILY_LOGIN: 10,
  STREAK_BONUS: {
    7: 50, // 1 week
    30: 200, // 1 month
    100: 500, // 100 days
  },
  ACHIEVEMENT_UNLOCK: 100,
  PERIOD_COMPLETION: 200,
} as const

// Level system
export const LEVEL_CONFIG = {
  POINTS_PER_LEVEL: 500,
  MAX_LEVEL: 50,
} as const

// Achievement types
export interface Achievement {
  id: string
  title: string
  description: string
  points: number
  category: "quiz" | "lesson" | "streak" | "completion" | "points" | "speed"
  requirement: {
    type: string
    target: number
    current?: number
  }
  unlocked: boolean
  unlockedAt?: Date
}

// User progress tracking
export interface UserProgress {
  userId: string
  totalPoints: number
  level: number
  currentStreak: number
  longestStreak: number
  completedLessons: string[]
  completedQuizzes: string[]
  achievements: Achievement[]
  lastLoginDate: Date
  createdAt: Date
  updatedAt: Date
}

// Gift redemption
export interface GiftRedemption {
  id: string
  userId: string
  giftId: string
  pointsSpent: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingInfo?: {
    fullName: string
    email: string
    phone: string
    address: string
    notes?: string
  }
  redeemedAt: Date
  deliveredAt?: Date
}

// Utility functions
export function calculateLevel(totalPoints: number): number {
  return Math.min(Math.floor(totalPoints / LEVEL_CONFIG.POINTS_PER_LEVEL) + 1, LEVEL_CONFIG.MAX_LEVEL)
}

export function getPointsForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_CONFIG.MAX_LEVEL) return 0
  return currentLevel * LEVEL_CONFIG.POINTS_PER_LEVEL
}

export function calculateStreakBonus(streakDays: number): number {
  const bonuses = Object.entries(POINTS_CONFIG.STREAK_BONUS).sort(([a], [b]) => Number(b) - Number(a))

  for (const [days, bonus] of bonuses) {
    if (streakDays >= Number(days)) {
      return bonus
    }
  }
  return 0
}

// Points calculation functions
export function calculateQuizPoints(score: number, totalQuestions: number): number {
  const basePoints = POINTS_CONFIG.QUIZ_COMPLETION
  const perfectBonus = score === totalQuestions ? POINTS_CONFIG.PERFECT_QUIZ_SCORE : 0
  return basePoints + perfectBonus
}

export function calculateLessonPoints(): number {
  return POINTS_CONFIG.LESSON_COMPLETION
}

// Achievement checking
export function checkAchievements(userProgress: UserProgress): Achievement[] {
  const newAchievements: Achievement[] = []

  // Quiz achievements
  const completedQuizzes = userProgress.completedQuizzes.length
  if (completedQuizzes >= 1 && !userProgress.achievements.find((a) => a.id === "first-quiz")) {
    newAchievements.push({
      id: "first-quiz",
      title: "Quiz đầu tiên",
      description: "Hoàn thành quiz đầu tiên",
      points: 50,
      category: "quiz",
      requirement: { type: "quiz_count", target: 1 },
      unlocked: true,
      unlockedAt: new Date(),
    })
  }

  // Add more achievement checks here...

  return newAchievements
}
