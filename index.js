let turnCircle = false
let circleWinCounter = 0
let crossWinCounter = 0
let drawCounter = 0
let gameOver = false
let circleturns = []
let crossturns = []
let turnHistory = []
let overallTurnHistory = []
let pvp = true
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

const squares = document.querySelectorAll('.square')
const turn = document.querySelector('.turn')
const title = document.querySelector('.title')
const back = document.querySelector('.back')
const forward = document.querySelector('.forward')
const reset = document.querySelector('.reset')
const themeOption = document.querySelector('.theme-options')
const musicOption = document.querySelector('.music')
const root = document.querySelector(':root')
const music = new Audio('Spring-Flowers.mp3')
const togglepvp = document.querySelector('.togglepvp')

const handleClick = (event) => {
    if (turnCircle) {
        event.target.classList.add('circle')
        circleturns = circleturns.concat([Number(event.target.dataset.square)])
    } else {
        event.target.classList.add('cross')
        crossturns = crossturns.concat(Number(event.target.dataset.square))
    }
    //updates turn history
    turnHistory = turnHistory.concat(Number(event.target.dataset.square))
    overallTurnHistory = overallTurnHistory.concat(Number(event.target.dataset.square))
    turnCircle = !turnCircle

    turn.innerHTML = `${turnCircle ? 'O' : 'X'} is playing`
    event.target.classList.remove('hovercircle')
    event.target.classList.remove('hovercross')

    // checks whether cross or circle wins
    for (let i = 0; i < winConditions.length; i++) {
        if (winConditions[i].every(ct => circleturns.includes(ct))) {
            gameOver = true
            circleWinCounter++
            document.querySelector('.circle-win-counter').innerHTML = `O Wins: ${circleWinCounter}`
            title.innerHTML = `O Wins!`
            turn.innerHTML = 'Game Over!'
            squares.forEach((x) => {
                x.removeEventListener('click', handleClick)
                if (winConditions[i].includes(Number(x.dataset.square))) {
                    x.classList.add('winning-square-circle')
                }
            })
            back.style.display = 'inline-block'
            forward.style.display = 'inline-block'
            break
        }
        if (winConditions[i].every(ct => crossturns.includes(ct))) {
            gameOver = true
            crossWinCounter++
            document.querySelector('.cross-win-counter').innerHTML = `X Wins: ${crossWinCounter}`
            title.innerHTML = `X Wins!`
            turn.innerHTML = 'Game Over!'
            squares.forEach((x) => {
                x.removeEventListener('click', handleClick)
                if (winConditions[i].includes(Number(x.dataset.square))) {
                    x.classList.add('winning-square-cross')
                }
            })
            back.style.display = 'inline-block'
            forward.style.display = 'inline-block'
            break
        }
    }
    if (gameOver) return
    // checks if game is a draw
    if (crossturns.length + circleturns.length >= 9) {
        gameOver = true
        drawCounter++
        document.querySelector('.draw-counter').innerHTML = `Draws: ${drawCounter}`
        title.innerHTML = `Draw!`
        turn.innerHTML = 'Game Over!'
        back.style.display = 'inline-block'
        forward.style.display = 'inline-block'
    }
    if (!turnCircle) return
    if (gameOver) return
    if (pvp) return
    let possible = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    overallTurnHistory.forEach((x, i) => {
        if (possible.includes(x)) {
            possible = possible.filter(y => y !== x)
        }
    })
    squares[possible[Math.floor(Math.random()*possible.length)]-1].dispatchEvent(new Event('click'))
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
reset.addEventListener('click', (event) => {
    gameOver = false
    winningCombo = []
    circleturns = []
    crossturns = []
    overallTurnHistory = []
    turnHistory = []
    turnCircle = false
    title.innerHTML = `Tic Tac Toe`
    back.style.display = 'none'
    forward.style.display = 'none'
    turn.innerHTML = `${turnCircle ? 'O' : 'X'} is playing`
    squares.forEach((x) => {
        x.classList.remove('circle')
        x.classList.remove('cross')
        x.classList.remove('winning-square-circle')
        x.classList.remove('winning-square-cross')
        x.removeEventListener('click', handleClick)
    })
    setupGame()
})

back.addEventListener('click', (event) => {
    if (turnHistory.length === 0) return
    const latestSquareNumber = turnHistory[turnHistory.length - 1]
    turnHistory = turnHistory.slice(0, -1)
    squares.forEach((x) => {
        if (Number(x.dataset.square) === latestSquareNumber) {
            x.classList.remove('circle')
            x.classList.remove('cross')
            x.removeEventListener('click', handleClick)
        }
    })
})

forward.addEventListener('click', (event) => {
    if (turnHistory.length === overallTurnHistory.length) return
    turnHistory = turnHistory.concat(overallTurnHistory[turnHistory.length])
    const latestSquareNumber = turnHistory[turnHistory.length - 1]
    squares.forEach((x) => {
        if (Number(x.dataset.square) === latestSquareNumber) {
            if (turnHistory.length % 2 !== 0) {
                x.classList.add('cross')
                return
            }
            x.classList.add('circle')
        }
    })
})

themeOption.addEventListener('click', (event) => {
    themeOption.innerHTML = themeOption.innerHTML.trim() === 'Light Theme' ? 'Dark Theme' : 'Light Theme'
    const currentTheme = getComputedStyle(root).getPropertyValue('--background-color')
    root.style.setProperty('--background-color', currentTheme === ' #aacabe' ? ' #104d5a' : ' #aacabe')
    root.style.setProperty('--outline-color', currentTheme === ' #aacabe' ? ' #aacabe' : ' #104d5a')
})

musicOption.addEventListener('click', (event) => {
    if (music.paused) {
        music.play()
        musicOption.innerHTML = '♫'
        return
    }
    music.pause()
    musicOption.innerHTML = 'x'
})

togglepvp.addEventListener('click', (event) => {
    if (overallTurnHistory.length !== 0) {
        alert("You can only choose PvE at the beginning of a match.")
        return
    }
   pvp = !pvp
   togglepvp.innerHTML = pvp ? 'PvP' : 'PvE'
})
