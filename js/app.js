const form = document.querySelector('form')
const finalScoreContainer = document.querySelector('.final-score-container')
const finalScore = finalScoreContainer.querySelector('.final-score-container strong')

const correctAnswers = ['B', 'B', 'A', 'A']

let score = 0

const getUserAnswers = () => {
  const userAnswers = correctAnswers.map((_, index) => 
    form[`inputQuestion${index + 1}`].value)
 
  return userAnswers
}

const calculateFinalScore = userAnswers => {
  userAnswers.forEach((userAnswer, index) => {
    const isACorrectAnswer = userAnswer === correctAnswers[index]

    if (isACorrectAnswer) {
      score += 25
    }
  })
} 

const changeScoreColor = () => finalScore.style.color = score >= 50 
  ? '#007BFF' 
  : '#E7711B'

const showFinalScore = () => {
  scrollTo({ 
    top: 0, 
    left: 0, 
    behavior: 'smooth' 
  })

  if (finalScoreContainer.classList.contains('hidden')) {
    finalScoreContainer.classList.remove('hidden')
  }
}

const animateFinalScore = () => {
  let counter = 0

  const timerId = setInterval(() => {
    if (counter === score) {
      clearInterval(timerId)
    }

    finalScore.textContent = `${counter++}%`
  }, 10)
}

const resetUserScore = () => score = 0

const resetForm = () => form.reset()

const handleUserAnswers = event => {
  event.preventDefault()

  const userAnswers = getUserAnswers()

  resetUserScore()
  calculateFinalScore(userAnswers)
  changeScoreColor()
  showFinalScore()
  animateFinalScore() 
  resetForm()
}

form.addEventListener('submit', handleUserAnswers)