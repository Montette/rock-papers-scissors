var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

pickRock.addEventListener('click', function () {
    var imgHand = document.createElement("img");
    imgHand.setAttribute("src", "img/hands/rockLeft.png");
    while (playerPickElem.firstChild) {
    playerPickElem.removeChild(playerPickElem.firstChild);
}
//    playerPickElem.removeChild(imgHand);
    playerPickElem.appendChild(imgHand);
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    var imgHand = document.createElement("img");
    imgHand.setAttribute("src", "img/hands/paperLeft.png");
     while (playerPickElem.firstChild) {
    playerPickElem.removeChild(playerPickElem.firstChild);
     }
//     playerPickElem.removeChild(imgHand);
    playerPickElem.appendChild(imgHand);
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    var imgHand = document.createElement("img");
    imgHand.setAttribute("src", "img/hands/scissorsLeft.png");
     while (playerPickElem.firstChild) {
    playerPickElem.removeChild(playerPickElem.firstChild);
     }
//    playerPickElem.removeChild(imgHand);
    playerPickElem.appendChild(imgHand);
    playerPick('scissors')
});


function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            resetGame();
            newGameBtn.innerText = 'Jeszcze raz';           
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();



function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = 0;
        computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
//    var img = document.createElement("img");
//    img.setAttribute("src", "rockLeft.png");
    
//    playerPickElem.appendChild(leftRock);

//    playerPickElem.innerHTML = playerPick;
//    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    var computerPick =  possiblePicks[Math.floor(Math.random() * 3)];
    
    var imgHand = document.createElement("img");
    
    switch (computerPick){
        case 'paper': 
    imgHand.setAttribute("src", "img/hands/paperRight.png");
    break;
        case 'rock':
    imgHand.setAttribute("src", "img/hands/rockRight.png");
    break;
        case 'scissors':
    imgHand.setAttribute("src", "img/hands/scissorsRight.png");
    break;
    }
        
     while (computerPickElem.firstChild) {
    computerPickElem.removeChild(computerPickElem.firstChild);
     }
//     playerPickElem.removeChild(imgHand);
    computerPickElem.appendChild(imgHand);
    
    return computerPick;
    
    
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }

}


function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
     if(player.score == 10){
        alert("The winner is " + player.name + "!");
        gameState = 'ended';
        setGameElements();
    }else if (computer.score == 10){
        alert("The winner is Computer!");
        gameState = 'ended';
        setGameElements();
    }
}

function resetGame() {
    playerPickElem.innerHTML = "Player Selection";
	computerPickElem.innerHTML = "Computer Selection";
	playerResultElem.innerHTML = "";
    computerResultElem.innerHTML = "";   
}