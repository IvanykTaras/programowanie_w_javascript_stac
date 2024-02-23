const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const balls = [];
const minDistance = 100; 
let requestId;
let isRunning = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9

function randomRange(min, max) {
    const random = Math.random();
    return Math.floor(random * (max - min) + min);
}

class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }
    }

    drawLineTo(otherBall) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(otherBall.x, otherBall.y);
        ctx.stroke();
        ctx.strokeStyle = 'blue';
        ctx.closePath();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.draw();
        ball.update();
        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            const distance = Math.sqrt(Math.pow(ball.x - otherBall.x, 2) + Math.pow(ball.y - otherBall.y, 2));
            if (distance < minDistance) {
                ball.drawLineTo(otherBall);
            }
        }
    }
    requestId = requestAnimationFrame(animate);
}


function startAnimete(){
    
    if(!isRunning){
        isRunning = true;
        balls.splice(0,balls.length);

        for (let i = 0; i < 300; i++) {
            const radius = 5;
            const x = randomRange(radius, canvas.width - radius);
            const y = randomRange(radius, canvas.height - radius);
            const speedX = randomRange(-2, 2);
            const speedY = randomRange(-2, 2);
            const ball = new Ball(x, y, radius, speedX, speedY);
            balls.push(ball);
        }
    
        animate();
    }
}

function stopAnimate(){
    cancelAnimationFrame(requestId);
    isRunning = false;
}


function resetAnimate() {
    stopAnimate();
    startAnimete();    
}



const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset")

startButton.addEventListener("click", startAnimete);
resetButton.addEventListener("click", resetAnimate);