let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
const alpha = {min: -180, max: 179}
const beta = {min: -180, max: 179}
const gamma = {min: -90, max: 89}

class Circle{
    x = 0;
    y = 0;
    r = 20;
    fill = true;

   draw(){
    if(this.fill){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }else{
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    } 
   } 
}

const circle1 = new Circle();
circle1.draw();


window.addEventListener("deviceorientation",(a,b,y)=>{
    console.log(a,b,y);
})

