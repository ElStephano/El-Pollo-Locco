/**
 * The `Cloud` class represents a moving cloud in the background of the game.
 * It inherits from `MovableObject` and continuously moves to the left.
 */
class Cloud extends MovableObject {

    /** The vertical position of the cloud. */
    y = 25;

    /** The height of the cloud in pixels. */
    height = 300;

    /** The width of the cloud in pixels. */
    width = 600;

    /** Interval ID for the cloud's animation. */
    cloudInterval = null;

    /**
     * Creates a new instance of a cloud at the given X position.
     * Loads the cloud image and starts the movement.
     * 
     * @param {number} x - The horizontal starting position of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    /**
     * Starts the continuous movement of the cloud to the left.
     * Adds the animation interval to the background intervals array.
     */
    animate() {
        this.cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        MovableObject.backgroundIntervals.push(this.cloudInterval);
    }
}

