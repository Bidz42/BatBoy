import { Dust, Fire, Splash } from "./effects.js";
//import effects to states as they run simultaneously
const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
    ATTACK: 7,
    JATTACK: 8,
    KO: 9
}
//states in enum format

class State {
    constructor(state, game){
        this.states = state;
        this.game = game;
    }
} //main class state for children to share

export class Idle extends State{
    constructor(game){
        super('IDLE', game); //callin parent
      
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 5;
    }
    handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('a' || 'A')){
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('s' || 'S')){
            this.game.player.setState(states.ATTACK, 2);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        }
        //if sitting and < or > run, else if a, roll. added 'A' to prvent game crash if caps is on
    }
}

export class Running extends State{
    constructor(game){
        super('RUNNING', game); // calling on parent 
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    handleInput(input){
        this.game.effects.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
        if (input.includes('ArrowDown')){
            this.game.player.setState(states.IDLE, 0);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes('a' || 'A')){
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('s' || 'S')){
            this.game.player.setState(states.ATTACK, 2);
        }//if running and down, sit. if up, jump, else is a, roll
    }    // added dust effect when running
}

export class Jumping extends State{
    constructor(game){
        super('JUMPING',game);
    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }  else if (input.includes('a' || 'A')){
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
} //if jumping, a = roll, down is dive, default is fall

export class Falling extends State{
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
}
}

export class Rolling extends State{
    constructor(game){
        super('ROLLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 6;
    }
    handleInput(input){
        this.game.effects.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (!input.includes('a' || 'A') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('a' || 'A') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('a' || 'A') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 30;
        } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        } //when rolling onGround and no a, run. no a and no onGround = falling, else if a or up, jump, else arrow down and not onGround then dive
    }     //added fire to rolling
}

export class Diving extends State{
    constructor(game){
        super('DIVING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 6;
        this.game.player.vy =15;
    }
    handleInput(input){
        this.game.effects.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++){
            this.game.effects.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
            }
        } else if (input.includes('a' || 'A') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2);
        }  //if diving and then onGround, run. else if a and onGorund, roll
    }       //added fire to dive and splash for dive boom
}

export class Hit extends State{
    constructor(game){
        super('HIT', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 9;
        this.game.player.frameY = 4;
    }
    handleInput(input){
        if (this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }   //if hit stop run or fall n stop
    }
}

export class Attack extends State{
    constructor(game){
        super('ATTACK', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 7;
    }
    handleInput(input){
        if (!input.includes('s' || 'S') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('S' || 'S') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('s' || 'S') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 30;
        } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        } else if (input.includes('s' || 'S') && !this.game.player.onGround()){
            this.game.player.setState(states.ATTACK, 2);
        }  //if hit stop run or fall n stop
    }
}
