"use client"

import { useState, useEffect } from "react"

interface UserStats {
  totalPoints: number
  level: number
  currentStreak: number
  weeklyPoints: number
  achievements: number
}

interface UseGamificationReturn {
  userStats: UserStats | null
  loading: boolean
  error: string | null
  awardPoints: (action: string, metadata?: any) => Promise<void>
  redeemGift: (giftId: string, shippingInfo?: any) => Promise<void>
}

export function useGamification(userId: string): UseGamificationReturn {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserStats()
  }, [userId])

  const fetchUserStats = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gamification/points?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setUserStats(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch user stats")
    } finally {
      setLoading(false)
    }
  }

  const awardPoints = async (action: string, metadata?: any) => {
    try {
      const response = await fetch("/api/gamification/points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          action,
          metadata,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state with new points
        setUserStats((prev) =>
          prev
            ? {
                ...prev,
                totalPoints: data.totalPoints,
                level: Math.floor(data.totalPoints / 500) + 1,
              }
            : null,
        )

        // Show notification for points earned
        if (data.pointsEarned > 0) {
          // You could integrate with a toast notification system here
          console.log(`Earned ${data.pointsEarned} points!`)
        }
      }
    } catch (err) {
      console.error("Failed to award points:", err)
    }
  }

  const redeemGift = async (giftId: string, shippingInfo?: any) => {
    try {
      const response = await fetch("/api/gamification/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          giftId,
          shippingInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh user stats to reflect point deduction
        await fetchUserStats()
        return data
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      throw err
    }
  }

  return {
    userStats,
    loading,
    error,
    awardPoints,
    redeemGift,
  }
}
