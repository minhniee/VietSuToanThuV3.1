import { EnhancedQuizSystem } from "@/components/quiz/enhanced-quiz-system"

interface EventQuizPageProps {
  params: {
    id: string
  }
}

export default function EventQuizPage({ params }: EventQuizPageProps) {
  return <EnhancedQuizSystem eventId={params.id} />
}
