// VS Code trick: Ctrl + K Ctrl + 0 fold all.
// VS Code trick: Ctrl + K Ctrl + J unfolds all.

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height /4,
}

const keys = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}

// Introduce a player.
// It's called a new instance.
const player = new Player({ x: 450, y: 0, }, { h: 0, v: 0 }, 9.8);

// Introduce the background.
const background = new Sprite ({
    anchorPoint: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
})

function animation() {
    c.fillStyle = 'wheat';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // Read next line of code then go back here.
    // Here's the solution, use canvas save and restore to create an box,
    // only stuff inside the box will be affected by scale method~~~
    c.save();
    // Use canvas scale method to adjust the size of image.
    // But there's a problem, the scale method keeps working every loop, so we need a solution.
    // Also, it's like a 放大镜 when using scale method, everything in the viewport aka canvas is bigger,
    // but the stuff actually doesn't change. So when we move origin(coordinate) around using translate method,
    // we are using the actual length.
    c.scale(4, 4);
    // The x, y of the drawImage as well as the fillRect are all relate to the origin,
    // when the origin aka the coordinate changed, the position of stuff drawed after the change will change,
    // stuff before the coordinate change will rimain its position.
    // The canvas aka the viewport won't change place.
    c.translate(0, -background.image.height);
    c.translate(0, scaledCanvas.height);
    background.execute();
    c.restore();
    player.execute();
    window.requestAnimationFrame(animation);
}

animation();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowUp':
            player.velocity.v = -25;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});