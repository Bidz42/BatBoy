export class Collision { //exporting class collision
    constructor(game, x ,y){ //3 arguments needed 
        this.game = game;
        this.image = document.getElementById('collision');
        this.spriteWidth = 250;
        this.spriteHeight = 150; //dimensions of sprite
        this.sizeModifier = Math.random() + 0.5; //random math to 0.5 for size mod
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier; 
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5; //so collsion happens in middle of characters
        this.frameX = 0;
        this.maxFrame = 9;
        this.deleteIt = false; //delteit set to false initially
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0; //setting frames, interval and timer
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }  //drawing image collision
    update(deltaTime){
        this.x -= this.game.speed; //collision slows game speed
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else{
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.deleteIt = true; //delte collision when frameX > maxFrame
    }
}