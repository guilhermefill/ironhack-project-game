class Scene {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.backgroundSpeed = 1.4;
        this.image = new Image();
        this.image.src = './images/background-1.png';
        this.x = 0;
        this.y = 0;
        this.winSound =  new Audio ();
        this.winSound.src = './sounds/winSound.wav';
        this.winSound.loop = false;
        this.loseSound =  new Audio ();
        this.loseSound.src = './sounds/loseSound.wav';
        this.loseSound.loop = false;
        this.restartSound =  new Audio ();
        this.restartSound.src = './sounds/restartSound.wav';
        this.restartSound.loop = false;
        this.mainSound =  new Audio ();
        this.mainSound.src = './sounds/mainSound.mp3';
        this.mainSound.volume = 0.05;
        this.mainSound.playbackRate = 0.98
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    animate() {
        this.x -= this.backgroundSpeed
        scene.ctx.globalAlpha = 1;
        this.ctx.drawImage(this.image, (this.x % this.canvas.width), this.y, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, (this.x % this.canvas.width) + this.canvas.width, this.y, this.canvas.width, this.canvas.height);
    }
    gameStart() {
        this.text = `
        Welcome to the streets of Berlin. 
        \n Living as a broken student is not easy. 
        \n Try to collect the pfand and get dinner. 
        \n Press "Enter" to start.`
        this.text = this.text.split('\n');
        this.ctx.font = '32px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        let lineHeight = 28;
        for (let i = 0; i < this.text.length; i++) {
            this.ctx.fillText(this.text[i], this.canvas.width / 2, (this.canvas.height / 3.6) + (i * lineHeight));
        };
        this.textSmall = `Use keyboard arrows to move your player up and down.`;
        this.ctx.font = '16px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.textSmall, this.canvas.width / 2, (this.canvas.height / 1.4));
    }
    gameWon() {
        this.text = 'CONGRATULATIONS! YOU WON!';
        this.textMid = 'Go and get yourself a Döner!!';
        this.textSmall = `Press 'r' to try again.`;
        this.ctx.font = '48px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2.5);
        this.ctx.font = '36px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.textMid, this.canvas.width / 2, (this.canvas.height / 2));
        this.ctx.font = '16px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.textSmall, this.canvas.width / 2, (this.canvas.height / 1.5));
        this.doner = new Image ();
        this.doner.src = './images/donerEmoji.png';
        this.ctx.drawImage(this.doner, (this.canvas.width / 2) - obstacleSize, (this.canvas.height / 2) + obstacleSize, heroSize, heroSize);  
    }
    gameOver() {
        this.text = 'GAME OVER';
        this.textSmall = `Press 'r' to try again.`;
        this.ctx.font = '48px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '16px Roboto';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.textSmall, this.canvas.width / 2, (this.canvas.height / 1.5));
    }
} 

class Hero {
    constructor() {
        this.x = 75;
        this.y = (scene.canvas.height / 2) - (heroSize / 2);
        this.speed = heroSpeed;
        this.image = new Image (); 
        this.image.src = "./images/heroEmoji.png"
        this.size = heroSize;
    }
    draw() {
        scene.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
    moveUp() {
        if(this.y > 0) {
            this.y -= heroSpeed;
        }
    }
    moveDown() {
        if(this.y < scene.canvas.height - heroSize) {
            this.y += heroSpeed;
        }
    }
}

class Obstacle {
    constructor() {
        this.width = obstacleSize;
        this.height = obstacleSize;
        this.x = (Math.random() * scene.canvas.width) + scene.canvas.width;
        this.y = Math.abs((Math.random() * scene.canvas.height) - (this.height * 4));
        this.speed = obstacleSpeed;
        this.image = new Image();
        this.scoreValue = obstacleValue
        this.sound = new Audio();
    }
    draw() { 
        this.x -= this.speed;
        scene.ctx.globalAlpha = 0.95;
        scene.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

class Poop extends Obstacle {
    constructor() {
        super();
        this.speed *= 1.4;
        this.scoreValue /= 5;
        this.image.src = "./images/poopEmoji.png";
        this.sound.src = './sounds/poopSound.wav';
    }
}

class Crazy extends Obstacle {
    constructor() {
        super();
        this.speed = 2;
        this.height *= 4.5;
        this.width *= 3.5;
        this.image.src = "./images/crazyEmoji.png";
        this.sound.src = './sounds/crazySound.wav';
    }
}

class Biker extends Obstacle {
    constructor() {
        super();
        this.speed *= 3;
        this.height *= 3.8;
        this.width *= 3.3;
        this.scoreValue *= 4;
        this.image.src = "./images/bikerEmoji.png";
        this.sound.src = './sounds/bikeSound.wav';
    }
}

class Pfand extends Obstacle {
    constructor() {
        super();
        this.speed = 1.4;
        this.width /= 2;
        this.image.src = "./images/bottleEmoji.png";
        this.scoreValue = pfandValue;
        this.sound.src = './sounds/mixkit-arcade-mechanical-bling-210.wav';
    }
}