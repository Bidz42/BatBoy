class Enemy{ //parent class, no arguments 
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.deleteIt = false;
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //remove from array once past screen
        if (this.x + this.width < 0) this.deleteIt = true;

    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height); //debug mode 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }   //draw enemy with 9 arguments as sprite
}

export class FlyingEnemy extends Enemy { //child class. could even have 3 fly enenmies by child to this class
    constructor(game){
        super();
        this.game = game;
        this.width = 340;
        this.height = 115;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1.5;
        this.speedY = 0;
        this.maxFrame = 2;
        this.image = document.getElementById('enemy-fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);

    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 260;
        this. height = 230;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin + 5;
        this.image = document.getElementById('enemy-ground');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
    }

}

export class ClimbEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 100;
        this. height = 150;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById('enemy-climb');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 4;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin
            ) this.speedY *= -1;
        if (this.y < -this.height) this.deleteIt = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x, this.width/2,0);
        context.lineTo(this.x + this.width/2, this.y + 50);
        context.stroke();
    }

}

export class GroundEnemy2 extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 212.5;
        this. height = 185;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemy-ground2');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
    }

}

export class FlyingEnemy2 extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 195;
        this.height = 130;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1.5;
        this.speedY = 0;
        this.maxFrame = 2;
        this.image = document.getElementById('enemy-fly2');
        //this.angle = 0;
        //this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        //this.angle += this.va;
        //this.y += Math.sin(this.angle);

    }
}