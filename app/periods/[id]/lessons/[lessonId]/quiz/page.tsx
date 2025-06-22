"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, AlertCircle } from "lucide-react"
import Link from "next/link"

const quizData = {
  title: "Quiz: Khởi nghĩa Hai Bà Trưng",
  description: "Kiểm tra kiến thức về cuộc khởi nghĩa Hai Bà Trưng",
  questions: [
    {
      id: 1,
      question: "Khởi nghĩa Hai Bà Trưng diễn ra vào năm nào?",
      options: ["Năm 39", "Năm 40", "Năm 41", "Năm 42"],
      correctAnswer: 1, // Index 1 = "Năm 40"
      explanation: "Khởi nghĩa Hai Bà Trưng bắt đầu vào năm 40 sau Công nguyên tại Mê Linh.",
    },
    {
      id: 2,
      question: "Nguyên nhân trực tiếp dẫn đến khởi nghĩa là gì?",
      options: ["Thuế khóa nặng nề", "Tô Định giết chết Thi Sách", "Cướp đất của dân", "Ép dân làm lính"],
      correctAnswer: 1, // Index 1 = "Tô Định giết chết Thi Sách"
      explanation:
        "Tô Định giết chết Thi Sách (chồng của Trưng Trắc) là nguyên nhân trực tiếp khiến hai Bà Trưng khởi nghĩa.",
    },
    {
      id: 3,
      question: "Sau khi thắng lợi, Trưng Trắc lấy hiệu là gì?",
      options: ["Trưng Vương", "Nữ Hoàng", "Trưng Nữ Vương", "Mê Linh Vương"],
      correctAnswer: 2, // Index 2 = "Trưng Nữ Vương"
      explanation: "Trưng Trắc tự lập làm Vương và lấy hiệu là Trưng Nữ Vương.",
    },
    {
      id: 4,
      question: "Cuộc khởi nghĩa thất bại vào năm nào?",
      options: ["Năm 42", "Năm 43", "Năm 44", "Năm 45"],
      correctAnswer: 1, // Index 1 = "Năm 43"
      explanation: "Cuộc khởi nghĩa Hai Bà Trưng thất bại vào năm 43 sau khi bị Mã Viện đàn áp.",
    },
    {
      id: 5,
      question: "Ý nghĩa quan trọng nhất của khởi nghĩa Hai Bà Trưng là gì?",
      options: [
        "Giành được độc lập lâu dài",
        "Mở đầu truyền thống đấu tranh chống ngoại xâm",
        "Thống nhất cả nước",
        "Thiết lập chế độ phong kiến",
      ],
      correctAnswer: 1, // Index 1 = "Mở đầu truyền thống đấu tranh chống ngoại xâm"
      explanation:
        "Khởi nghĩa Hai Bà Trưng mở đầu truyền thống đấu tranh anh dũng chống ngoại xâm của dân tộc Việt Nam.",
    },
  ],
}

export default function QuizPage({ params }: { params: { id: string; lessonId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quizData.questions.length).fill(null),
  )
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowFeedback(false) // Reset feedback when selecting new answer
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
    } else {
      setQuizCompleted(true)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
    }
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(quizData.questions.length).fill(null))
    setShowResults(false)
    setQuizCompleted(false)
    setShowFeedback(false)
  }

  const calculateScore = () => {
    let correct = 0
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const currentQ = quizData.questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correctAnswer

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quizData.questions.length) * 100)

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Kết quả Quiz</CardTitle>
              <CardDescription>Bạn đã hoàn thành quiz về Khởi nghĩa Hai Bà Trưng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score}/{quizData.questions.length}
                </div>
                <div className="text-lg text-gray-600">Điểm số: {percentage}%</div>
                <Badge
                  variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                  className="mt-2"
                >
                  {percentage >= 80 ? "Xuất sắc" : percentage >= 60 ? "Khá" : "Cần cải thiện"}
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Chi tiết kết quả:</h3>
                {quizData.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index]
                  const isQuestionCorrect = userAnswer === question.correctAnswer

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
                            Câu {index + 1}: {question.question}
                          </p>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="font-medium text-green-700">Đáp án đúng:</span>
                              <span className="text-green-700">{question.options[question.correctAnswer]}</span>
                            </div>

                            {!isQuestionCorrect && userAnswer !== null && (
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="font-medium text-red-700">Bạn đã chọn:</span>
                                <span className="text-red-700">{question.options[userAnswer]}</span>
                              </div>
                            )}

                            {userAnswer === null && (
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-gray-500" />
                                <span className="font-medium text-gray-600">Chưa trả lời</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">Giải thích:</span> {question.explanation}
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
                  Làm lại
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/periods/${params.id}`}>Tiếp tục học</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link
            href={`/periods/${params.id}/lessons/${params.lessonId}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại bài học
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{quizData.title}</CardTitle>
                <CardDescription>{quizData.description}</CardDescription>
              </div>
              <Badge variant="outline">
                {currentQuestion + 1}/{quizData.questions.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tiến độ</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Câu {currentQuestion + 1}: {currentQ.question}
              </h3>

              <RadioGroup
                value={selectedAnswer?.toString() || ""}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => {
                  let optionClass = "flex items-center space-x-2 p-4 rounded-lg border transition-all hover:bg-gray-50"

                  if (showFeedback && selectedAnswer !== null) {
                    if (index === currentQ.correctAnswer) {
                      // Correct answer - always green
                      optionClass = "flex items-center space-x-2 p-4 rounded-lg border-2 border-green-500 bg-green-50"
                    } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                      // User's wrong answer - red
                      optionClass = "flex items-center space-x-2 p-4 rounded-lg border-2 border-red-500 bg-red-50"
                    } else {
                      // Other options - dimmed
                      optionClass = "flex items-center space-x-2 p-4 rounded-lg border bg-gray-100 opacity-60"
                    }
                  } else if (selectedAnswer === index) {
                    // Selected but not checked yet
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
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Chính xác!" : "Không chính xác"}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{currentQ.explanation}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline" className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Câu trước
              </Button>

              {!showFeedback && selectedAnswer !== null && (
                <Button onClick={handleCheckAnswer} className="flex-1" variant="secondary">
                  Kiểm tra đáp án
                </Button>
              )}

              <Button onClick={handleNext} disabled={selectedAnswer === null} className="flex-1">
                {currentQuestion === quizData.questions.length - 1 ? "Hoàn thành" : "Câu tiếp"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Debug Info (remove in production) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
                <strong>Debug Info:</strong>
                <br />
                Selected Answer Index: {selectedAnswer}
                <br />
                Correct Answer Index: {currentQ.correctAnswer}
                <br />
                Selected Answer Text: {selectedAnswer !== null ? currentQ.options[selectedAnswer] : "None"}
                <br />
                Correct Answer Text: {currentQ.options[currentQ.correctAnswer]}
                <br />
                Is Correct: {selectedAnswer === currentQ.correctAnswer ? "Yes" : "No"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
