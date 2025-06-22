"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Settings, Play, AlertCircle, CheckCircle, Info } from "lucide-react"
import { topicsData } from "@/lib/topics-data"

export default function CustomPracticePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get("mode") || "practice"
  const preselectedTopic = searchParams.get("topic")

  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState([30])
  const [difficulty, setDifficulty] = useState("mixed")
  const [timeLimit, setTimeLimit] = useState(mode === "exam" ? 60 : 0)
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [showExplanations, setShowExplanations] = useState(mode === "practice")
  const [allowReview, setAllowReview] = useState(mode === "practice")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (preselectedTopic) {
      const topic = topicsData.find((t) => t.name === preselectedTopic)
      if (topic) {
        setSelectedTopics([topic.id])
      }
    }
  }, [preselectedTopic])

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const getAvailableQuestions = () => {
    if (selectedTopics.length === 0) return 0
    return selectedTopics.reduce((total, topicId) => {
      const topic = topicsData.find((t) => t.id === topicId)
      return total + (topic?.questionCount || 0)
    }, 0)
  }

  const getMaxQuestions = () => {
    const available = getAvailableQuestions()
    return Math.min(available, 200) // Cap at 200 questions
  }

  const canStartTest = () => {
    return selectedTopics.length > 0 && questionCount[0] >= 25 && questionCount[0] <= getAvailableQuestions()
  }

  const handleStartTest = async () => {
    if (!canStartTest()) return

    setIsLoading(true)

    try {
      const config = {
        mode,
        topics: selectedTopics,
        questionCount: questionCount[0],
        difficulty,
        timeLimit: mode === "exam" ? timeLimit : 0,
        shuffleQuestions,
        showExplanations: mode === "practice" ? showExplanations : false,
        allowReview: mode === "practice" ? allowReview : false,
      }

      const params = new URLSearchParams({
        config: JSON.stringify(config),
      })

      router.push(`/practice/test?${params.toString()}`)
    } catch (error) {
      console.error("Error starting test:", error)
      setIsLoading(false)
    }
  }

  const estimatedTime = Math.ceil(questionCount[0] * 1.5) // 1.5 minutes per question

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {mode === "practice" ? (
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            ) : (
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {mode === "practice" ? "Practice Mode" : "Exam Mode"}
              </h1>
              <p className="text-gray-600">
                {mode === "practice"
                  ? "Customize your practice session with immediate feedback and explanations"
                  : "Create a timed exam with realistic testing conditions"}
              </p>
            </div>
          </div>

          {/* Mode Info Alert */}
          <div
            className={`p-4 rounded-lg border ${
              mode === "practice" ? "bg-blue-50 border-blue-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <Info className={`h-5 w-5 mt-0.5 ${mode === "practice" ? "text-blue-600" : "text-red-600"}`} />
              <div>
                <h3 className={`font-medium ${mode === "practice" ? "text-blue-900" : "text-red-900"}`}>
                  {mode === "practice" ? "Practice Mode Features" : "Exam Mode Features"}
                </h3>
                <ul className={`text-sm mt-1 space-y-1 ${mode === "practice" ? "text-blue-800" : "text-red-800"}`}>
                  {mode === "practice" ? (
                    <>
                      <li>• Immediate feedback and explanations</li>
                      <li>• Ability to review previous questions</li>
                      <li>• No time pressure - learn at your own pace</li>
                    </>
                  ) : (
                    <>
                      <li>• Timed examination with realistic conditions</li>
                      <li>• No immediate feedback during the test</li>
                      <li>• Results and explanations shown at the end</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Topic Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Topics</CardTitle>
                <CardDescription>
                  Choose one or more topics for your test. You need at least 25 questions to start.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicsData.map((topic) => (
                    <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={topic.id}
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={() => handleTopicToggle(topic.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={topic.id} className="font-medium cursor-pointer text-base">
                            {topic.name}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{topic.description}</p>

                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {topic.questionCount} questions
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {topic.period}
                            </Badge>
                            {topic.difficulty && (
                              <Badge
                                variant={
                                  topic.difficulty === "easy"
                                    ? "default"
                                    : topic.difficulty === "medium"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {topic.difficulty}
                              </Badge>
                            )}
                          </div>

                          {topic.subtopics && topic.subtopics.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-1">Includes:</p>
                              <div className="flex flex-wrap gap-1">
                                {topic.subtopics.slice(0, 3).map((subtopic, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {subtopic}
                                  </Badge>
                                ))}
                                {topic.subtopics.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{topic.subtopics.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Question Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Question Settings</CardTitle>
                <CardDescription>Configure your test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Count */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Number of Questions</Label>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{questionCount[0]}</span> questions
                      <span className="text-gray-400 ml-2">(Available: {getAvailableQuestions()})</span>
                    </div>
                  </div>
                  <Slider
                    value={questionCount}
                    onValueChange={setQuestionCount}
                    max={getMaxQuestions()}
                    min={25}
                    step={5}
                    className="w-full"
                    disabled={selectedTopics.length === 0}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>25 (minimum)</span>
                    <span>{getMaxQuestions()} (maximum available)</span>
                  </div>
                </div>

                <Separator />

                {/* Difficulty */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Difficulty Level</Label>
                  <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                        <RadioGroupItem value="easy" id="easy" />
                        <div className="flex-1">
                          <Label htmlFor="easy" className="font-medium cursor-pointer">
                            Easy
                          </Label>
                          <p className="text-sm text-gray-600">Basic knowledge and recall questions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                        <RadioGroupItem value="medium" id="medium" />
                        <div className="flex-1">
                          <Label htmlFor="medium" className="font-medium cursor-pointer">
                            Medium
                          </Label>
                          <p className="text-sm text-gray-600">Understanding and application questions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                        <RadioGroupItem value="hard" id="hard" />
                        <div className="flex-1">
                          <Label htmlFor="hard" className="font-medium cursor-pointer">
                            Hard
                          </Label>
                          <p className="text-sm text-gray-600">Analysis and synthesis questions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 bg-blue-50 border-blue-200">
                        <RadioGroupItem value="mixed" id="mixed" />
                        <div className="flex-1">
                          <Label htmlFor="mixed" className="font-medium cursor-pointer">
                            Mixed
                          </Label>
                          <p className="text-sm text-gray-600">Balanced difficulty (Recommended)</p>
                        </div>
                        <Badge variant="default" className="text-xs">
                          Recommended
                        </Badge>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {mode === "exam" && (
                  <>
                    <Separator />
                    {/* Time Limit */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-base font-medium">Time Limit</Label>
                        <span className="text-sm text-gray-600 font-medium">{timeLimit} minutes</span>
                      </div>
                      <Slider
                        value={[timeLimit]}
                        onValueChange={(value) => setTimeLimit(value[0])}
                        max={180}
                        min={30}
                        step={15}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>30 min</span>
                        <span>180 min</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <Label className="font-medium">Shuffle Questions</Label>
                    <p className="text-sm text-gray-600">Randomize question order for variety</p>
                  </div>
                  <Switch checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
                </div>

                {mode === "practice" && (
                  <>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label className="font-medium">Show Explanations</Label>
                        <p className="text-sm text-gray-600">Display answer explanations immediately</p>
                      </div>
                      <Switch checked={showExplanations} onCheckedChange={setShowExplanations} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label className="font-medium">Allow Review</Label>
                        <p className="text-sm text-gray-600">Can go back to previous questions</p>
                      </div>
                      <Switch checked={allowReview} onCheckedChange={setAllowReview} />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mode:</span>
                    <Badge variant={mode === "practice" ? "default" : "destructive"}>
                      {mode === "practice" ? "Practice" : "Exam"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Topics:</span>
                    <span className="font-medium">{selectedTopics.length} selected</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{questionCount[0]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-medium capitalize">{difficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Est. Time:</span>
                    <span className="font-medium">{estimatedTime}m</span>
                  </div>
                  {mode === "exam" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-medium">{timeLimit}m</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Validation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {selectedTopics.length > 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Topics selected</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {questionCount[0] >= 25 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Minimum 25 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {questionCount[0] <= getAvailableQuestions() ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Enough questions available</span>
                  </div>
                </div>

                <Button onClick={handleStartTest} disabled={!canStartTest() || isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Starting...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start {mode === "practice" ? "Practice" : "Exam"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Mode Info */}
            <Card>
              <CardHeader>
                <CardTitle>{mode === "practice" ? "Practice Mode" : "Exam Mode"}</CardTitle>
              </CardHeader>
              <CardContent>
                {mode === "practice" ? (
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Immediate feedback on answers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Detailed explanations available
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Can review previous questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      No time pressure
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Focus on learning
                    </li>
                  </ul>
                ) : (
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      Timed examination
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      No immediate feedback
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Cannot review previous questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Results shown at the end
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Simulates real exam conditions
                    </li>
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
