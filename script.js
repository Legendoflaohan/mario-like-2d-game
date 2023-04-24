const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//Read this line after finish the animate function.
//Declare y outside cuz otherwize the box and the value
// would be set to 100 every fps fresh like a lime.

let y = 100;
let speed = 1;
let acc = 1;
//a loop that refresh in every fps, by default it's 60 fps
//body oh body do I love this stuff!!
//It's sooooo smooth!!!!
function animate() {
    //refresh the canvas with color white in every fps.
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //Here is the red cube.
    c.fillStyle = 'red';
    c.fillRect(100, y, 200, 200);
    //Red cube move 1px downwards per fps.
    y += speed;
    speed += acc;
    window.requestAnimationFrame(animate);
}

animate(); 