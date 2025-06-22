"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Target, Search, Filter, Trash2 } from "lucide-react"
import { getTestResults, getUserProgress, clearAllData, type TestResult } from "@/lib/test-storage"
import Link from "next/link"

export default function TestHistoryPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [filteredResults, setFilteredResults] = useState<TestResult[]>([])
  const [userProgress, setUserProgress] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [modeFilter, setModeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterAndSortResults()
  }, [testResults, searchTerm, modeFilter, sortBy])

  const loadData = () => {
    const results = getTestResults()
    const progress = getUserProgress()
    setTestResults(results)
    setUserProgress(progress)
  }

  const filterAndSortResults = () => {
    let filtered = [...testResults]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((result) =>
        result.config.topics.some((topic: string) => topic.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply mode filter
    if (modeFilter !== "all") {
      filtered = filtered.filter((result) => result.config.mode === modeFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        case "score":
          return b.score - a.score
        case "questions":
          return b.questions - a.questions
        default:
          return 0
      }
    })

    setFilteredResults(filtered)
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all test data? This action cannot be undone.")) {
      clearAllData()
      loadData()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  if (!userProgress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading test history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Test History</h1>
          <p className="text-gray-600">Review your past test performance and track your progress</p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userProgress.totalTests}</div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userProgress.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{Math.floor(userProgress.timeSpent / 60000)}m</div>
                  <div className="text-sm text-gray-600">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userProgress.bestScore}%</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={modeFilter} onValueChange={setModeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="practice">Practice Only</SelectItem>
                  <SelectItem value="exam">Exam Only</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="score">Score (Highest)</SelectItem>
                  <SelectItem value="questions">Questions (Most)</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleClearData} variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results ({filteredResults.length})</CardTitle>
            <CardDescription>
              {filteredResults.length === 0
                ? "No tests found matching your criteria"
                : "Click on any test to view detailed results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No tests found</h3>
                <p className="text-gray-500 mb-4">
                  {testResults.length === 0
                    ? "You haven't taken any tests yet. Start practicing to see your results here!"
                    : "Try adjusting your search criteria or filters."}
                </p>
                <Button asChild>
                  <Link href="/practice">Start Practicing</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <Card key={result.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={result.config.mode === "practice" ? "default" : "destructive"}>
                              {result.config.mode}
                            </Badge>
                            <Badge variant="outline">{result.questions} questions</Badge>
                            <span className="text-sm text-gray-600">{formatDate(result.completedAt)}</span>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span>Score: {result.score}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Time: {formatDuration(result.timeSpent)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Correct: {result.correctAnswers}/{result.questions}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {result.config.topics.slice(0, 3).map((topic: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                              {result.config.topics.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{result.config.topics.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${
                              result.score >= 80
                                ? "text-green-600"
                                : result.score >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {result.score}%
                          </div>
                          <Button size="sm" variant="outline" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
