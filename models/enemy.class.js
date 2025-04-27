/**
 * Represents an enemy character in the game that can move and attack.
 * There are two types of enemies: small chickens and large chickens.
 * The enemy can move in both directions and has an animation showing it walking and dying.
 */
class Enemy extends MovableObject {

    /**
     * The height of the enemy.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the enemy.
     * @type {number}
     */
    width = 100;

    /**
     * The y-coordinate of the enemy.
     * @type {number}
     */
    y = 320;

    /**
     * Indicates whether the enemy has been hit.
     * @type {boolean}
     */
    isHit = false;

    /**
     * The interval for the enemy's movement animation.
     * @type {number | null}
     */
    enemyAnimationInterval = null;

    /**
     * The interval for the enemy's movement.
     * @type {number | null}
     */
    enemyMoveInterval = null;

    /**
     * Indicates whether the enemy is a small chicken.
     * @type {boolean}
     */
    isSmallChicken = false;

    /**
     * The audio object for the enemy's death sound.
     * @type {Audio}
     */
    deadSound = new Audio('audio/dead_chicken.mp3');

    /**
     * A value indicating whether the death sound has already been played.
     * @type {boolean}
     */
    soundPlay = false;

    /**
     * The walking animation images for a large chicken.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * The dead image for a large chicken.
     * @type {string}
     */
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * The walking animation images for a small chicken.
     * @type {Array<string>}
     */
    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * The dead image for a small chicken.
     * @type {string}
     */
    SMALL_CHICKEN_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * The offset values for collision detection.
     * @type {Object}
     */
    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };

    /**
     * Creates an instance of an enemy.
     * The enemy can randomly be either a small or a large chicken.
     * @param {number} x - The x-coordinate of the enemy.
     * @constructor
     */
    constructor(x) {
        super();
        this.isSmallChicken = Math.random() < 0.5;
        this.x = x;
        if (this.isSmallChicken) {
            this.createSmallChicken();
        } else {
            this.createLargeChicken();
        }
        this.audioSettings();
        this.animate();
    }

    /**
     * Initializes the small chicken.
     */
    createSmallChicken() {
        this.speed = 2;
        this.height = 80;
        this.width = 80;
        this.y = 350;
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImage(this.SMALL_CHICKEN_WALKING[0]);
    }

    /**
     * Initializes the large chicken.
     */
    createLargeChicken() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.speed = 3;
    }

    /**
     * Starts the enemy's animations and movement.
     */
    animate() {
        this.enemyMoveInterval = setInterval(() => {
            this.enemiesMovement();
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyMoveInterval);

        this.enemyAnimationInterval = setInterval(() => {
            this.animateEnemies();
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyAnimationInterval);
    }

    /**
     * Handles the enemy's movement.
     * If the enemy is not hit, it moves to the left.
     */
    enemiesMovement() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.moveLeft();
        }
    }

    /**
     * Determines which animation to play for the enemy (walking or dead).
     */
    animateEnemies() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.animateWalkingEnemies();
        } else if (this.isHit) {
            this.animateDeadEnemies();
        }
    }

    /**
     * Plays the enemy's death animation and sound.
     */
    animateDeadEnemies() {
        this.img.src = this.isSmallChicken ? this.SMALL_CHICKEN_DEAD : this.IMAGE_DEAD;
        if (!this.soundPlay) {
            if (!World.isMuted) {
                this.deadSound.play();
            }
            this.soundPlay = true;
        }
    }

    /**
     * Plays the enemy's walking animation.
     */
    animateWalkingEnemies() {
        if (this.isSmallChicken) {
            this.playAnimation(this.SMALL_CHICKEN_WALKING);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Sets the audio settings for the enemy's death sound.
     */
    audioSettings() {
        this.deadSound.volume = 0.2;
    }
}


