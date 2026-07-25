import { useState } from 'react'
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from 'flowbite-react'
import { UserPlus } from 'lucide-react'

function StudentPicker({ show, students, onClose, onSelectStudent }) {
  const [newName, setNewName] = useState('')

  function handleAddStudent(event) {
    event.preventDefault()
    const trimmed = newName.trim()

    if (!trimmed) {
      return
    }

    onSelectStudent(trimmed)
    setNewName('')
  }

  function handleSelectStudent(name) {
    onSelectStudent(name)
    setNewName('')
  }

  function handleClose() {
    setNewName('')
    onClose()
  }

  return (
    <Modal show={show} onClose={handleClose} size="md">
      <ModalHeader>Who answered?</ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          {students.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select a student
              </p>
              <div className="flex flex-wrap gap-2">
                {students.map((student) => (
                  <Button
                    key={student}
                    color="indigo"
                    size="sm"
                    onClick={() => handleSelectStudent(student)}
                  >
                    {student}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200">
              No students added yet. Add the first name below.
            </p>
          )}

          <form className="space-y-3 border-t border-gray-100 pt-5 dark:border-gray-700" onSubmit={handleAddStudent}>
            <Label htmlFor="new-student-name" value="Add new student" />
            <TextInput
              id="new-student-name"
              placeholder="Student name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
            <Button
              type="submit"
              color="green"
              className="action-btn w-full focus:ring-0"
            >
              <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
              Add and assign
            </Button>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default StudentPicker
