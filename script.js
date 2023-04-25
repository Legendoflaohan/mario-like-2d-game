const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

//when you const a new cube, it has Cube's properties and does initialize.
class Cube {
    //Set little properties for the class
    //Constructor is let declaring variables, and set values to them.
    constructor(anchorPoint, speed, acc) {
        //this refers to this class, so this.initialize() refers to the function below.
        //this.anchorPoint is given whatever the argument passes.
        this.anchorPoint = anchorPoint;
        //set initial speed and acc.
        this.speed = speed;
        this.acc = acc;
    }
    //Actions of the class, actions can use the constructor properties above
    //Action one: generate a blue cube.
    initialize() {
        c.fillStyle = 'blue';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, 200, 200);
    }

    move() {
        //move the blue cube downwards 1px per fps.
        this.anchorPoint.y += this.speed;
        //acceleration
        this.speed += this.acc;
    }
}
//Set a cube with class Cube. Set it's anchorPoint, speed, and acc.
const cube = new Cube({ x: 100, y: 100, }, 1, 0.5);
//Animation loop function.
function hangHang() {
    //A per fpx refresh purple background for the blue cubes.
    c.fillStyle = 'purple';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //cube who just born will execute initialize function in class Cube, each fps it move 1px downwards.
    cube.initialize();
    //cube who just born will execute move function in class Cube, for each fps it executes one time.
    cube.move();
    window.requestAnimationFrame(hangHang);
}
//execute hangHang.
hangHang();