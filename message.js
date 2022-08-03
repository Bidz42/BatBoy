export class Floater {
    constructor( value, x, y, targetX, targetY){ //score floater values with arguments 
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.deleteIt = false;
        this.timer = 0;
    }
    update(){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03; //added *0.03 to make score disappear slower
        this.timer++;
        if (this.timer > 100) this.deleteIt = true; //if time > 100 delete
    }
    draw(context){
        context.font = '25px Nosifer';
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y + 2);
    }
}