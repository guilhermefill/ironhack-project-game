class Scene {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.backgroundSpeed = 1;
        this.image = new Image();
        this.image.src = './images/background-1.png'
        this.x = 0;
        this.y = 0;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    animate() {
        this.x -= this.backgroundSpeed
        this.ctx.drawImage(this.image, (this.x % this.canvas.width), this.y, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, (this.x % this.canvas.width) + this.canvas.width, this.y, this.canvas.width, this.canvas.height);
    }
    gameStart() {
        this.text = `
        Welcome to the streets of Berlin. 
        \n Living as a broken student is not easy. 
        \n Try to collect the pfand to help you get dinner. 
        \n Press "Enter" to start.`
        this.text = this.text.split('\n');
        this.ctx.font = '24px sans-serif'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        let lineHeight = 24;
        for (let i = 0; i < this.text.length; i++) {
            this.ctx.fillText(this.text[i], this.canvas.width / 2, (this.canvas.height / 3.5) + (i * lineHeight))
        }
        this.textSmall = `Use arrows up and down to move your player.`
        this.ctx.font = '16px sans-serif'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.textSmall, this.canvas.width / 2, (this.canvas.height / 1.5))
        
    }
    gameWon() {
        this.ctx.fillStyle = "grey"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.text = 'CONGRATULATIONS! YOU WON!'
        this.ctx.font = '48px sans-serif'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2)
    }
    gameOver() {
        this.ctx.fillStyle = "grey"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.text = 'GAME OVER'
        this.ctx.font = '48px sans-serif'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2)
    }
} 

class Hero {
    constructor() {
        this.x = 25;
        this.y = (scene.canvas.height / 2) - heroSize;
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
        this.y = (Math.random() * scene.canvas.height) - this.height;
        this.speed = obstacleSpeed;
        this.image = new Image();
        this.scoreValue = obstacleValue
    }
    draw() { 
        this.x -= this.speed;
        scene.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

class Poop extends Obstacle {
    constructor() {
        super();
        this.speed *= 1.25
        this.scoreValue /= 5
        this.image.src = "./images/poopEmoji.png"
    }
}

class Crazy extends Obstacle {
    constructor() {
        super();
        this.speed *= 1.5;
        this.height *= 3;
        this.width *= 2.5;
        this.image.src = "./images/crazyEmoji.png"
    }
}

class Biker extends Obstacle {
    constructor() {
        super();
        this.speed *= 2;
        this.height *= 3.5;
        this.width *= 1.5
        this.scoreValue *= 4
        this.image.src = "./images/bikerEmoji.png"
    }
}

class Pfand extends Obstacle {
    constructor() {
        super();
        this.width /= 2;
        this.image.src = "./images/bottleEmoji.png"
        this.scoreValue = pfandValue
    }
}