"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Star, Coins } from "lucide-react"
import { validateAnswer, calculateQuizResults, debugQuizState, type QuizQuestion } from "@/lib/quiz-utils"

interface EnhancedQuizProps {
  questions: QuizQuestion[]
  title: string
  description: string
  onComplete?: (result: any) => void
  showGamification?: boolean
}

export function EnhancedQuiz({
  questions,
  title,
  description,
  onComplete,
  showGamification = true,
}: EnhancedQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date())

  const currentQ = questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isCorrect = validateAnswer(currentQ, selectedAnswer)

  useEffect(() => {
    setQuestionStartTime(new Date())
  }, [currentQuestion])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowFeedback(false)

    // Debug the selection
    debugQuizState(currentQ, answerIndex, false)
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)
    debugQuizState(currentQ, selectedAnswer, true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
    }
  }

  const handleComplete = () => {
    const endTime = new Date()
    const totalTime = endTime.getTime() - startTime.getTime()
    const result = calculateQuizResults(questions, selectedAnswers)

    const completeResult = {
      ...result,
      totalTime,
      averageTimePerQuestion: totalTime / questions.length,
    }

    setShowResults(true)

    if (onComplete) {
      onComplete(completeResult)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
    setShowFeedback(false)
    setStartTime(new Date())
    setQuestionStartTime(new Date())
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const result = calculateQuizResults(questions, selectedAnswers)

    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {result.score}/{result.totalQuestions}
            </div>
            <div className="text-lg text-gray-600">Score: {result.percentage}%</div>
            <Badge
              variant={result.percentage >= 80 ? "default" : result.percentage >= 60 ? "secondary" : "destructive"}
              className="mt-2"
            >
              {result.percentage >= 80 ? "Excellent" : result.percentage >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>

          {/* Gamification Points */}
          {showGamification && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Points Earned</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {30 + (result.percentage === 100 ? 20 : 0)} points
                </div>
                <div className="text-sm text-yellow-700">
                  Base: 30 points {result.percentage === 100 && "+ 20 perfect score bonus"}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Detailed Results:</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isQuestionCorrect = validateAnswer(question, userAnswer)

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {isQuestionCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        Q{index + 1}: {question.question}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-700">Correct:</span>
                          <span className="text-green-700">{question.options[question.correctAnswer]}</span>
                        </div>

                        {!isQuestionCorrect && userAnswer !== null && (
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-red-700">Your answer:</span>
                            <span className="text-red-700">{question.options[userAnswer]}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRestart} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button className="flex-1">Continue Learning</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">
            {currentQuestion + 1}/{questions.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Question {currentQuestion + 1}: {currentQ.question}
          </h3>

          <RadioGroup
            value={selectedAnswer?.toString() || ""}
            onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => {
              let optionClass =
                "flex items-center space-x-2 p-4 rounded-lg border transition-all hover:bg-gray-50 cursor-pointer"

              if (showFeedback && selectedAnswer !== null) {
                if (index === currentQ.correctAnswer) {
                  optionClass = "flex items-center space-x-2 p-4 rounded-lg border-2 border-green-500 bg-green-50"
                } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                  optionClass = "flex items-center space-x-2 p-4 rounded-lg border-2 border-red-500 bg-red-50"
                } else {
                  optionClass = "flex items-center space-x-2 p-4 rounded-lg border bg-gray-100 opacity-60"
                }
              } else if (selectedAnswer === index) {
                optionClass = "flex items-center space-x-2 p-4 rounded-lg border-2 border-blue-500 bg-blue-50"
              }

              return (
                <div key={index} className={optionClass}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showFeedback} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                    {option}
                  </Label>
                  {showFeedback && index === currentQ.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )
            })}
          </RadioGroup>
        </div>

        {/* Feedback Section */}
        {showFeedback && selectedAnswer !== null && (
          <div
            className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </>
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {isCorrect ? "Correct! Well done!" : "Incorrect. Try again!"}
              </span>
            </div>
            <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{currentQ.explanation}</p>
            {showGamification && isCorrect && (
              <div className="mt-2 flex items-center gap-1 text-sm text-yellow-600">
                <Coins className="h-4 w-4" />
                <span>+30 points earned!</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline" className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {!showFeedback && selectedAnswer !== null && (
            <Button onClick={handleCheckAnswer} className="flex-1" variant="secondary">
              Check Answer
            </Button>
          )}

          <Button onClick={handleNext} disabled={selectedAnswer === null} className="flex-1">
            {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next Question"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
