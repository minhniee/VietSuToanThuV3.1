import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Target, TrendingUp, Play, Settings, History, Award, Users, Calendar } from "lucide-react"
import Link from "next/link"

const practiceStats = {
  totalQuestions: 1250,
  questionsAnswered: 485,
  averageScore: 78,
  timeSpent: 145, // minutes
  streakDays: 7,
  completedTests: 12,
  bestScore: 95,
  weakTopics: ["Thời kỳ Pháp thuộc", "Chiến tranh Việt Nam"],
  strongTopics: ["Thời kỳ Bắc thuộc", "Nhà Lý"],
  recentActivity: "2 hours ago",
  totalPoints: 2450,
}

const quickTests = [
  {
    id: "quick-25",
    name: "Quick Test - 25 Questions",
    description: "Mixed topics from all periods",
    questions: 25,
    estimatedTime: 15,
    difficulty: "Mixed",
    icon: <Clock className="h-5 w-5" />,
    color: "bg-blue-500",
  },
  {
    id: "quick-50",
    name: "Standard Test - 50 Questions",
    description: "Comprehensive coverage",
    questions: 50,
    estimatedTime: 30,
    difficulty: "Mixed",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-green-500",
  },
  {
    id: "quick-100",
    name: "Full Test - 100 Questions",
    description: "Complete assessment",
    questions: 100,
    estimatedTime: 60,
    difficulty: "Mixed",
    icon: <Target className="h-5 w-5" />,
    color: "bg-purple-500",
  },
]

const recentTests = [
  {
    id: "test-1",
    name: "Thời kỳ Bắc thuộc - 30 câu",
    score: 85,
    totalQuestions: 30,
    completedAt: "2024-01-20",
    mode: "practice",
    timeSpent: "25 phút",
  },
  {
    id: "test-2",
    name: "Mixed Topics - 50 câu",
    score: 72,
    totalQuestions: 50,
    completedAt: "2024-01-19",
    mode: "exam",
    timeSpent: "45 phút",
  },
  {
    id: "test-3",
    name: "Khởi nghĩa Hai Bà Trưng - 25 câu",
    score: 92,
    totalQuestions: 25,
    completedAt: "2024-01-18",
    mode: "practice",
    timeSpent: "18 phút",
  },
]

const achievements = [
  {
    id: "streak-7",
    name: "7-Day Streak",
    description: "Practiced for 7 consecutive days",
    icon: <Calendar className="h-5 w-5" />,
    earned: true,
    date: "2024-01-20",
  },
  {
    id: "score-90",
    name: "Excellence",
    description: "Scored 90% or higher",
    icon: <Award className="h-5 w-5" />,
    earned: true,
    date: "2024-01-18",
  },
  {
    id: "questions-500",
    name: "Knowledge Seeker",
    description: "Answered 500 questions",
    icon: <BookOpen className="h-5 w-5" />,
    earned: false,
    progress: 97,
  },
]

export default function PracticePage() {
  const progressPercentage = (practiceStats.questionsAnswered / practiceStats.totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Practice & Exam Mode</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with customizable quizzes and track your progress through Vietnamese history
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{practiceStats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{practiceStats.questionsAnswered}</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{practiceStats.timeSpent}m</div>
                  <div className="text-sm text-gray-600">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{practiceStats.bestScore}%</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Quick Tests
                </CardTitle>
                <CardDescription>Start practicing immediately with pre-configured tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {quickTests.map((test) => (
                    <Card key={test.id} className="transition-all hover:shadow-md border-2 hover:border-blue-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 ${test.color} rounded-lg text-white`}>{test.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{test.name}</h3>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600">{test.description}</p>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Questions:</span>
                              <span className="font-medium">{test.questions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Time:</span>
                              <span className="font-medium">~{test.estimatedTime}m</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Difficulty:</span>
                              <Badge variant="outline" className="text-xs">
                                {test.difficulty}
                              </Badge>
                            </div>
                          </div>

                          <Button asChild className="w-full" size="sm">
                            <Link href={`/practice/test?preset=${test.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              Start Test
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Custom Practice & Exam
                </CardTitle>
                <CardDescription>Create your own test with specific topics and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-600 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-blue-900 text-lg">Practice Mode</h3>
                        </div>

                        <p className="text-sm text-blue-800">
                          Learn with immediate feedback, explanations, and the ability to review answers
                        </p>

                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>✓ Immediate feedback on answers</li>
                          <li>✓ Detailed explanations</li>
                          <li>✓ Can review previous questions</li>
                          <li>✓ No time pressure</li>
                          <li>✓ Progress tracking</li>
                        </ul>

                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <Link href="/practice/custom?mode=practice">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Start Practice
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-600 rounded-lg">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-red-900 text-lg">Exam Mode</h3>
                        </div>

                        <p className="text-sm text-red-800">
                          Simulate real exam conditions with time limits and no immediate feedback
                        </p>

                        <ul className="text-xs text-red-700 space-y-1">
                          <li>✓ Timed examination</li>
                          <li>✓ No immediate feedback</li>
                          <li>✓ Cannot review previous questions</li>
                          <li>✓ Results shown at the end</li>
                          <li>✓ Real exam simulation</li>
                        </ul>

                        <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                          <Link href="/practice/custom?mode=exam">
                            <Clock className="h-4 w-4 mr-2" />
                            Start Exam
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          achievement.earned ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        {!achievement.earned && achievement.progress && (
                          <div className="mt-1">
                            <Progress value={achievement.progress} className="h-1" />
                            <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
                          </div>
                        )}
                      </div>
                      {achievement.earned && (
                        <Badge variant="default" className="text-xs">
                          Earned {achievement.date}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Questions Answered</span>
                    <span className="text-gray-600">
                      {practiceStats.questionsAnswered}/{practiceStats.totalQuestions}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% complete</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Strong Topics</h4>
                  {practiceStats.strongTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-green-700 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {topic}
                      </span>
                      <Badge variant="outline" className="text-xs text-green-600">
                        Strong
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Areas for Improvement</h4>
                  {practiceStats.weakTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-orange-700 flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        {topic}
                      </span>
                      <Button asChild size="sm" variant="outline" className="h-6 text-xs">
                        <Link href={`/practice/custom?topic=${encodeURIComponent(topic)}`}>Practice</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTests.map((test) => (
                    <div key={test.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm line-clamp-2">{test.name}</h4>
                        <Badge
                          variant={test.mode === "practice" ? "default" : "destructive"}
                          className="text-xs ml-2 flex-shrink-0"
                        >
                          {test.mode}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Score:</span>
                          <span
                            className={`font-medium ${
                              test.score >= 80
                                ? "text-green-600"
                                : test.score >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {test.score}% ({Math.round((test.score * test.totalQuestions) / 100)}/{test.totalQuestions})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time:</span>
                          <span>{test.timeSpent}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Date:</span>
                          <span>{test.completedAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full mt-4" size="sm">
                  <Link href="/practice/history">
                    <History className="h-4 w-4 mr-2" />
                    View All History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/leaderboard">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/achievements">
                    <Award className="h-4 w-4 mr-2" />
                    All Achievements
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/study-groups">
                    <Users className="h-4 w-4 mr-2" />
                    Study Groups
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
