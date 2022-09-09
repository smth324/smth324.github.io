const squares = document.querySelectorAll('.square')
let turnCircle = true

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

let circleturns = []
let crossturns = []

squares.forEach((x) => {
    x.addEventListener('click', ((event) => {
        if (turnCircle) {
            event.target.classList.add('circle')
            circleturns = circleturns.concat([Number(event.target.dataset.square)])
        } else {
            event.target.classList.add('cross')
            crossturns = crossturns.concat(Number(event.target.dataset.square))
        }
    
        for (let i = 0; i < winConditions.length; i++) {
            if (winConditions[i].every(ct => circleturns.includes(ct))) {
                window.alert("circle wins")
                break
            }
            if (winConditions[i].every(ct => crossturns.includes(ct))) {
                window.alert("cross wins")
                break
            }
        }

    
        turnCircle = !turnCircle
    }), { once: true })
})