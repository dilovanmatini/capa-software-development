const STUDENTS_KEY = 'capa-flashcards-students'
const LEADERBOARD_KEY = 'capa-flashcards-leaderboard'

function sortNames(names) {
  return [...names].sort((a, b) => a.localeCompare(b))
}

function sortLeaderboard(board) {
  return [...board].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export function getStudents() {
  const raw = localStorage.getItem(STUDENTS_KEY)

  if (!raw) {
    return []
  }

  try {
    const students = JSON.parse(raw)
    return Array.isArray(students) ? sortNames(students) : []
  } catch {
    return []
  }
}

export function addStudent(name) {
  const trimmed = name.trim()

  if (!trimmed) {
    return getStudents()
  }

  const students = getStudents()
  const exists = students.some(
    (student) => student.toLowerCase() === trimmed.toLowerCase(),
  )

  if (exists) {
    return students
  }

  const updated = sortNames([...students, trimmed])
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(updated))
  return updated
}

export function getLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY)

  if (!raw) {
    return []
  }

  try {
    const board = JSON.parse(raw)
    return Array.isArray(board) ? sortLeaderboard(board) : []
  } catch {
    return []
  }
}

export function recordAnswer(name) {
  const trimmed = name.trim()

  if (!trimmed) {
    return getLeaderboard()
  }

  addStudent(trimmed)

  const board = getLeaderboard()
  const existing = board.find(
    (entry) => entry.name.toLowerCase() === trimmed.toLowerCase(),
  )

  if (existing) {
    existing.score += 1
  } else {
    board.push({ name: trimmed, score: 1 })
  }

  const sorted = sortLeaderboard(board)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted))
  return sorted
}

export function resetLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY)
  localStorage.removeItem(STUDENTS_KEY)
  return []
}
