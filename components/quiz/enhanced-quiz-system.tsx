"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Trophy, Target, BookOpen, Lock, CheckCircle, XCircle, Star } from "lucide-react"
import { type Quiz, getQuizById, getQuizzesByEventId, getQuizzesBySubscriptionLevel } from "@/lib/quiz-data"
import { historicalEvents, getHistoricalEventById } from "@/lib/historical-events"
import { getUserSubscription, canAccessContent, type SubscriptionLevel } from "@/lib/subscription"
import { saveQuizAttempt, getUserQuizProgress, getUserQuizStats, type QuizAttempt } from "@/lib/quiz-progress"

interface EnhancedQuizSystemProps {
  eventId?: string
  quizId?: string
  userLevel?: SubscriptionLevel
}

export function EnhancedQuizSystem({ eventId, quizId, userLevel = "basic" }: EnhancedQuizSystemProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null)
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null)
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({})
  const [isQuizActive, setIsQuizActive] = useState(false)

  const subscription = getUserSubscription()
  const userStats = getUserQuizStats("current-user")

  // Get available quizzes based on subscription level
  const availableQuizzes = eventId
    ? getQuizzesByEventId(eventId).filter((quiz) => canAccessContent(userLevel, quiz.subscriptionLevel))
    : getQuizzesBySubscriptionLevel(userLevel)

  useEffect(() => {
    if (quizId) {
      const quiz = getQuizById(quizId)
      if (quiz && canAccessContent(userLevel, quiz.subscriptionLevel)) {
        setSelectedQuiz(quiz)
      }
    }
  }, [quizId, userLevel])

  useEffect(() => {
    if (isQuizActive && !questionStartTime) {
      setQuestionStartTime(new Date())
    }
  }, [currentQuestion, isQuizActive, questionStartTime])

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizStartTime(new Date())
    setQuestionStartTime(new Date())
    setTimeSpent({})
    setIsQuizActive(true)
  }

  const selectAnswer = (questionId: string, answerIndex: number) => {
    if (questionStartTime) {
      const now = new Date()
      const questionTime = (now.getTime() - questionStartTime.getTime()) / 1000
      setTimeSpent((prev) => ({ ...prev, [questionId]: questionTime }))
    }

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setQuestionStartTime(new Date())
    } else {
      finishQuiz()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setQuestionStartTime(new Date())
    }
  }

  const finishQuiz = () => {
    if (!selectedQuiz || !quizStartTime) return

    const totalTimeSpent = (new Date().getTime() - quizStartTime.getTime()) / 1000
    const correctAnswers = selectedQuiz.questions.filter(
      (question, index) => selectedAnswers[question.id] === question.correctAnswer,
    ).length
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100)

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: selectedQuiz.id,
      userId: "current-user",
      score,
      totalQuestions: selectedQuiz.questions.length,
      correctAnswers,
      timeSpent: totalTimeSpent,
      completedAt: new Date(),
      answers: selectedQuiz.questions.map((question) => ({
        questionId: question.id,
        selectedAnswer: selectedAnswers[question.id] ?? -1,
        isCorrect: selectedAnswers[question.id] === question.correctAnswer,
        timeSpent: timeSpent[question.id] ?? 0,
      })),
    }

    saveQuizAttempt(attempt)
    setShowResults(true)
    setIsQuizActive(false)
  }

  const resetQuiz = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizStartTime(null)
    setQuestionStartTime(null)
    setTimeSpent({})
    setIsQuizActive(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getSubscriptionBadgeColor = (level: SubscriptionLevel) => {
    switch (level) {
      case "free":
        return "bg-gray-100 text-gray-800"
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
    }
  }

  if (showResults && selectedQuiz) {
    const correctAnswers = selectedQuiz.questions.filter(
      (question) => selectedAnswers[question.id] === question.correctAnswer,
    ).length
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100)
    const passed = score >= selectedQuiz.passingScore

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {passed ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">{passed ? "Chúc mừng!" : "Cần cố gắng thêm!"}</CardTitle>
            <CardDescription>Bạn đã hoàn thành bài kiểm tra "{selectedQuiz.title}"</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}%</div>
                <div className="text-sm text-gray-600">Điểm số</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Câu đúng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedQuiz.questions.length - correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Câu sai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((Object.values(timeSpent).reduce((a, b) => a + b, 0) / 60) * 10) / 10}
                </div>
                <div className="text-sm text-gray-600">Phút</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chi tiết câu trả lời</h3>
              {selectedQuiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <Card
                    key={question.id}
                    className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">
                          Câu {index + 1}: {question.question}
                        </h4>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Câu trả lời của bạn: </span>
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {userAnswer !== undefined ? question.options[userAnswer] : "Không trả lời"}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div>
                            <span className="font-medium">Đáp án đúng: </span>
                            <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                          </div>
                        )}

                        <div className="bg-blue-50 p-3 rounded-md">
                          <span className="font-medium">Giải thích: </span>
                          {question.explanation}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => startQuiz(selectedQuiz)} variant="outline">
                Làm lại
              </Button>
              <Button onClick={resetQuiz}>Chọn bài khác</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedQuiz && isQuizActive) {
    const question = selectedQuiz.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div>
                <CardTitle>{selectedQuiz.title}</CardTitle>
                <CardDescription>
                  Câu {currentQuestion + 1} / {selectedQuiz.questions.length}
                </CardDescription>
              </div>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty === "easy" ? "Dễ" : question.difficulty === "medium" ? "Trung bình" : "Khó"}
              </Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(question.id, index)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswers[question.id] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={previousQuestion} disabled={currentQuestion === 0} variant="outline">
                Câu trước
              </Button>

              <div className="flex gap-2">
                {currentQuestion === selectedQuiz.questions.length - 1 ? (
                  <Button onClick={finishQuiz} disabled={selectedAnswers[question.id] === undefined}>
                    Hoàn thành
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} disabled={selectedAnswers[question.id] === undefined}>
                    Câu tiếp
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Hệ thống Kiểm tra Lịch sử Việt Nam</h1>
        <p className="text-gray-600">Kiểm tra kiến thức lịch sử của bạn với các bài quiz đa dạng và thú vị</p>
      </div>

      <Tabs defaultValue="quizzes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quizzes">Bài kiểm tra</TabsTrigger>
          <TabsTrigger value="progress">Tiến độ</TabsTrigger>
          <TabsTrigger value="events">Sự kiện lịch sử</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableQuizzes.map((quiz) => {
              const event = getHistoricalEventById(quiz.eventId)
              const userProgress = getUserQuizProgress("current-user", quiz.id)
              const canAccess = canAccessContent(userLevel, quiz.subscriptionLevel)

              return (
                <Card key={quiz.id} className={`relative ${!canAccess ? "opacity-60" : ""}`}>
                  {!canAccess && (
                    <div className="absolute top-2 right-2">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <Badge className={getSubscriptionBadgeColor(quiz.subscriptionLevel)}>
                        {quiz.subscriptionLevel === "free"
                          ? "Miễn phí"
                          : quiz.subscriptionLevel === "basic"
                            ? "Cơ bản"
                            : "Cao cấp"}
                      </Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty === "easy"
                          ? "Dễ"
                          : quiz.difficulty === "medium"
                            ? "Trung bình"
                            : quiz.difficulty === "hard"
                              ? "Khó"
                              : "Hỗn hợp"}
                      </Badge>
                      <Badge variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {quiz.questions.length} câu
                      </Badge>
                      <Badge variant="outline">
                        <Target className="h-3 w-3 mr-1" />
                        {quiz.passingScore}% để đạt
                      </Badge>
                    </div>

                    {event && (
                      <div className="text-sm text-gray-600">
                        <strong>Sự kiện:</strong> {event.title} ({event.period})
                      </div>
                    )}

                    {userProgress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Điểm cao nhất:</span>
                          <span className="font-medium">{userProgress.bestScore}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Số lần làm:</span>
                          <span className="font-medium">{userProgress.totalAttempts}</span>
                        </div>
                        {userProgress.isPassed && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Đã đạt
                          </div>
                        )}
                      </div>
                    )}

                    <Button onClick={() => startQuiz(quiz)} disabled={!canAccess} className="w-full">
                      {userProgress ? "Làm lại" : "Bắt đầu"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số bài đã làm</p>
                    <p className="text-2xl font-bold">{userStats.totalQuizzesTaken}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                    <p className="text-2xl font-bold">{Math.round(userStats.averageScore)}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chuỗi ngày</p>
                    <p className="text-2xl font-bold">{userStats.streakDays}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Thời gian học</p>
                    <p className="text-2xl font-bold">{Math.round(userStats.totalTimeSpent / 60)}m</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {userStats.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userStats.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {historicalEvents.map((event) => {
              const eventQuizzes = getQuizzesByEventId(event.id)
              const accessibleQuizzes = eventQuizzes.filter((quiz) =>
                canAccessContent(userLevel, quiz.subscriptionLevel),
              )
              const canAccess = canAccessContent(userLevel, event.subscriptionLevel)

              return (
                <Card key={event.id} className={`relative ${!canAccess ? "opacity-60" : ""}`}>
                  {!canAccess && (
                    <div className="absolute top-2 right-2">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge className={getSubscriptionBadgeColor(event.subscriptionLevel)}>
                        {event.subscriptionLevel === "free"
                          ? "Miễn phí"
                          : event.subscriptionLevel === "basic"
                            ? "Cơ bản"
                            : "Cao cấp"}
                      </Badge>
                    </div>
                    <CardDescription>{event.shortDescription}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <div>
                        <strong>Thời gian:</strong> {event.startDate}
                        {event.endDate && ` - ${event.endDate}`}
                      </div>
                      <div>
                        <strong>Thời kỳ:</strong> {event.period}
                      </div>
                      <div>
                        <strong>Địa điểm:</strong> {event.location.name}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{accessibleQuizzes.length} bài kiểm tra</span>
                      <Button
                        size="sm"
                        disabled={!canAccess || accessibleQuizzes.length === 0}
                        onClick={() => {
                          if (accessibleQuizzes.length === 1) {
                            startQuiz(accessibleQuizzes[0])
                          }
                        }}
                      >
                        {accessibleQuizzes.length === 1 ? "Bắt đầu" : "Xem chi tiết"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
