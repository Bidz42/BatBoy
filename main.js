import { Player } from "./player.js";
import { InputHandler} from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbEnemy, GroundEnemy, GroundEnemy2, FlyingEnemy2 } from "./enemies.js";
import { Points } from "./points.js"
//importing all classes required for game class to run

window.addEventListener('load', function(){ 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 750;
canvas.style.display = "none";

document.getElementById("start").onclick = () => {
    canvas.style.display = "block";
    game.music.play();
}

//loading canvas at load and defining width n height
class Game {
    constructor (width, height){                                //constr takes 2 arguments 
        this.width = width;
        this.height = height;
        this.groundMargin = 100;                                 //margine of when player is at ground
        this.speed = 0; 
        this.maxSpeed = 4;                                      //speed and max speed of game
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.points = new Points(this);                         //inititating imported classes
        this.enemies = [];
        this.effects = [];
        this.collisions = [];
        this.floaters = [];                                     //empty arrays to handle import class instances
        this.maxEffects = 100;
        this.enemyTimer = 0;
        this.enemyInterval = 1800;                              //enemy timer n interval to calculate enemy appearance
        this.debug = false;                                     //added debug mode
        this.score = 0;
        this.winScore = 50;                                    //score and winning (max) score
        this.fontColor = 'black';
        this.time = 0;
        this.maxTime = 100000;                                 //max game time
        this.gameOver = false;      
        this.lives = 9;
        this.player.currentState = this.player.states[0];       //initiated in player class at null
        this.player.currentState.enter();                       //how game enters different states
        this.music = new Audio("./sounds/BatTheme.mp3");
        this.music.loop = true;
        document.getElementById("mute").onclick = () => {
            this.music.muted = !this.music.muted
        }
    }
    update(deltaTime){                                          //deltaetime as argument to calculate frames
        this.time += deltaTime;
        if (this.time > this.maxTime) this.gameOver = true;
        this.background.update();
        this.player.update(this.input.keys, deltaTime);         
        //enemies added
        if (this.enemyTimer > this.enemyInterval){
            this.addEnemy();
            this.enemyTimer = 0;                                //add enemy if timer > interval
        }   else {
            this.enemyTimer += deltaTime;                       //else add delta time to enemy timer
        }
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);                            
        });
        //handle floaters
        this.floaters.forEach(message => {
            message.update();
        });
        //handle effects
        this.effects.forEach((effect) => {
            effect.update();                                    //updating instances at deltatime
        });
        if(this.effects.length > this.maxEffects){
            this.effects.length = this.maxEffects;              //if effect animations exceed max effects set animations to max
        } 
        //handle collisions
        this.collisions.forEach((collision) => {
            collision.update(deltaTime);
        })
        this.enemies = this.enemies.filter(enemy => !enemy.deleteIt);
        this.effects = this.effects.filter(effect => !effect.deleteIt);
        this.collisions = this.collisions.filter(collision => !collision.deleteIt);
        this.floaters = this.floaters.filter(message => !message.deleteIt);             //get rid of instances from respected arrays 
    }
    draw(context){                                              //draw needs context
        this.background.draw(context);
        this.player.draw(context);                              //background and player always drawn
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        this.effects.forEach(effect => {
            effect.draw(context);
        });
        this.collisions.forEach(collision => {
            collision.draw(context);
        });
        this.floaters.forEach(message => {
            message.draw(context);                              //enemies etc drawn at each instance of array
        })
        this.points.draw(context);                              //points always drawn
    }
    addEnemy(){
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0) this.enemies.push(new GroundEnemy2(this));
        if (this.speed > 0 && Math.random() < 0.75) this.enemies.push(new FlyingEnemy(this));
        else if (this.speed > 0) this.enemies.push(new FlyingEnemy2(this));
        if (this.speed > 0 & Math.random() < 0.25) this.enemies.push(new ClimbEnemy(this));
    }                                                           // ground and climb enemy work either or, flying enemy is constant
}
const game = new Game(canvas.width, canvas.height);


//animation time stamps and delta time
let lastTime = 0;

function animate(timeStamp){                                    //function to make game animated else static
    const deltaTime = timeStamp - lastTime;                     //deltatime is timestamp(lasttime) - lasttime
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);                                             //update and draw with arguments
    if (!game.gameOver) requestAnimationFrame(animate);         //if game is not over js is animating 
}
    animate(0);
});