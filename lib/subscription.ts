export type SubscriptionLevel = "free" | "basic" | "premium"

export interface SubscriptionFeatures {
  maxQuizzesPerDay: number
  accessToEvents: string[]
  accessToQuizzes: string[]
  detailedAnalytics: boolean
  customQuizzes: boolean
  downloadResults: boolean
  prioritySupport: boolean
}

export const subscriptionFeatures: Record<SubscriptionLevel, SubscriptionFeatures> = {
  free: {
    maxQuizzesPerDay: 3,
    accessToEvents: ["free"],
    accessToQuizzes: ["free"],
    detailedAnalytics: false,
    customQuizzes: false,
    downloadResults: false,
    prioritySupport: false,
  },
  basic: {
    maxQuizzesPerDay: 10,
    accessToEvents: ["free", "basic"],
    accessToQuizzes: ["free", "basic"],
    detailedAnalytics: true,
    customQuizzes: false,
    downloadResults: true,
    prioritySupport: false,
  },
  premium: {
    maxQuizzesPerDay: -1, // unlimited
    accessToEvents: ["free", "basic", "premium"],
    accessToQuizzes: ["free", "basic", "premium"],
    detailedAnalytics: true,
    customQuizzes: true,
    downloadResults: true,
    prioritySupport: true,
  },
}

export interface UserSubscription {
  level: SubscriptionLevel
  startDate: Date
  endDate?: Date
  isActive: boolean
}

// Mock user subscription - in a real app, this would come from a database
export function getUserSubscription(): UserSubscription {
  // For demo purposes, return a basic subscription
  return {
    level: "basic",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    isActive: true,
  }
}

export function canAccessContent(userLevel: SubscriptionLevel, contentLevel: SubscriptionLevel): boolean {
  const levels = ["free", "basic", "premium"]
  const userLevelIndex = levels.indexOf(userLevel)
  const contentLevelIndex = levels.indexOf(contentLevel)

  return userLevelIndex >= contentLevelIndex
}

export function getSubscriptionLimits(level: SubscriptionLevel): SubscriptionFeatures {
  return subscriptionFeatures[level]
}
