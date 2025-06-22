"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Clock, Flag, AlertTriangle, RotateCcw, Home } from "lucide-react"
import { generateTest, type TestQuestion, type TestConfig } from "@/lib/test-generator"
import { saveTestResult, type TestResult } from "@/lib/test-storage"
import Link from "next/link"

export default function TestPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [config, setConfig] = useState<TestConfig | null>(null)
  const [questions, setQuestions] = useState<TestQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [testStartTime, setTestStartTime] = useState<Date | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize test
  useEffect(() => {
    const initializeTest = async () => {
      try {
        setLoading(true)

        // Get config from URL params
        const configParam = searchParams.get("config")
        const presetParam = searchParams.get("preset")

        let testConfig: TestConfig

        if (configParam) {
          testConfig = JSON.parse(configParam)
        } else if (presetParam) {
          // Handle preset configurations
          testConfig = getPresetConfig(presetParam)
        } else {
          throw new Error("No test configuration provided")
        }

        setConfig(testConfig)

        // Generate questions
        const generatedQuestions = await generateTest(testConfig)
        setQuestions(generatedQuestions)
        setSelectedAnswers(new Array(generatedQuestions.length).fill(null))

        // Set up timer for exam mode
        if (testConfig.mode === "exam" && testConfig.timeLimit) {
          setTimeRemaining(testConfig.timeLimit * 60) // Convert to seconds
        }

        setTestStartTime(new Date())
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize test")
        setLoading(false)
      }
    }

    initializeTest()
  }, [searchParams.toString()])

  // Timer effect
  useEffect(() => {
    if (config?.mode === "exam" && timeRemaining > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining, testCompleted, config?.mode, config?.timeLimit])

  const getPresetConfig = (preset: string): TestConfig => {
    const presets: Record<string, TestConfig> = {
      "quick-25": {
        mode: "practice",
        topics: ["bac-thuoc", "phong-kien"],
        questionCount: 25,
        difficulty: "mixed",
        timeLimit: 0,
        shuffleQuestions: true,
        showExplanations: true,
        allowReview: true,
      },
      "quick-50": {
        mode: "practice",
        topics: ["bac-thuoc", "phong-kien", "thuc-dan"],
        questionCount: 50,
        difficulty: "mixed",
        timeLimit: 0,
        shuffleQuestions: true,
        showExplanations: true,
        allowReview: true,
      },
      "quick-100": {
        mode: "exam",
        topics: ["bac-thuoc", "phong-kien", "thuc-dan", "hien-dai"],
        questionCount: 100,
        difficulty: "mixed",
        timeLimit: 90,
        shuffleQuestions: true,
        showExplanations: false,
        allowReview: false,
      },
    }

    return presets[preset] || presets["quick-25"]
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowFeedback(false)
  }

  const handleCheckAnswer = () => {
    if (config?.showExplanations) {
      setShowFeedback(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
    } else {
      handleCompleteTest()
    }
  }

  const handlePrevious = () => {
    if (config?.allowReview && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
    }
  }

  const handleTimeUp = useCallback(() => {
    if (testCompleted) return // Prevent multiple calls
    handleCompleteTest()
  }, [testCompleted])

  const handleCompleteTest = async () => {
    if (testCompleted) return

    const endTime = new Date()
    const totalTime = testStartTime ? endTime.getTime() - testStartTime.getTime() : 0

    // Calculate results
    let correctAnswers = 0
    const detailedResults = questions.map((question, index) => {
      const userAnswer = selectedAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer
      if (isCorrect) correctAnswers++

      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        options: question.options,
        explanation: question.explanation,
        topic: question.topic,
      }
    })

    const result: TestResult = {
      id: `test_${Date.now()}`,
      config: config!,
      questions: questions.length,
      correctAnswers,
      score: Math.round((correctAnswers / questions.length) * 100),
      timeSpent: totalTime,
      completedAt: endTime,
      detailedResults,
    }

    // Save result
    await saveTestResult(result)

    setTestResult(result)
    setTestCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Generating Your Test</h3>
            <p className="text-gray-600">Please wait while we prepare your questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-red-700">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button asChild>
              <Link href="/practice">
                <Home className="h-4 w-4 mr-2" />
                Back to Practice
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (testCompleted && testResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Test Completed!</CardTitle>
              <CardDescription>{config?.mode === "practice" ? "Practice Session" : "Exam"} Results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Score Overview */}
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{testResult.score}%</div>
                <div className="text-xl text-gray-600 mb-4">
                  {testResult.correctAnswers} out of {testResult.questions} correct
                </div>
                <Badge
                  variant={testResult.score >= 80 ? "default" : testResult.score >= 60 ? "secondary" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {testResult.score >= 80 ? "Excellent" : testResult.score >= 60 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{testResult.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {testResult.questions - testResult.correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600">Incorrect Answers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(Math.floor(testResult.timeSpent / 1000))}
                    </div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Detailed Results</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {testResult.detailedResults.map((result, index) => (
                    <Card key={index} className="border-l-4 border-l-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {result.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">
                              Q{index + 1}: {result.question}
                            </p>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="font-medium text-green-700">Correct:</span>
                                <span className="text-green-700">{result.options[result.correctAnswer]}</span>
                              </div>

                              {!result.isCorrect && result.userAnswer !== null && (
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="font-medium text-red-700">Your answer:</span>
                                  <span className="text-red-700">{result.options[result.userAnswer]}</span>
                                </div>
                              )}

                              {result.userAnswer === null && (
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium text-gray-600">Not answered</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">Explanation:</span> {result.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/practice/custom")} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Another Test
                </Button>
                <Button asChild>
                  <Link href="/practice">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Practice
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isCorrect = selectedAnswer === currentQ?.correctAnswer

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {config?.mode === "practice" ? (
                    <Badge variant="default">Practice Mode</Badge>
                  ) : (
                    <Badge variant="destructive">Exam Mode</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
              </div>

              {config?.mode === "exam" && config.timeLimit && (
                <div className="text-right">
                  <div className="flex items-center gap-2 text-lg font-mono">
                    <Clock className="h-5 w-5" />
                    <span className={timeRemaining < 300 ? "text-red-600" : "text-gray-900"}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ?.question}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{currentQ?.topic}</Badge>
              <Badge variant="secondary">{currentQ?.difficulty}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Options */}
            <RadioGroup
              value={selectedAnswer?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-3"
            >
              {currentQ?.options.map((option, index) => {
                let optionClass =
                  "flex items-center space-x-3 p-4 rounded-lg border transition-all hover:bg-gray-50 cursor-pointer"

                if (showFeedback && selectedAnswer !== null) {
                  if (index === currentQ.correctAnswer) {
                    optionClass = "flex items-center space-x-3 p-4 rounded-lg border-2 border-green-500 bg-green-50"
                  } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                    optionClass = "flex items-center space-x-3 p-4 rounded-lg border-2 border-red-500 bg-red-50"
                  } else {
                    optionClass = "flex items-center space-x-3 p-4 rounded-lg border bg-gray-100 opacity-60"
                  }
                } else if (selectedAnswer === index) {
                  optionClass = "flex items-center space-x-3 p-4 rounded-lg border-2 border-blue-500 bg-blue-50"
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

            {/* Feedback */}
            {showFeedback && selectedAnswer !== null && (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{currentQ?.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between gap-4">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || !config?.allowReview}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {config?.showExplanations && !showFeedback && selectedAnswer !== null && (
                <Button onClick={handleCheckAnswer} variant="secondary" className="flex-1">
                  Check Answer
                </Button>
              )}

              <Button onClick={handleNext} disabled={selectedAnswer === null} className="flex-1">
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <Flag className="h-4 w-4 mr-2" />
                    Finish Test
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
