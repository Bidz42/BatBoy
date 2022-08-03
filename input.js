export class InputHandler{ //seperate to handle input
    constructor(game){
        this.game = game;
        this.keys = []; //empty array
        window.addEventListener('keydown', e => {
           
            if((e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ('a' || 'A') ||
                e.key === ('s' || 'S')
            ) && this.keys.indexOf(e.key) === -1){
            this.keys.push(e.key); //push selected keys to array
           } else if(e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
           
            if( e.key === 'ArrowDown'|| 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ('a' || 'A') ||
                e.key === ('s' || 'S')){
            this.keys.splice(this.keys.indexOf(e.key), 1); //remove from array on keyup
           }
        });
    }
}
 