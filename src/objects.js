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
        this.x = (Math.random() * scene.canvas.width) * 2  + scene.canvas.width;
        this.y = Math.random() * scene.canvas.height;
        this.width = obstacleSize;
        this.height = obstacleSize;
        this.speed = obstacleSpeed;
        this.image = new Image();
    }
    draw() { 
        this.x -= this.speed;
        scene.ctx.drawImage(this.image, this.x % scene.canvas.width, this.y, this.width, this.height)
    }
}

class Poop extends Obstacle {
    constructor() {
        super();
        this.speed *= 1.25
        this.image.src = "./images/poopEmoji.png"
    }
}

class Crazy extends Obstacle {
    constructor() {
        super();
        this.speed *= 1.5;
        this.height *= 3.5;
        this.width *= 3
        this.image.src = "./images/crazyEmoji.png"
    }
}

class Biker extends Obstacle {
    constructor() {
        super();
        this.speed *= 2;
        this.height *= 4;
        this.width *= 2
        this.image.src = "./images/bikerEmoji.png"

    }
}

class Pfand extends Obstacle {
    constructor() {
        super();
        this.width /= 2;
        this.image.src = "./images/bottleEmoji.png"
    }
}