"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

// Test quiz data with various scenarios
const testQuizzes = [
  {
    id: "basic-test",
    title: "Basic Answer Test",
    questions: [
      {
        id: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1, // Index 1 = "4"
        explanation: "2 + 2 equals 4",
      },
      {
        id: 2,
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: 1, // Index 1 = "Blue"
        explanation: "The sky appears blue due to light scattering",
      },
    ],
  },
  {
    id: "edge-cases",
    title: "Edge Cases Test",
    questions: [
      {
        id: 1,
        question: "First option correct?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: 0, // Index 0 = First option
        explanation: "Testing first option as correct",
      },
      {
        id: 2,
        question: "Last option correct?",
        options: ["Wrong 1", "Wrong 2", "Wrong 3", "Correct Answer"],
        correctAnswer: 3, // Index 3 = Last option
        explanation: "Testing last option as correct",
      },
    ],
  },
]

export default function QuizTestPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{
      questionId: number
      selectedIndex: number | null
      correctIndex: number
      isCorrect: boolean
      selectedText: string
      correctText: string
    }>
  >([])

  const currentQuiz = testQuizzes[selectedQuiz]
  const currentQ = currentQuiz.questions[currentQuestion]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(false)
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)

    // Record test result
    const result = {
      questionId: currentQ.id,
      selectedIndex: selectedAnswer,
      correctIndex: currentQ.correctAnswer,
      isCorrect: selectedAnswer === currentQ.correctAnswer,
      selectedText: selectedAnswer !== null ? currentQ.options[selectedAnswer] : "No selection",
      correctText: currentQ.options[currentQ.correctAnswer],
    }

    setTestResults((prev) => {
      const newResults = [...prev]
      const existingIndex = newResults.findIndex((r) => r.questionId === currentQ.id)
      if (existingIndex >= 0) {
        newResults[existingIndex] = result
      } else {
        newResults.push(result)
      }
      return newResults
    })
  }

  const handleNext = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTestResults([])
  }

  const isCorrect = selectedAnswer === currentQ.correctAnswer

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Answer Selection Test</h1>
          <p className="text-gray-600">Test the quiz functionality to ensure correct answer detection</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Quiz Interface */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentQuiz.title}</CardTitle>
                    <CardDescription>Testing quiz answer selection logic</CardDescription>
                  </div>
                  <Badge variant="outline">
                    {currentQuestion + 1}/{currentQuiz.questions.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quiz Selection */}
                <div className="flex gap-2">
                  {testQuizzes.map((quiz, index) => (
                    <Button
                      key={quiz.id}
                      variant={selectedQuiz === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedQuiz(index)
                        handleReset()
                      }}
                    >
                      {quiz.title}
                    </Button>
                  ))}
                </div>

                {/* Question */}
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
                        "flex items-center space-x-3 p-4 rounded-lg border transition-all hover:bg-gray-50"

                      if (showFeedback && selectedAnswer !== null) {
                        if (index === currentQ.correctAnswer) {
                          optionClass =
                            "flex items-center space-x-3 p-4 rounded-lg border-2 border-green-500 bg-green-50"
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
                            [{index}] {option}
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

                {/* Feedback */}
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
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{currentQ.explanation}</p>
                  </div>
                )}

                {/* Controls */}
                <div className="flex gap-2">
                  <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
                    Previous
                  </Button>

                  {!showFeedback && selectedAnswer !== null && (
                    <Button onClick={handleCheckAnswer} variant="secondary">
                      Check Answer
                    </Button>
                  )}

                  <Button onClick={handleNext} disabled={currentQuestion === currentQuiz.questions.length - 1}>
                    Next
                  </Button>

                  <Button onClick={handleReset} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Panel */}
          <div className="space-y-6">
            {/* Current State */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Debug Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Selected Answer Index:</span>
                    <span className="font-mono">{selectedAnswer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Correct Answer Index:</span>
                    <span className="font-mono">{currentQ.correctAnswer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Selected Answer Text:</span>
                    <span className="font-mono">
                      {selectedAnswer !== null ? currentQ.options[selectedAnswer] : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Correct Answer Text:</span>
                    <span className="font-mono">{currentQ.options[currentQ.correctAnswer]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Is Correct:</span>
                    <span className={`font-mono ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                      {selectedAnswer === currentQ.correctAnswer ? "TRUE" : "FALSE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Show Feedback:</span>
                    <span className="font-mono">{showFeedback ? "TRUE" : "FALSE"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>Results from answered questions</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">No results yet. Answer some questions to see results.</p>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {result.isCorrect ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium">Question {result.questionId}</span>
                          <Badge variant={result.isCorrect ? "default" : "destructive"}>
                            {result.isCorrect ? "Correct" : "Wrong"}
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1 text-gray-600">
                          <div>
                            Selected: [{result.selectedIndex}] {result.selectedText}
                          </div>
                          <div>
                            Correct: [{result.correctIndex}] {result.correctText}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
