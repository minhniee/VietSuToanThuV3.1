export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number // in seconds
  completedAt: Date
  answers: {
    questionId: string
    selectedAnswer: number
    isCorrect: boolean
    timeSpent: number
  }[]
}

export interface QuizProgress {
  userId: string
  quizId: string
  attempts: QuizAttempt[]
  bestScore: number
  averageScore: number
  totalAttempts: number
  lastAttemptDate: Date
  isCompleted: boolean
  isPassed: boolean
}

export interface UserQuizStats {
  totalQuizzesTaken: number
  totalQuestionsAnswered: number
  averageScore: number
  totalTimeSpent: number
  streakDays: number
  lastQuizDate: Date
  favoriteTopics: string[]
  weakTopics: string[]
  achievements: string[]
}

// Mock data storage - in a real app, this would be in a database
const quizAttempts: QuizAttempt[] = []
const userProgress: QuizProgress[] = []

export function saveQuizAttempt(attempt: QuizAttempt): void {
  quizAttempts.push(attempt)
  updateUserProgress(attempt)
}

export function updateUserProgress(attempt: QuizAttempt): void {
  const existingProgress = userProgress.find((p) => p.userId === attempt.userId && p.quizId === attempt.quizId)

  if (existingProgress) {
    existingProgress.attempts.push(attempt)
    existingProgress.totalAttempts = existingProgress.attempts.length
    existingProgress.bestScore = Math.max(existingProgress.bestScore, attempt.score)
    existingProgress.averageScore =
      existingProgress.attempts.reduce((sum, a) => sum + a.score, 0) / existingProgress.totalAttempts
    existingProgress.lastAttemptDate = attempt.completedAt
    existingProgress.isCompleted = true
    // Assuming passing score is 70%
    existingProgress.isPassed = existingProgress.bestScore >= 70
  } else {
    const newProgress: QuizProgress = {
      userId: attempt.userId,
      quizId: attempt.quizId,
      attempts: [attempt],
      bestScore: attempt.score,
      averageScore: attempt.score,
      totalAttempts: 1,
      lastAttemptDate: attempt.completedAt,
      isCompleted: true,
      isPassed: attempt.score >= 70,
    }
    userProgress.push(newProgress)
  }
}

export function getUserQuizProgress(userId: string, quizId: string): QuizProgress | undefined {
  return userProgress.find((p) => p.userId === userId && p.quizId === quizId)
}

export function getUserAllProgress(userId: string): QuizProgress[] {
  return userProgress.filter((p) => p.userId === userId)
}

export function getUserQuizStats(userId: string): UserQuizStats {
  const userAttempts = quizAttempts.filter((a) => a.userId === userId)
  const userProgressData = userProgress.filter((p) => p.userId === userId)

  if (userAttempts.length === 0) {
    return {
      totalQuizzesTaken: 0,
      totalQuestionsAnswered: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      streakDays: 0,
      lastQuizDate: new Date(),
      favoriteTopics: [],
      weakTopics: [],
      achievements: [],
    }
  }

  const totalQuizzesTaken = userProgressData.length
  const totalQuestionsAnswered = userAttempts.reduce((sum, a) => sum + a.totalQuestions, 0)
  const averageScore = userAttempts.reduce((sum, a) => sum + a.score, 0) / userAttempts.length
  const totalTimeSpent = userAttempts.reduce((sum, a) => sum + a.timeSpent, 0)
  const lastQuizDate = new Date(Math.max(...userAttempts.map((a) => a.completedAt.getTime())))

  // Calculate streak days (simplified)
  const streakDays = calculateStreakDays(userAttempts)

  // Calculate favorite and weak topics (simplified)
  const topicScores: Record<string, { total: number; count: number }> = {}
  userAttempts.forEach((attempt) => {
    // This would need to be enhanced to get actual topic from quiz data
    const topic = "General" // Placeholder
    if (!topicScores[topic]) {
      topicScores[topic] = { total: 0, count: 0 }
    }
    topicScores[topic].total += attempt.score
    topicScores[topic].count += 1
  })

  const topicAverages = Object.entries(topicScores).map(([topic, data]) => ({
    topic,
    average: data.total / data.count,
  }))

  const favoriteTopics = topicAverages
    .filter((t) => t.average >= 80)
    .sort((a, b) => b.average - a.average)
    .slice(0, 3)
    .map((t) => t.topic)

  const weakTopics = topicAverages
    .filter((t) => t.average < 60)
    .sort((a, b) => a.average - b.average)
    .slice(0, 3)
    .map((t) => t.topic)

  // Calculate achievements
  const achievements = calculateAchievements(userProgressData, userAttempts)

  return {
    totalQuizzesTaken,
    totalQuestionsAnswered,
    averageScore,
    totalTimeSpent,
    streakDays,
    lastQuizDate,
    favoriteTopics,
    weakTopics,
    achievements,
  }
}

function calculateStreakDays(attempts: QuizAttempt[]): number {
  if (attempts.length === 0) return 0

  const sortedDates = attempts
    .map((a) => a.completedAt.toDateString())
    .filter((date, index, array) => array.indexOf(date) === index)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  let streak = 1
  const today = new Date().toDateString()

  if (sortedDates[0] !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (sortedDates[0] !== yesterday.toDateString()) {
      return 0
    }
  }

  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i])
    const previousDate = new Date(sortedDates[i - 1])
    const diffTime = previousDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

function calculateAchievements(progress: QuizProgress[], attempts: QuizAttempt[]): string[] {
  const achievements: string[] = []

  // First quiz completed
  if (progress.length >= 1) {
    achievements.push("First Steps")
  }

  // 5 quizzes completed
  if (progress.length >= 5) {
    achievements.push("Quiz Explorer")
  }

  // 10 quizzes completed
  if (progress.length >= 10) {
    achievements.push("Knowledge Seeker")
  }

  // Perfect score
  if (attempts.some((a) => a.score === 100)) {
    achievements.push("Perfect Score")
  }

  // High average score
  const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
  if (averageScore >= 90) {
    achievements.push("Excellence")
  }

  // Consistent performer
  const passedQuizzes = progress.filter((p) => p.isPassed).length
  if (passedQuizzes >= 5) {
    achievements.push("Consistent Performer")
  }

  return achievements
}

export function getQuizLeaderboard(quizId?: string): Array<{
  userId: string
  username: string
  score: number
  attempts: number
  lastAttempt: Date
}> {
  let relevantProgress = userProgress

  if (quizId) {
    relevantProgress = userProgress.filter((p) => p.quizId === quizId)
  }

  return relevantProgress
    .map((p) => ({
      userId: p.userId,
      username: `User ${p.userId.slice(-4)}`, // Mock username
      score: p.bestScore,
      attempts: p.totalAttempts,
      lastAttempt: p.lastAttemptDate,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}
