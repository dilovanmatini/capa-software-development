import { Badge, Button, Card } from 'flowbite-react'
import { ArrowRight, Eye, EyeOff, UserCheck } from 'lucide-react'

const actionButtonClassName = 'action-btn w-full shadow-none focus:ring-0 disabled:cursor-not-allowed'

function QuestionCard({
  question,
  answeredBy,
  showAnswer,
  onAssignStudent,
  onToggleAnswer,
  onNextQuestion,
}) {
  return (
    <Card className="w-full overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-indigo-100 bg-indigo-50/60 px-6 py-3 dark:border-indigo-900/40 dark:bg-indigo-950/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge color="indigo" size="sm">
            {question.topic}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question #{question.id}
          </span>
        </div>
      </div>

      <div className="space-y-8 p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-medium leading-relaxed text-gray-900 dark:text-white sm:text-2xl">
            {question.question}
          </h2>

          {question.questionAr && (
            <p
              dir="rtl"
              lang="ar"
              className="text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {question.questionAr}
            </p>
          )}
        </div>

        {answeredBy && (
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            <UserCheck className="h-4 w-4" aria-hidden="true" />
            Answered by <span className="font-semibold">{answeredBy}</span>
          </div>
        )}

        {showAnswer && (
          <div className="space-y-6 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Answer
              </p>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                {question.answer}
              </p>
            </div>

            {question.answerAr && (
              <div className="space-y-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  الإجابة
                </p>
                <p
                  dir="rtl"
                  lang="ar"
                  className="text-base leading-relaxed text-gray-700 dark:text-gray-200"
                >
                  {question.answerAr}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              color={showAnswer ? 'yellow' : 'cyan'}
              size="lg"
              className={actionButtonClassName}
              onClick={onToggleAnswer}
            >
              {showAnswer ? (
                <>
                  <EyeOff className="mr-2 h-5 w-5" aria-hidden="true" />
                  Hide answer
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-5 w-5" aria-hidden="true" />
                  Show answer
                </>
              )}
            </Button>

            <Button
              color="green"
              size="lg"
              className={actionButtonClassName}
              onClick={onAssignStudent}
              disabled={Boolean(answeredBy)}
            >
              <UserCheck className="mr-2 h-5 w-5" aria-hidden="true" />
              {answeredBy ? 'Student assigned' : 'Student answered'}
            </Button>
          </div>

          <Button color="purple" size="lg" className="w-full" onClick={onNextQuestion}>
            Next question
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default QuestionCard
