export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizAnswer {
  questionId: number
  selectedAnswer: number | null
  isCorrect: boolean
  timeSpent?: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unanswered: number
  score: number
  percentage: number
  answers: QuizAnswer[]
}

/**
 * Validates if the selected answer is correct
 */
export function validateAnswer(question: QuizQuestion, selectedIndex: number | null): boolean {
  if (selectedIndex === null) return false
  return selectedIndex === question.correctAnswer
}

/**
 * Calculates quiz results
 */
export function calculateQuizResults(questions: QuizQuestion[], answers: (number | null)[]): QuizResult {
  const quizAnswers: QuizAnswer[] = questions.map((question, index) => ({
    questionId: question.id,
    selectedAnswer: answers[index],
    isCorrect: validateAnswer(question, answers[index]),
  }))

  const correctAnswers = quizAnswers.filter((a) => a.isCorrect).length
  const incorrectAnswers = quizAnswers.filter((a) => a.selectedAnswer !== null && !a.isCorrect).length
  const unanswered = quizAnswers.filter((a) => a.selectedAnswer === null).length

  return {
    totalQuestions: questions.length,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    score: correctAnswers,
    percentage: Math.round((correctAnswers / questions.length) * 100),
    answers: quizAnswers,
  }
}

/**
 * Validates quiz data structure
 */
export function validateQuizData(questions: QuizQuestion[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  questions.forEach((question, index) => {
    // Check if question has required fields
    if (!question.question || question.question.trim() === "") {
      errors.push(`Question ${index + 1}: Missing question text`)
    }

    // Check if options array exists and has items
    if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
      errors.push(`Question ${index + 1}: Missing or empty options array`)
    }

    // Check if correctAnswer is valid
    if (question.correctAnswer === undefined || question.correctAnswer === null) {
      errors.push(`Question ${index + 1}: Missing correctAnswer`)
    } else if (question.options && (question.correctAnswer < 0 || question.correctAnswer >= question.options.length)) {
      errors.push(
        `Question ${index + 1}: correctAnswer index ${question.correctAnswer} is out of bounds for options array of length ${question.options.length}`,
      )
    }

    // Check if explanation exists
    if (!question.explanation || question.explanation.trim() === "") {
      errors.push(`Question ${index + 1}: Missing explanation`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Debug function to log quiz state
 */
export function debugQuizState(question: QuizQuestion, selectedAnswer: number | null, showFeedback: boolean): void {
  if (process.env.NODE_ENV === "development") {
    console.group(`Quiz Debug - Question ${question.id}`)
    console.log("Question:", question.question)
    console.log("Options:", question.options)
    console.log("Correct Answer Index:", question.correctAnswer)
    console.log("Correct Answer Text:", question.options[question.correctAnswer])
    console.log("Selected Answer Index:", selectedAnswer)
    console.log("Selected Answer Text:", selectedAnswer !== null ? question.options[selectedAnswer] : "None")
    console.log("Is Correct:", validateAnswer(question, selectedAnswer))
    console.log("Show Feedback:", showFeedback)
    console.groupEnd()
  }
}
