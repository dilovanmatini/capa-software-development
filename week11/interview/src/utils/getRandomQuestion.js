export function getRandomQuestion(questions, currentId = null) {
  if (questions.length === 0) {
    return null
  }

  if (questions.length === 1) {
    return questions[0]
  }

  let next = questions[Math.floor(Math.random() * questions.length)]

  while (currentId !== null && next.id === currentId) {
    next = questions[Math.floor(Math.random() * questions.length)]
  }

  return next
}
