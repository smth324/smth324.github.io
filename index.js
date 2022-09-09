let turnCircle = true
let circleWinCounter = 0
let crossWinCounter = 0
let drawCounter = 0
let gameOver = false
let circleturns = []
let crossturns = []
let turnHistory = []
let overallTurnHistory = []
const squares = document.querySelectorAll('.square')


const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

const handleClick = (event) => {
    if (turnCircle) {
        event.target.classList.add('circle')
        circleturns = circleturns.concat([Number(event.target.dataset.square)])
    } else {
        event.target.classList.add('cross')
        crossturns = crossturns.concat(Number(event.target.dataset.square))
    }
    turnHistory = turnHistory.concat(Number(event.target.dataset.square))
    overallTurnHistory = overallTurnHistory.concat(Number(event.target.dataset.square))
    turnCircle = !turnCircle

    document.querySelector('.turn').innerHTML = `${turnCircle ? 'O' : 'X'} is playing`
    event.target.classList.remove('hovercircle')
    event.target.classList.remove('hovercross')
    // checks whether cross or circle wins
    for (let i = 0; i < winConditions.length; i++) {
        if (winConditions[i].every(ct => circleturns.includes(ct))) {
            gameOver = true
            circleWinCounter++
            document.querySelector('.circle-win-counter').innerHTML = `Circle Wins: ${circleWinCounter}`
            document.querySelector('.title').innerHTML = `O Wins!`
            document.querySelector('.turn').innerHTML = 'Game Over!'
            squares.forEach((x) => {
                x.removeEventListener('click', handleClick)
            })
            document.querySelector('.back').style.display = 'inline-block'
            document.querySelector('.forward').style.display = 'inline-block'
            break
        }
        if (winConditions[i].every(ct => crossturns.includes(ct))) {
            gameOver = true
            crossWinCounter++
            document.querySelector('.cross-win-counter').innerHTML = `Cross Wins: ${crossWinCounter}`
            document.querySelector('.title').innerHTML = `X Wins!`
            document.querySelector('.turn').innerHTML = 'Game Over!'
            squares.forEach((x) => {
                x.removeEventListener('click', handleClick)
            })
            document.querySelector('.back').style.display = 'inline-block'
            document.querySelector('.forward').style.display = 'inline-block'
            break
        }
    }
    if (gameOver) return
    // checks if game is a draw
    if (crossturns.length + circleturns.length >= 9) {
        gameOver = true
        drawCounter++
        document.querySelector('.draw-counter').innerHTML = `Draw: ${drawCounter}`
        document.querySelector('.title').innerHTML = `Draw!`
        document.querySelector('.back').style.display = 'inline-block'
        document.querySelector('.forward').style.display = 'inline-block'
        document.querySelector('.turn').innerHTML = 'Game Over!'
    }
}

const setupGame = () => {
    squares.forEach((x) => {
        x.addEventListener('click', handleClick, { once: true })
        x.addEventListener('mouseenter', (event) => {
            if (gameOver) return
            if (event.target.classList.contains('circle') || event.target.classList.contains('cross')) return
            event.target.classList.add(turnCircle ? 'hovercircle' : 'hovercross')
        })
        x.addEventListener('mouseout', (event) => {
            event.target.classList.remove('hovercircle')
            event.target.classList.remove('hovercross')
        })
    })
}
setupGame()

// reset button
document.querySelector('.reset').addEventListener('click', (event) => {
    gameOver = false
    circleturns = []
    crossturns = []
    document.querySelector('.title').innerHTML = `Tic Tac Toe`
    document.querySelector('.back').style.display = 'none'
    document.querySelector('.forward').style.display = 'none'
    document.querySelector('.turn').innerHTML = `${turnCircle ? 'O' : 'X'} is playing`
    squares.forEach((x) => {
        x.classList.remove('circle')
        x.classList.remove('cross')
        x.removeEventListener('click', handleClick)
    })
    setupGame()
})

document.querySelector('.back').addEventListener('click', (event) => {
    if (!gameOver) return
    const squareNumber = turnHistory[turnHistory.length - 1]
    turnHistory = turnHistory.slice(0, -1)
    squares.forEach((x) => {
        if (Number(x.dataset.square) === squareNumber) {
            x.classList.remove('circle')
            x.classList.remove('cross')
            x.removeEventListener('click', handleClick)
        }
    })
})

document.querySelector('.forward').addEventListener('click', (event) => {
    if (!gameOver) return
    if (turnHistory.length === overallTurnHistory.length) return
    turnHistory = turnHistory.concat(overallTurnHistory[turnHistory.length])
    const squareNumber = turnHistory[turnHistory.length - 1]
    squares.forEach((x) => {
        if (Number(x.dataset.square) === squareNumber) {
            if (turnHistory.length % 2 === 0) {
                x.classList.add('cross')
                return
            }
            x.classList.add('circle')
        }
    })
})

