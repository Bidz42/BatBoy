import { Idle , Running, Jumping, Falling, Rolling, Diving, Hit, Attack } from "./playerState.js";
import { Collision } from "./collision.js";
import { Floater } from "./message.js";
//importing classes for player to function. 

export class Player{                        //exporting player for main game class exports within the export
    constructor(game){                      //thats why game is the argument
        this.game = game;
        this.width = 250;
        this.height = 150;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Idle(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game),
                       new Rolling(this.game), new Diving(this.game), new Hit(this.game), new Attack(this.game)]; //importing states, has to be same as enums in playerstate
        this.currentState = null;
       
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal movements
        this.x += this.speed; //x is equal to speed
        if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;//if arrow right then speed = max speed
        else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;//same for left
        else this.speed = 0; //if no input speed 0
        if (this.x < 0) this.x = 0; //left boundary
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; //right boundary
        //vertical movements
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight; //if not on ground weight comes into play to make land
        else this.vy = 0;
        // vertical boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        //sprite animate
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }   else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);   //box for debug
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width,
                          this.height, this.x, this.y, this.width, this.height); //drawing player needs 9 arguments as sprite
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin; // simple function to check if on the ground
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }   //state has 2 arguments current state is the state in array, then enter this state, game speed is also here
    checkCollision(){
        this.game.enemies.forEach(enemy => {
           if   (
                enemy.x < this.x + this.width - 50 &&
                enemy.x + enemy.width + 50 > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
                ){ //how to check if player hits enemy
                    enemy.deleteIt = true;
                    this.game.collisions.push(new Collision(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    if (this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[7]){
                        this.game.score++;
                        this.game.floaters.push(new Floater('+1', enemy.x, enemy.y, 180, 50)); //add floater if hit enemny in state 4 or 5 and score++                                    
                        new Audio("./sounds/ClipP1.mp3").play();
                    }
                    else { 
                        this.setState(6, 0);  //else state 6 which is hit
                        this.game.score -= 5;
                        this.game.lives--;  //-lives n score
                        new Audio("./sounds/Clip1.mp3").play();
                        setTimeout(() => {this.setState(1, 2)}, 2000 )
                        if (this.game.lives <= 0) {
                            this.game.gameOver = true;
                            }
                    }                  
           } 
        });
    }
}