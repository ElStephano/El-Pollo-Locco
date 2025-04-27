/**
 * Class that describes an object that can be thrown.
 * Inherits from the `MovableObject` class and represents a thrown object (e.g., a bottle).
 * The object can be thrown, hits obstacles, and plays an animation when it hits something.
 */
class ThrowableObject extends MovableObject {
    /**
     * @type {boolean} Indicates whether the object has been hit.
     */
    isHit = false;

    /**
     * @type {string[]} List of image paths for the bottle's rotation animation.
     */
    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * @type {string[]} List of image paths for the bottle's splash animation when it hits something.
     */
    IMAGES_BOTTLE_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * @type {Object} Offset values that affect the position of the object.
     * @property {number} top Distance from the top edge.
     * @property {number} right Distance from the right edge.
     * @property {number} bottom Distance from the bottom edge.
     * @property {number} left Distance from the left edge.
     */
    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };

    /**
     * Creates a new `ThrowableObject` at the specified positions.
     * 
     * @param {number} x - The X position of the object.
     * @param {number} y - The Y position of the object.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_HIT);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.throwInterval = null;
        this.animationInterval = null;
        this.gravityInterval = null;
        this.throw(x, y + 120);
    }

    /**
     * Throws the object in the specified direction.
     * 
     * @param {number} x - The X position to throw the object to.
     * @param {number} y - The Y position to throw the object to.
     */
    throw(x, y) {
        let direction = world.character.otherDirection;
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.speedX = 30;
        this.applyGravity();
        this.throwedDirection(direction);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROW);
        }, 1000 / 20);
    }

    /**
     * Determines the direction in which the object will be thrown.
     * 
     * @param {boolean} direction - Indicates whether the object is thrown left or right.
     */
    throwedDirection(direction) {
        if (!direction) {
            this.throwRightDirection();
        } else if (direction) {
            this.throwLeftDirection();
        }
    }

    /**
     * Throws the object to the right.
     */
    throwRightDirection() {
        this.throwInterval = setInterval(() => {
            this.x += 25;
        }, 50);
    }

    /**
     * Throws the object to the left.
     */
    throwLeftDirection() {
        this.throwInterval = setInterval(() => {
            this.x -= 25;
        }, 50);
    }

    /**
     * Called when the object hits another object.
     * Stops the movement and plays the hit animation.
     * 
     * @param {number} x - The X position of the hit.
     * @param {number} y - The Y position of the hit.
     */
    bottleHit(x, y) {
        this.isHit = true;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
        this.playHitAnimation();
    }

    /**
     * Starts the animation that plays when the bottle is hit.
     */
    playHitAnimation() {
        let frameCount = 0;
        let maxFrames = this.IMAGES_BOTTLE_HIT.length;
        let hitAnimationInterval = setInterval(() =>
            this.updateHitAnimation(hitAnimationInterval, frameCount++, maxFrames), 250);
    }

    /**
     * Updates the hit animation during gameplay.
     * 
     * @param {number} interval - The interval for the animation update.
     * @param {number} frameCount - The current frame in the animation.
     * @param {number} maxFrames - The maximum number of frames in the animation.
     */
    updateHitAnimation(interval, frameCount, maxFrames) {
        this.playAnimation(this.IMAGES_BOTTLE_HIT);
        if (frameCount >= maxFrames) {
            this.removeAfterAnimation(interval);
        }
    }

    /**
     * Removes the object after the hit animation ends.
     * 
     * @param {number} interval - The interval for the animation update that will be stopped.
     */
    removeAfterAnimation(interval) {
        clearInterval(interval);
        let index = world.throwableObjects.indexOf(this);
        if (index !== -1) {
            world.throwableObjects.splice(index, 1);
            this.imageCache = 0;
        }
    }
}