const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const percentageScore = document.querySelector('#percentage_score')

const mostRecentScore = localStorage.getItem('mostRecentScore')
const percentage_score = localStorage.getItem('percentage_score')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = `Your score is ${mostRecentScore}`
percentageScore.innerText=`Your answered ${percentage_score}% right`

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
        percentage:percentage_score
    }

    highScores.push(score)

    highScores.sort((a,b) =>b.score - a.score
    )

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}