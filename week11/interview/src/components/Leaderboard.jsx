import { useState } from 'react'
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react'
import { RotateCcw, Trophy } from 'lucide-react'

const rankStyles = [
  'bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200',
  'bg-slate-100 text-slate-800 dark:bg-slate-800/60 dark:text-slate-200',
  'bg-orange-50 text-orange-900 dark:bg-orange-900/20 dark:text-orange-200',
]

function Leaderboard({ entries, studentCount, onReset }) {
  const [showResetModal, setShowResetModal] = useState(false)
  const canReset = entries.length > 0 || studentCount > 0

  function handleConfirmReset() {
    onReset()
    setShowResetModal(false)
  }

  return (
    <>
      <Card className="h-full border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Leaderboard
              </h2>
            </div>
            <Button
              size="xs"
              color="failure"
              onClick={() => setShowResetModal(true)}
              disabled={!canReset}
            >
              <RotateCcw className="mr-1 h-3 w-3" aria-hidden="true" />
              Reset
            </Button>
          </div>

          {entries.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              No scores yet. Assign a student when they answer correctly.
            </p>
          ) : (
            <ol className="space-y-2">
              {entries.map((entry, index) => (
                <li
                  key={entry.name}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${
                    rankStyles[index] ??
                    'bg-gray-50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-200'
                  }`}
                >
                  <span>
                    <span className="mr-3 font-medium opacity-70">
                      {index + 1}.
                    </span>
                    {entry.name}
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-semibold dark:bg-black/20">
                    {entry.score}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Card>

      <Modal show={showResetModal} onClose={() => setShowResetModal(false)}>
        <ModalHeader>Reset leaderboard?</ModalHeader>
        <ModalBody>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This will remove all scores and the saved student list.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="failure" onClick={handleConfirmReset}>
            Reset leaderboard
          </Button>
          <Button color="gray" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Leaderboard
