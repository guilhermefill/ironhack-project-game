const scene = new Scene();
const hero = new Hero();
let obstacleArray = new Array(3).fill(null).map(poop => new Poop());
let pfandArray = new Array(3).fill(null).map(poop => new Pfand());
let wallet = 1.00;
const scoreboard = document.getElementById('wallet')

const detectCollision = (obj,array) => {
    if (
        hero.x < obj.x + obj.width &&
        hero.x + hero.size > obj.x &&
        hero.y < obj.y + obj.height &&
        hero.size + hero.y > obj.y  
    ) {
        array.splice(array.indexOf(obj), 1);
        wallet += obj.scoreValue;
        obj.sound.play();
    }
}

const addObstacle = () => {
    setInterval(() => {obstacleArray.push(new Poop())}, 2000)
    setInterval(() => {obstacleArray.push(new Crazy())}, 8000)
    setInterval(() => {obstacleArray.push(new Biker())}, 14000)
    setInterval(() => {pfandArray.push(new Pfand())}, 3000)
}

const removeObstacle = (obj, array) => {
    if ((obj.x + obj.width) < 0) {
        array.splice(array.indexOf(obj), 1);
    }
}

const winCondition = () => {
    if(wallet.toFixed(2) <= 0.00) {
        gameOver = true;
        startGame = false;
    } else if (wallet.toFixed(2) >= 3.50) {
        gameWon = true;
        startGame = false;
    }
}

document.addEventListener('keydown', event => {
    const pressedKey = event.key;
    switch(pressedKey) {
        case 'ArrowUp':
            hero.moveUp();
            break;
        case 'ArrowDown':
            hero.moveDown();
            break;
    }
    if(pressedKey === 'Enter') {
        startGame = true;
    } 
    if (pressedKey === 'r') {
        startGame = true;
        gameWon === false;
        gameOver === false;
        wallet = 1.00
    }

})

addObstacle();

function update() {
    if (!startGame) {
        scene.clear();
        scene.gameStart()
    }
    if (startGame) {
        scene.clear();
        scene.animate();
        hero.draw();
        obstacleArray.forEach(obstacle => {
            obstacle.draw();
            detectCollision(obstacle, obstacleArray);
            removeObstacle(obstacle, obstacleArray);
        })
        pfandArray.forEach(pfand => {
            pfand.draw();
            detectCollision(pfand, pfandArray);
            removeObstacle(pfand, pfandArray);
        })
        winCondition()
    } else if (gameWon) {
        scene.clear();
        scene.gameWon();
        clearInterval(addObstacle)
        obstacleArray = [];
        pfandArray = [];
    } else if (gameOver) {
        scene.clear();
        scene.gameOver();
        clearInterval(addObstacle)
        obstacleArray = [];
        pfandArray = [];
        wallet = 0;
    }
    scoreboard.innerHTML = '💰💰 Wallet: ' + wallet.toFixed(2);
    requestAnimationFrame(update);
}

update()