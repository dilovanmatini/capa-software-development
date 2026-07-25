import { useMemo, useState } from 'react'
import { Badge } from 'flowbite-react'

import Leaderboard from './components/Leaderboard'
import QuestionCard from './components/QuestionCard'
import StudentPicker from './components/StudentPicker'
import questions from './data/questions.json'
import { getRandomQuestion } from './utils/getRandomQuestion'
import {
  addStudent,
  getLeaderboard,
  getStudents,
  recordAnswer,
  resetLeaderboard,
} from './utils/leaderboardStorage'

function App() {
  const [students, setStudents] = useState(() => getStudents())
  const [leaderboard, setLeaderboard] = useState(() => getLeaderboard())
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    getRandomQuestion(questions),
  )
  const [answeredBy, setAnsweredBy] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showStudentPicker, setShowStudentPicker] = useState(false)
  const [seenCount, setSeenCount] = useState(1)

  const progressLabel = useMemo(() => {
    return `${seenCount} / ${questions.length}`
  }, [seenCount])

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
          Interview Common Questions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {progressLabel} questions shown · {students.length} students saved
          </p>
        </header>

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
