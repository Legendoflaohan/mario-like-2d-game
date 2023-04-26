const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

class Cube {
    constructor(anchorPoint, velocity, acc) {
        this.anchorPoint = anchorPoint;
        this.width = 100;
        this.height = 100;
        this.velocity = velocity;
        this.acc = acc;
    }

    initialize() {
        c.fillStyle = 'grey';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
    }

    gravity() {
        this.anchorPoint.y += this.velocity.v;
        if (this.anchorPoint.y + this.height + this.velocity.v < canvas.height) {
            this.velocity.v += this.acc;
            console.log('fucker')
        } else {
            this.velocity.v = 0;
        }
    }

    move() {
        this.anchorPoint.x += this.velocity.h;
    }
}
const cube = new Cube({ x: 450, y: 0, }, { h: 0, v: 0 }, 3);

function hangHang() {
    c.fillStyle = 'wheat';
    c.fillRect(0, 0, canvas.width, canvas.height);
    cube.initialize();
    cube.gravity();
    cube.move();
    window.requestAnimationFrame(hangHang);
}



hangHang();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            cube.velocity.h = 1;
            break;
        case 'ArrowLeft':
            cube.velocity.h = -1;
            break;
        case 'ArrowUp':
            cube.velocity.v = -30;
            break;
    }
});
