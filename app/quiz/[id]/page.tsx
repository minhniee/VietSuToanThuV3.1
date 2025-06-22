import { EnhancedQuizSystem } from "@/components/quiz/enhanced-quiz-system"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  return <EnhancedQuizSystem quizId={params.id} />
}
