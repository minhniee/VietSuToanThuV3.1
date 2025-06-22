import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
// For demo purposes, we'll use mock data

interface PointsRequest {
  userId: string
  action: "lesson_complete" | "quiz_complete" | "daily_login"
  metadata?: {
    lessonId?: string
    quizId?: string
    score?: number
    totalQuestions?: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PointsRequest = await request.json()
    const { userId, action, metadata } = body

    // Calculate points based on action
    let pointsEarned = 0
    const achievements: string[] = []

    switch (action) {
      case "lesson_complete":
        pointsEarned = 50
        // Check for lesson-related achievements
        break

      case "quiz_complete":
        pointsEarned = 30
        if (metadata?.score === metadata?.totalQuestions) {
          pointsEarned += 20 // Perfect score bonus
        }
        break

      case "daily_login":
        pointsEarned = 10
        break
    }

    // Here you would:
    // 1. Update user's total points in database
    // 2. Check for new achievements
    // 3. Update user's level if needed
    // 4. Record the activity

    return NextResponse.json({
      success: true,
      pointsEarned,
      newAchievements: achievements,
      totalPoints: 2450 + pointsEarned, // Mock total
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to award points" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
  }

  // Mock user points data
  const userPoints = {
    totalPoints: 2450,
    level: 8,
    currentStreak: 7,
    weeklyPoints: 180,
    achievements: 5,
  }

  return NextResponse.json({
    success: true,
    data: userPoints,
  })
}
