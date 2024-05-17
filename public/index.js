let turnCircle = false
let circleWinCounter = 0
let crossWinCounter = 0
let drawCounter = 0
let gameOver = false
let circleTurns = []
let crossTurns = []
let turnHistory = []
let overallTurnHistory = []
let pvp = true
let difficulty = "easy"
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
const easy = document.querySelector('.easy')
const medium = document.querySelector('.medium')
const hard = document.querySelector('.hard')
const fullreset = document.querySelector('.fullreset')
const leaderboardBtn = document.querySelector('.leaderboard-btn')
const modalblack = document.querySelector('.modalblack')
const scoresList = document.querySelector('.scores-list')
const leaderboardEasy = document.querySelector('.leaderboard-easy')
const leaderboardMedium = document.querySelector('.leaderboard-medium')
const leaderboardHard = document.querySelector('.leaderboard-hard')
const leaderboardInput = document.querySelector('.leaderboard-input')
const leaderboardSubmit = document.querySelector('.leaderboard-submit')



const handleClick = (event) => {
    if (turnCircle) {
        event.target.classList.add('circle')
        circleTurns = circleTurns.concat([Number(event.target.dataset.square)])
    } else {
        event.target.classList.add('cross')
        crossTurns = crossTurns.concat(Number(event.target.dataset.square))
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
        if (winConditions[i].every(ct => circleTurns.includes(ct))) {
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
        if (winConditions[i].every(ct => crossTurns.includes(ct))) {
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
    if (crossTurns.length + circleTurns.length >= 9) {
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

    if (difficulty !== 'easy') {
        // finds whether there are two circles are in a row and completes it
        for (let i = 0; i < winConditions.length; i++) {
            if ((circleTurns.includes(winConditions[i][0]) && circleTurns.includes(winConditions[i][1])) && !overallTurnHistory.includes(winConditions[i][2])) {
                squares[winConditions[i][2] - 1].dispatchEvent(new Event('click'))
                break
            }
            if ((circleTurns.includes(winConditions[i][0]) && circleTurns.includes(winConditions[i][2])) && !overallTurnHistory.includes(winConditions[i][1])) {
                squares[winConditions[i][1] - 1].dispatchEvent(new Event('click'))
                break
            }
            if ((circleTurns.includes(winConditions[i][1]) && circleTurns.includes(winConditions[i][2])) && !overallTurnHistory.includes(winConditions[i][0])) {
                squares[winConditions[i][0] - 1].dispatchEvent(new Event('click'))
                break
            }
        }
        // finds whether there are two crosses are in a row and blocks it
        for (let i = 0; i < winConditions.length; i++) {
            if ((crossTurns.includes(winConditions[i][0]) && crossTurns.includes(winConditions[i][1])) && !overallTurnHistory.includes(winConditions[i][2])) {
                squares[winConditions[i][2] - 1].dispatchEvent(new Event('click'))
                break
            }
            if ((crossTurns.includes(winConditions[i][0]) && crossTurns.includes(winConditions[i][2])) && !overallTurnHistory.includes(winConditions[i][1])) {
                squares[winConditions[i][1] - 1].dispatchEvent(new Event('click'))
                break
            }
            if ((crossTurns.includes(winConditions[i][1]) && crossTurns.includes(winConditions[i][2])) && !overallTurnHistory.includes(winConditions[i][0])) {
                squares[winConditions[i][0] - 1].dispatchEvent(new Event('click'))
                break
            }
        }
    }
    if (!turnCircle) return

    if (!(difficulty === 'easy' || difficulty === 'medium')) {
        if ((crossTurns[0] === 1 || crossTurns[0] === 3 || crossTurns[0] === 7 || crossTurns[0] === 9) && overallTurnHistory.length === 1) {
            squares[4].dispatchEvent(new Event('click'))
            return
        }
        if ((circleTurns.includes(5) && ((crossTurns.includes(1) && crossTurns.includes(9)) || (crossTurns.includes(3) && crossTurns.includes(7)))) && overallTurnHistory.length === 3) {
            const preferred = [2, 4, 6, 8]
            squares[preferred[Math.floor(Math.random() * preferred.length)] - 1].dispatchEvent(new Event('click'))
            return
        }

        if (crossTurns[0] === 5 && overallTurnHistory.length === 1) {
            const preffered = [1, 3, 7, 9]
            squares[preffered[Math.floor(Math.random() * preffered.length)] - 1].dispatchEvent(new Event('click'))
            return
        }

        if ((crossTurns.includes(5) &&
            ((circleTurns.includes(1) && crossTurns.includes(9))
                || (circleTurns.includes(3) && crossTurns.includes(7))
                || (circleTurns.includes(9) && crossTurns.includes(1))
                || (circleTurns.includes(7) && crossTurns.includes(3)))
        ) && overallTurnHistory.length === 3) {
            let preferred = [1, 3, 7, 9]
            overallTurnHistory.forEach((x) => {
                if (preferred.includes(x)) {
                    preferred = preferred.filter(y => y !== x)
                }
            })
            squares[preferred[Math.floor(Math.random() * preferred.length)] - 1].dispatchEvent(new Event('click'))
            return
        }
    }
    // selects a random available square
    let possible = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    overallTurnHistory.forEach((x) => {
        if (possible.includes(x)) {
            possible = possible.filter(y => y !== x)
        }
    })
    squares[possible[Math.floor(Math.random() * possible.length)] - 1].dispatchEvent(new Event('click'))
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
firebase.initializeApp({
  apiKey: "AIzaSyDjvVQRSPfS1vXLmzQRhwSxNO-BsUm7O2Y",
  authDomain: "tic-tac-toe-39907.firebaseapp.com",
  projectId: "tic-tac-toe-39907",
  storageBucket: "tic-tac-toe-39907.appspot.com",
  messagingSenderId: "979548585866",
  appId: "1:979548585866:web:0104c6a60f7828c39c1273",
  measurementId: "G-S6F6DM722Y"
})
const db = firebase.firestore()

let scoresRef
let unsubscribe

const scoresTable = document.querySelector('.scores-table')

scoresRef = db.collection('scores')
unsubscribe = scoresRef
    .where('difficulty', '==', 'easy')
    .orderBy('crosswins', 'desc')
    .onSnapshot(querySnapshot => {
        const scores = querySnapshot.docs.map((x, i) => {
            return `
            <tr>
            <td>${i + 1}</td>
            <td>${x.data().name}</td>
            <td>${x.data().difficulty}</td>
            <td>${x.data().circlewins}</td>
            <td>${x.data().crosswins}</td>
            <td>${x.data().draws}</td>            
            </tr>`
        })
        scoresTable.innerHTML = `<tr>${scoresTable.children[0].innerHTML}</tr>`.concat(scores.join(''))
    })
// reset button
reset.addEventListener('click', (event) => {
    gameOver = false
    winningCombo = []
    circleTurns = []
    crossTurns = []
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
    root.style.setProperty('--background-color', currentTheme === '#aacabe' ? '#104d5a' : '#aacabe')
    root.style.setProperty('--outline-color', currentTheme === '#aacabe' ? '#aacabe' : '#104d5a')
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
    if (overallTurnHistory.length + circleWinCounter + crossWinCounter + drawCounter !== 0) {
        alert("You must reset before switching PvP/PvE modes.")
        return
    }
    pvp = !pvp
    togglepvp.innerHTML = pvp ? 'PvP' : 'PvE'
    document.querySelector('.difficulty-options').style.display = pvp ? 'none' : 'flex'
})

easy.addEventListener('click', (event) => {
    if (overallTurnHistory.length + circleWinCounter + crossWinCounter + drawCounter !== 0) {
        alert("You must reset before changing difficulties.")
        return
    }
    difficulty = 'easy'
    easy.classList.add('difficulty-selected')
    medium.classList.remove('difficulty-selected')
    hard.classList.remove('difficulty-selected')
})

medium.addEventListener('click', (event) => {
    if (overallTurnHistory.length + circleWinCounter + crossWinCounter + drawCounter !== 0) {
        alert("You must reset before changing difficulties.")
        return
    }
    difficulty = 'medium'
    easy.classList.remove('difficulty-selected')
    medium.classList.add('difficulty-selected')
    hard.classList.remove('difficulty-selected')

})

hard.addEventListener('click', (event) => {
    if (overallTurnHistory.length + circleWinCounter + crossWinCounter + drawCounter !== 0) {
        alert("You must reset before changing difficulties.")
        return
    }
    difficulty = 'hard'
    easy.classList.remove('difficulty-selected')
    medium.classList.remove('difficulty-selected')
    hard.classList.add('difficulty-selected')
})

fullreset.addEventListener('click', (event) => {
    reset.dispatchEvent(new Event('click'))
    circleWinCounter = 0
    crossWinCounter = 0
    drawCounter = 0
    easy.dispatchEvent(new Event('click'))
    pvp || togglepvp.dispatchEvent(new Event('click'))
    document.querySelector('.circle-win-counter').innerHTML = `O Wins: 0`
    document.querySelector('.cross-win-counter').innerHTML = `X Wins: 0`
    document.querySelector('.draw-counter').innerHTML = `Draws: 0`
})

leaderboardBtn.addEventListener('click', (event) => {
    modalblack.classList.add('black')
    scoresList.style.display = 'block'
})

document.querySelector('.modalblack').addEventListener('click', (event) => {
    modalblack.classList.remove('black')
    scoresList.style.display = 'none'
})

leaderboardEasy.addEventListener('click', (event) => {
    scoresRef
        .where('difficulty', '==', 'easy')
        .orderBy('crosswins', 'desc')
        .onSnapshot(querySnapshot => {
            const scores = querySnapshot.docs.map((x, i) => {
                return `
                <tr>
                <td>${i + 1}</td>
                <td>${x.data().name}</td>
                <td>${x.data().difficulty}</td>
                <td>${x.data().circlewins}</td>
                <td>${x.data().crosswins}</td>
                <td>${x.data().draws}</td>            
                </tr>`
            })
            scoresTable.innerHTML = `<tr>${scoresTable.children[0].innerHTML}</tr>`.concat(scores.join(''))
        })
    leaderboardEasy.classList.add('leaderboard-selected')
    leaderboardMedium.classList.remove('leaderboard-selected')
    leaderboardHard.classList.remove('leaderboard-selected')
})

leaderboardMedium.addEventListener('click', (event) => {
    scoresRef
        .where('difficulty', '==', 'medium')
        .orderBy('crosswins', 'desc')
        .onSnapshot(querySnapshot => {
            const scores = querySnapshot.docs.map((x, i) => {
                return `
                <tr>
                <td>${i + 1}</td>
                <td>${x.data().name}</td>
                <td>${x.data().difficulty}</td>
                <td>${x.data().circlewins}</td>
                <td>${x.data().crosswins}</td>
                <td>${x.data().draws}</td>            
                </tr>`
            })
            scoresTable.innerHTML = `<tr>${scoresTable.children[0].innerHTML}</tr>`.concat(scores.join(''))
        })
    leaderboardEasy.classList.remove('leaderboard-selected')
    leaderboardMedium.classList.add('leaderboard-selected')
    leaderboardHard.classList.remove('leaderboard-selected')

})

leaderboardHard.addEventListener('click', (event) => {
    scoresRef
        .where('difficulty', '==', 'hard')
        .orderBy('crosswins', 'desc')
        .onSnapshot(querySnapshot => {
            const scores = querySnapshot.docs.map((x, i) => {
                return `
                <tr>
                <td>${i + 1}</td>
                <td>${x.data().name}</td>
                <td>${x.data().difficulty}</td>
                <td>${x.data().circlewins}</td>
                <td>${x.data().crosswins}</td>
                <td>${x.data().draws}</td>            
                </tr>`
            })
            scoresTable.innerHTML = `<tr>${scoresTable.children[0].innerHTML}</tr>`.concat(scores.join(''))
        })
    leaderboardEasy.classList.remove('leaderboard-selected')
    leaderboardMedium.classList.remove('leaderboard-selected')
    leaderboardHard.classList.add('leaderboard-selected')
})

leaderboardSubmit.addEventListener('click', (event) => {
    if (leaderboardInput.value.replace(/ /g, '') === "") {
        alert("Must input a name")
        return
    }
    if (pvp) {
        alert("Must be in PvE mode to submit")
        return
    }
    if (drawCounter + circleWinCounter + crossWinCounter === 0) {
        alert("Must have at least played one game")
        return
    }
    const name = leaderboardInput.value.trim()
    scoresRef.add({
        name: name,
        difficulty: difficulty,
        circlewins: circleWinCounter,
        crosswins: crossWinCounter,
        draws: drawCounter,
    })
    fullreset.dispatchEvent(new Event('click'))
})