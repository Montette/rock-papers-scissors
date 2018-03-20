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
    resultsElem = document.getElementById('js-resultsTableElement'),
    resultPhoto = document.getElementById('resultPhoto'),
    resultItems = document.getElementById('result');

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
    removeChild(playerPickElem);
    playerPickElem.appendChild(imgHand);
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    var imgHand = document.createElement("img");
    imgHand.setAttribute("src", "img/hands/paperLeft.png");
    removeChild(playerPickElem);
    playerPickElem.appendChild(imgHand);
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    var imgHand = document.createElement("img");
    imgHand.setAttribute("src", "img/hands/scissorsLeft.png");
    removeChild(playerPickElem);
    playerPickElem.appendChild(imgHand);
    playerPick('scissors')
});


function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            resultItems.style.display = 'block';
            console.log(gameState + " started?")
            break;
        case 'ended':
            resetGame();
            newGameBtn.innerText = 'Jeszcze raz';
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultItems.style.display = 'none';
            resultsElem.style.display = 'block';
            console.log(gameState + " end?")
            break;
        case 'notStarted':
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';

            console.log(gameState + " notstarted/?")
            break;
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            console.log(gameState + " default/?")
    }
}

setGameElements();


function reset() {
    $("#toggleCSS").attr("href", "css/alertify.core.css");
    alertify.set({
        labels: {
            ok: "OK",
            cancel: "Cancel"
        },
        delay: 5000,
        buttonReverse: false,
        buttonFocus: "ok"
    });
}



function newGame() {
    removeChild(resultPhoto);
    reset();

    alertify.prompt("Enter your name", function (e, str) {
        if (e) {
            player.name = str;
            player.score = 0;
            computer.score = 0;
            gameState = 'started';
            setGameElements();
            playerNameElem.innerHTML = player.name;
            setGamePoints();
        } else {
            return false;
        }
    }, );

}
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    var computerPick = possiblePicks[Math.floor(Math.random() * 3)];

    var imgHand = document.createElement("img");

    switch (computerPick) {
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

    removeChild(computerPickElem);
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
    if (player.score == 10) {

        var winnerPhoto = "img/happy.jpg";
        var winnerText = "Player won!";
        gameState = 'ended';
        setPhoto(winnerPhoto, winnerText);
        setGameElements();
    } else if (computer.score == 10) {

        var winnerPhoto = "img/cute.jpg";
        var winnerText = "Computer won!";
        gameState = 'ended';
        setPhoto(winnerPhoto, winnerText);
        setGameElements();
    }
}

function resetGame() {
    playerPickElem.innerHTML = "Player Selection";
    computerPickElem.innerHTML = "Computer Selection";
    playerResultElem.innerHTML = "";
    computerResultElem.innerHTML = "";
}



function setPhoto(winnerPhoto, winnerText) {
    var imgResult = document.createElement("img");
    imgResult.setAttribute("src", winnerPhoto)
    resultPhoto.appendChild(imgResult);
    var textResult = document.createElement("p");
    textResult.innerHTML = winnerText;
    resultPhoto.appendChild(textResult);
}


function removeChild(childEl) {
    while (childEl.firstChild) {
        childEl.removeChild(childEl.firstChild);
    }
};
