// VS Code trick: Ctrl + K Ctrl + 0 fold all.
// VS Code trick: Ctrl + K Ctrl + J unfolds all.

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

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
    imageSrc: './super-mario-background.jpg',
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
    c.scale(0.1333, 0.1333);
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