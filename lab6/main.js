const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = ()=>{
    if(localStorage.getItem("highScore") === null){
        localStorage.setItem("highScore", 0)
    }
    draw();
    high_score.innerHTML = `High score: ${Number(localStorage.getItem("highScore"))}`
};

//Timer part
let startTime;
let isRunning = false;
let requestId;
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const high_score = document.getElementById('high_score');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = performance.now();
        updateTimer();
    }
}

function stopTimer() {
    isRunning = false;
    cancelAnimationFrame(requestId);
}

function updateTimer() {
    //stop timer after 60 seconds
    
    if (!isRunning) return;
    const elapsedTime = performance.now() - startTime;
    let seconds = Math.floor(elapsedTime / 1000);
    
    timerElement.innerHTML = `Timer: ${seconds} seconds`;
    scoreElement.innerHTML = `Score: ${numOfScore}`;
    high_score.innerHTML = `High score: ${Number(localStorage.getItem("highScore"))}`

    draw()
    requestId = requestAnimationFrame(updateTimer);

    if(seconds >= 60){
        startTime = 0;
        seconds = 0;
        stopTimer()
        numOfScore = 0;
        alert("Game is finish");
    } 
}


const startButton = document.querySelector("#start");
const stopButton = document.getElementById("stop");
startButton.addEventListener("click",()=>{
    startTimer()
    x = Math.floor(Math.random() * canvas.width) + 1;
    y = Math.floor(Math.random() * canvas.height) + 1;
})
stopButton.addEventListener("click",()=>{
    stopTimer()
    numOfScore = 0;
})



let x = Math.floor(Math.random() * canvas.width) + 1;
let y = Math.floor(Math.random() * canvas.height) + 1;
let numOfScore = 0;
let ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, ballRadius, 0, Math.PI*2);
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawHole();
    drawBall();
    score();
    moveBall();
}

function score() {
    if(
        x > canvas.width/2 - ballRadius &&
        x < canvas.width/2 + ballRadius &&
        y > canvas.height/2 - ballRadius &&
        y < canvas.height/2 + ballRadius 
    ){
        x = Math.floor(Math.random() * canvas.width) + 1;
        y = Math.floor(Math.random() * canvas.height) + 1;

        numOfScore++;
        let storageScore = Number(localStorage.getItem("highScore"));
        if(storageScore < numOfScore){
            localStorage.setItem("highScore", numOfScore);
        }
    }
}

function moveBall() {
    
    console.log(a,b);
    if((a < 0 || a > 180) && x > 0){// left move
        x -= 1;

    }if((a>0 && a < 180)  && x < canvas.width){// right move
        x += 1;
        
    }if(b < 90 && y > 0){// up move
        y -= 1;
        
    }if(b > 90 && y < canvas.height){// down move
        y += 1;

    }
}

let a = 0;
let b = 90;
function orientationHandler(e) {
    a = e.alpha;
    b = e.beta
}

window.addEventListener('deviceorientation', orientationHandler)
  
