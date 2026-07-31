import { useCallback, useMemo, useState } from 'react'
import { Badge, Button } from 'flowbite-react'

import Leaderboard from './components/Leaderboard'
import QuestionCard from './components/QuestionCard'
import StudentPicker from './components/StudentPicker'
import presentationQuestions from './data/presentationQuestions.json'
import softSkillsQuestions from './data/softSkillsQuestions.json'
import technicalQuestions from './data/technicalQuestions.json'
import { getRandomQuestion } from './utils/getRandomQuestion'
import {
  addStudent,
  getLeaderboard,
  getStudents,
  recordAnswer,
  resetLeaderboard,
} from './utils/leaderboardStorage'

const QUESTION_SETS = {
  softSkills: {
    label: 'Soft Skills',
    labelAr: 'المهارات الشخصية',
    questions: softSkillsQuestions,
  },
  technical: {
    label: 'Technical',
    labelAr: 'تقنية',
    questions: technicalQuestions,
  },
  presentation: {
    label: 'Presentation',
    labelAr: 'عرض المشروع',
    questions: presentationQuestions,
  },
}

function App() {
  const [category, setCategory] = useState('softSkills')
  const [students, setStudents] = useState(() => getStudents())
  const [leaderboard, setLeaderboard] = useState(() => getLeaderboard())
  const [seenCount, setSeenCount] = useState(1)
  const [answeredBy, setAnsweredBy] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showStudentPicker, setShowStudentPicker] = useState(false)

  const activeSet = QUESTION_SETS[category]
  const questions = activeSet.questions

  const [currentQuestion, setCurrentQuestion] = useState(() =>
    getRandomQuestion(softSkillsQuestions),
  )

  const progressLabel = useMemo(() => {
    return `${seenCount} / ${questions.length}`
  }, [seenCount, questions.length])

  const handleCategoryChange = useCallback((nextCategory) => {
    const nextQuestions = QUESTION_SETS[nextCategory].questions
    setCategory(nextCategory)
    setCurrentQuestion(getRandomQuestion(nextQuestions))
    setAnsweredBy(null)
    setShowAnswer(false)
    setSeenCount(1)
  }, [])

  function handleAssignStudent(name) {
    const trimmed = name.trim()

    if (!trimmed) {
      return
    }

    setStudents(addStudent(trimmed))
    setLeaderboard(recordAnswer(trimmed))
    setAnsweredBy(trimmed)
    setShowStudentPicker(false)
  }

  function handleToggleAnswer() {
    setShowAnswer((visible) => !visible)
  }

  function handleNextQuestion() {
    setCurrentQuestion((current) =>
      getRandomQuestion(questions, current?.id ?? null),
    )
    setAnsweredBy(null)
    setShowAnswer(false)
    setSeenCount((count) => Math.min(count + 1, questions.length))
  }

  function handleResetLeaderboard() {
    setLeaderboard(resetLeaderboard())
    setStudents([])
    setAnsweredBy(null)
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-indigo-50/40 dark:from-gray-950 dark:to-indigo-950/20">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 flex flex-col items-center gap-3 text-center">
          <Badge color="indigo" size="sm">
            CAPA Software Development Course
          </Badge>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Interview & Presentation Questions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeSet.label} · {progressLabel} questions shown · {students.length}{' '}
            students saved
          </p>
        </header>

        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(QUESTION_SETS).map(([key, set]) => (
              <Button
                key={key}
                color={category === key ? 'indigo' : 'light'}
                onClick={() => handleCategoryChange(key)}
              >
                {set.label} ({set.questions.length})
              </Button>
            ))}
          </div>
          <p
            dir="rtl"
            lang="ar"
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {activeSet.labelAr} · {questions.length} سؤال
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <main>
            <QuestionCard
              question={currentQuestion}
              answeredBy={answeredBy}
              showAnswer={showAnswer}
              onAssignStudent={() => setShowStudentPicker(true)}
              onToggleAnswer={handleToggleAnswer}
              onNextQuestion={handleNextQuestion}
            />
          </main>

          <aside>
            <Leaderboard
              entries={leaderboard}
              studentCount={students.length}
              onReset={handleResetLeaderboard}
            />
          </aside>
        </div>
      </div>

      <StudentPicker
        show={showStudentPicker}
        students={students}
        onClose={() => setShowStudentPicker(false)}
        onSelectStudent={handleAssignStudent}
      />
    </div>
  )
}

export default App
