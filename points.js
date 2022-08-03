export class Points {
    constructor(game){
        this.game = game;
        this.fontSize = 30; //default font size
        this.fontFamily = 'nosifer';  //font face not working
        this.life = document.getElementById('life');  //heart img
    }
    draw(context){
        context.save();  //save at beginning of every instance
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;  //create a shadow of font for effect
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);  //score and dimensions
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80); //timer and where. fixed to 1dp using *0.001
        //lives
        for (let i = 0; i < this.game.lives; i++){
        context.drawImage(this.life, 30 * i + 20, 95, 25, 25);  //looping lives to display at index i instead of over eachother
        }
        //game over
        if (this.game.gameOver){
            this.game.music.pause();
            context.textAlign = 'center';
            context.font = this.fontSize * 3 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winScore){  //the win message
                context.fillText('YOU WIN!!!', this.game.width * 0.5, this.game.height * 0.5 - 50);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('"Its not who I am underneath,', this.game.width * 0.5, this.game.height * 0.5 + 30);
                context.fillText('but what I do that defines me."', this.game.width * 0.5, this.game.height * 0.5 + 90);
                new Audio("./sounds/WIN.mp3").play();
                setTimeout(window.location.reload.bind(window.location), 8000);
            } else {
                context.fillText('LOSER', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('"PEACE HAS COST YOU STRENGTH!!!"', this.game.width * 0.5, this.game.height * 0.5 + 80); 
                new Audio("./sounds/ClipL.mp3").play();  
                setTimeout(window.location.reload.bind(window.location), 5000); //the lose message
            } 
        }
        context.restore(); //restore at end of every instance because we called save
    }
}