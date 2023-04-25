const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// when you const a new cube, it has Cube's properties and does initialize.
class Cube {
    // Set little properties for the class
    // Constructor is let declaring variables, and set values to them.
    constructor(anchorPoint, velocity, acc) {
        // this refers to this class, so this.initialize() refers to the function below.
        // this.anchorPoint is given whatever the argument passes.
        this.anchorPoint = anchorPoint;
        // Initial the width and height of the cube.
        this.width = 100;
        this.height = 100;
        //set initial speed and acc.
        this.velocityh = velocity.h;
        this.velocityv = velocity.v;
        this.acc = acc;
    }
    //Actions of the class, actions can use the constructor properties above
    //Action one: generate a blue cube.
    initialize() {
        c.fillStyle = 'blue';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
    }

    move() {
        this.anchorPoint.x += this.velocityv;
    }

    gravity() {
        // Read this if statement after the rest part of this function.
        if (this.anchorPoint.y + this.height >= canvas.height) {
            // Fix the 误差
            this.anchorPoint.y = canvas.height - this.height;
            // Stop the cube.
            this.velocityh = 0;
        }
        //move the blue cube downwards 1px per fps.
        this.anchorPoint.y += this.velocityh;
        //acceleration
        this.velocityh += this.acc;
    }
}
// Set a cube with class Cube. Set it's anchorPoint, speed, and acc.
const cube = new Cube({ x: 450, y: 0, }, {h: 0, v: 0}, 9.8);
// Animation loop function.
function hangHang() {
    // A per fpx refresh purple background for the blue cubes.
    c.fillStyle = 'purple';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // cube who just born will execute initialize function in class Cube, each fps it move 1px downwards.
    cube.initialize();
    // cube who just born will execute move function in class Cube, for each fps it executes one time.
    cube.gravity();
    // 
    cube.move();
    window.requestAnimationFrame(hangHang);
}



// execute hangHang.
hangHang();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            cube.velocityv = 1;
            break;
    }
});

//好好定义一下名字
//velocityv 是vertical速度
//velocityh 是hori速度