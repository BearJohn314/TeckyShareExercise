let crossTurn = true;
let finishedGame = false;
let initial = []
for (let i = 0; i<9; i++) {
    initial[i] = 0;
}
let cross = [...initial];
let circle = [...initial];
let playerCross = document.querySelector('#cross');
let playerCircle = document.querySelector('#circle');

let boxes = document.querySelectorAll('.box');
for (let box of boxes) {
    box.addEventListener('click', function(event){
        let className = event.target.getAttribute('class')
        if (String(className).length === 3 && !finishedGame) {
            playGame(event, crossTurn)
            checkGameEnd(crossTurn)
            crossTurn = swapPlayer(crossTurn)
        }
        document.querySelector
    })
}

function playGame(event, crossTurn) {
    let num = parseInt(event.target.getAttribute('id').replace('box',""))
    if (crossTurn) {
        event.target.setAttribute('class', `${event.target.getAttribute('class')} player-x`)
        event.target.innerHTML = '<i class="bi bi-x"></i>';      
        cross[num] = 1;
        
    } else {
        event.target.setAttribute('class', `${event.target.getAttribute('class')} player-o`)
        event.target.innerHTML = '<i class="bi bi-record"></i>';
        circle[num] = 1;
    }
    
}

function checkGameEnd(crossTurn) {
    if (checkWinning(crossTurn)) {
        let score = document.querySelector('.current > .player-score')
        if (isNaN(parseInt(score.innerHTML))) {
            score.innerHTML = 1
        } else {
            score.innerHTML = parseInt(score.innerHTML) + 1
        }
        finishedGame = true;
        if (crossTurn) {
            alert('Player X win!');
        } else {
            alert('Player O win!');
        }
    }
}

function checkWinning(crossTurn) {
    let playerBox = [];
    if (crossTurn) {
        playerBox = cross;
    } else {
        playerBox = circle;
    }
    if (playerBox[0]*playerBox[1]*playerBox[2] == 1) return true
    if (playerBox[3]*playerBox[4]*playerBox[5] == 1) return true
    if (playerBox[6]*playerBox[7]*playerBox[8] == 1) return true
    if (playerBox[0]*playerBox[3]*playerBox[6] == 1) return true
    if (playerBox[1]*playerBox[4]*playerBox[7] == 1) return true
    if (playerBox[2]*playerBox[5]*playerBox[8] == 1) return true
    if (playerBox[0]*playerBox[4]*playerBox[8] == 1) return true
    if (playerBox[2]*playerBox[4]*playerBox[6] == 1) return true
    return false
}

function swapPlayer(crossTurn) {
    let current = document.querySelector('.current-player')
    if (crossTurn) {
        current.innerHTML = '<i class="bi bi-record"></i> \n <span class="turn">Turn</span>'
    } else {
        current.innerHTML = '<i class="bi bi-x"></i> \n <span class="turn">Turn</span>'
    }
    let temp = String(playerCircle.getAttribute('class'));
    playerCircle.setAttribute('class',`${playerCross.getAttribute('class')}`)
    playerCross.setAttribute('class',`${temp}`)
    return !crossTurn
}

document.querySelector('#restart-game-btn').addEventListener('click',function(event){
    for (let box of boxes) {
        box.innerHTML ="";
        box.setAttribute('class', 'box');
    }
    if (!crossTurn) {
        crossTurn = swapPlayer(crossTurn);
    }
    finishedGame = false;
    cross = [...initial];
    circle = [...initial];
})