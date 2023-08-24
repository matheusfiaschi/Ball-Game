let counter = 0;
let interval;
let timer;
let pause;

const timerElement = document.querySelector(".timer");
const restartButton = document.querySelectorAll("#restartButton");
const count = document.querySelectorAll(".count");
const openMenuButton = document.getElementById("openMenuButton");
const popupBackground = document.getElementById("popupBackground");
const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const selectedDifficulty = document.getElementById("select-difficulty")
const ballContainer = document.querySelector(".ball-container");

// Função para atualizar o timer
function updateTimer() {
    if (!pause) {
        timer--;
        timerElement.textContent = "Timer: " + timer;

        if (timer === 0) {
            clearInterval(interval);
            finishGame("lose");
        }
    }
}

// Função para atualizar o contador
function updateCounter(numbersBalls) {
    counter++;
    count[0].textContent = "Points: " + counter + "/" + numbersBalls;

    if (counter === numbersBalls) {
        clearInterval(interval);
        finishGame("win");
    }
}

// Função para criar e difinir as bolinhas em tela
function createBalls(numbersBalls) {
    for (var i = 0; i < numbersBalls; i++) {
        var newBall = document.createElement("div");
        newBall.className = "ball";

        // Define posições aleatórias dentro do contêiner
        var randomX = Math.random() * (ballContainer.offsetWidth - 60);
        var randomY = Math.random() * (ballContainer.offsetHeight - 60);

        newBall.style.left = randomX + "px";
        newBall.style.top = randomY + "px";

        ballContainer.appendChild(newBall);
    }
}

// Função para tratar o comportamento das bolinhas
function ballsConfig(speed, numbersBalls) {
    balls = document.querySelectorAll(".ball");
    balls.forEach(function (ball) {
        var xSpeed = Math.random() * speed;
        var ySpeed = Math.random() * speed;

        ball.addEventListener("click", function () {
            ball.style.pointerEvents = "none";
            updateCounter(numbersBalls);
            ball.style.animation = "explode 0.5s forwards";
            setTimeout(function () {
                ball.style.display = "none";
                ball.remove();
            }, 500);
        });

        //setInterval para verificar a posição das bolinhas na tela
        setInterval(function () {
            if (!pause) {
                var rect = ball.getBoundingClientRect();
    
                if (rect.left <= 0 || rect.right >= ballContainer.offsetWidth) {
                    xSpeed *= -1;
                }
    
                if (rect.top <= 0 || rect.bottom >= ballContainer.offsetHeight) {
                    ySpeed *= -1;
                }
    
                ball.style.left = (parseFloat(ball.style.left) + xSpeed) + "px";
                ball.style.top = (parseFloat(ball.style.top) + ySpeed) + "px";
            }
        }, 16);
    });
}

// Controla a parte do tutorial
const tutorialButton = document.getElementById("tutorialButton");
const popupTutorial = document.getElementById("popupTutorial");
const okButton = document.getElementById("okButton");

tutorialButton.addEventListener("click", function () {
    popupTutorial.style.display = "flex";
});

okButton.addEventListener("click", function () {
    popupTutorial.style.display = "none";
});

//Função para encerrar o jogo
function finishGame(status) {
    const popupFinish = document.getElementById("popupFinish");
    const textFinish = document.getElementById("textFinish");
    const trofeu = document.querySelector(".trofeu");
    pause = true;
    count[1].textContent = count[0].textContent;
    popupFinish.style.display = "flex";
    restartButton[1].style.display = "flex";

    if (status === "win") {
        const audio = new Audio('audio/win.mp3');
        audio.play();
    } else {
        textFinish.textContent = "VOCÊ PERDEU"
        const audio = new Audio('audio/lose.mp3');
        audio.play();
        trofeu.classList = "trofeu-quebrado"
    }

    restartButton[1].addEventListener("click", function () {
        window.location.reload();
    });
}

//Adicionando um ouvinte de click para o botão de pause/menu
    openMenuButton.addEventListener("click", function () {
        popupBackground.style.display = "flex";
        startButton.remove();
        selectedDifficulty.remove();
        restartButton[0].style.display = "flex";
        continueButton.style.display = "flex";
        pause = true;
    });

    //Adicionando um ouvinte de click para o botão de start game
    startButton.addEventListener("click", function () {
        var difficulty = document.getElementById("difficulty").value;
        startGame(difficulty);
    });

    //Adicionando um ouvinte de click para o botão de restart
    restartButton[0].addEventListener("click", function () {
        window.location.reload();
    });

     //Adicionando um ouvinte de click para o botão de continue
    continueButton.addEventListener("click", function () {
        pause = false;
        popupBackground.style.display = "none";
    });

    //Função para começar o jogo
    function startGame(difficulty) {
        let balls;
        let speed
        switch (difficulty) {
            case "facil":
                balls = 10;
                timer = 30;
                speed = 5;
                break;
            case "medio":
                balls = 20;
                timer = 30;
                speed = 7;
                break;
            case "dificil":
                balls = 20;
                timer = 30;
                speed = 9;
                break;
            default:
        }

        count[0].textContent = "Points: " + counter + "/" + balls;
        timerElement.textContent = "Timer: " + timer;
        interval = setInterval(updateTimer, 1000);

        createBalls(balls);
        ballsConfig(speed, balls);

        popupBackground.style.display = "none";
    }