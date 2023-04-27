class Sprite {
    // Use {} for the argument of constructor is to benefit form the key: value form,
    // for it can illustrate the name of the argument we are manipulating, provides solid readability.
    // Down to the code which const background to check it out.
    constructor({ anchorPoint, imageSrc }) {
        // Just like the Player class.
        this.anchorPoint = anchorPoint;
        // Create a instance of Image() class, then this.image can use the stuff inside the built-in class: Image().
        this.image = new Image();
        // Set the image src.
        this.image.src = imageSrc;
    }
    // Introduce a way to draw image on the canvas.
    paint() {
        // Read the rest before read this line.
        // This line of code provides errors, if this.image doesn't exists, return.
        if (!this.image) {return;}
        // canvas 2d API.
        c.drawImage(this.image, this.anchorPoint.x, this.anchorPoint.y)
    }

    execute() {
        this.paint();
    }

}