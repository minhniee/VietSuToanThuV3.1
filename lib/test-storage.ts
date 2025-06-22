export interface TestResult {
  id: string
  config: any
  questions: number
  correctAnswers: number
  score: number
  timeSpent: number // milliseconds
  completedAt: Date
  detailedResults: Array<{
    questionId: string
    question: string
    userAnswer: number | null
    correctAnswer: number
    isCorrect: boolean
    options: string[]
    explanation: string
    topic: string
  }>
}

export interface UserProgress {
  totalTests: number
  totalQuestions: number
  totalCorrect: number
  averageScore: number
  timeSpent: number
  bestScore: number
  recentTests: TestResult[]
  topicPerformance: Record<
    string,
    {
      questions: number
      correct: number
      averageScore: number
    }
  >
}

// Local storage keys
const STORAGE_KEYS = {
  TEST_RESULTS: "vietnamese_history_test_results",
  USER_PROGRESS: "vietnamese_history_user_progress",
}

export async function saveTestResult(result: TestResult): Promise<void> {
  try {
    // Get existing results
    const existingResults = getTestResults()

    // Add new result
    const updatedResults = [result, ...existingResults].slice(0, 100) // Keep last 100 tests

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(updatedResults))

    // Update user progress
    await updateUserProgress(result)

    console.log("Test result saved successfully")
  } catch (error) {
    console.error("Failed to save test result:", error)
  }
}

export function getTestResults(): TestResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS)
    if (!stored) return []

    const results = JSON.parse(stored)
    // Convert date strings back to Date objects
    return results.map((result: any) => ({
      ...result,
      completedAt: new Date(result.completedAt),
    }))
  } catch (error) {
    console.error("Failed to get test results:", error)
    return []
  }
}

export function getTestResult(id: string): TestResult | null {
  const results = getTestResults()
  return results.find((result) => result.id === id) || null
}

export async function updateUserProgress(newResult: TestResult): Promise<void> {
  try {
    const existingProgress = getUserProgress()
    const allResults = getTestResults()

    // Calculate updated progress
    const totalTests = allResults.length
    const totalQuestions = allResults.reduce((sum, result) => sum + result.questions, 0)
    const totalCorrect = allResults.reduce((sum, result) => sum + result.correctAnswers, 0)
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    const timeSpent = allResults.reduce((sum, result) => sum + result.timeSpent, 0)
    const bestScore = Math.max(...allResults.map((result) => result.score), 0)
    const recentTests = allResults.slice(0, 10) // Last 10 tests

    // Calculate topic performance
    const topicPerformance: Record<string, { questions: number; correct: number; averageScore: number }> = {}

    allResults.forEach((result) => {
      result.detailedResults.forEach((detail) => {
        if (!topicPerformance[detail.topic]) {
          topicPerformance[detail.topic] = { questions: 0, correct: 0, averageScore: 0 }
        }
        topicPerformance[detail.topic].questions++
        if (detail.isCorrect) {
          topicPerformance[detail.topic].correct++
        }
      })
    })

    // Calculate average scores for each topic
    Object.keys(topicPerformance).forEach((topic) => {
      const performance = topicPerformance[topic]
      performance.averageScore = Math.round((performance.correct / performance.questions) * 100)
    })

    const updatedProgress: UserProgress = {
      totalTests,
      totalQuestions,
      totalCorrect,
      averageScore,
      timeSpent,
      bestScore,
      recentTests,
      topicPerformance,
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updatedProgress))

    console.log("User progress updated successfully")
  } catch (error) {
    console.error("Failed to update user progress:", error)
  }
}

export function getUserProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS)
    if (!stored) {
      return {
        totalTests: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        averageScore: 0,
        timeSpent: 0,
        bestScore: 0,
        recentTests: [],
        topicPerformance: {},
      }
    }

    const progress = JSON.parse(stored)
    // Convert date strings back to Date objects in recent tests
    progress.recentTests = progress.recentTests.map((result: any) => ({
      ...result,
      completedAt: new Date(result.completedAt),
    }))

    return progress
  } catch (error) {
    console.error("Failed to get user progress:", error)
    return {
      totalTests: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      timeSpent: 0,
      bestScore: 0,
      recentTests: [],
      topicPerformance: {},
    }
  }
}

export function getWeakTopics(limit = 3): Array<{ topic: string; score: number }> {
  const progress = getUserProgress()

  return Object.entries(progress.topicPerformance)
    .map(([topic, performance]) => ({
      topic,
      score: performance.averageScore,
    }))
    .filter((item) => item.score < 70) // Consider topics with < 70% as weak
    .sort((a, b) => a.score - b.score) // Sort by lowest score first
    .slice(0, limit)
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.TEST_RESULTS)
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS)
    console.log("All test data cleared successfully")
  } catch (error) {
    console.error("Failed to clear test data:", error)
  }
}
