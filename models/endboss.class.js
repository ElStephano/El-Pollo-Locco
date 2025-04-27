/**
 * Represents the final boss of the game. The Endboss can walk, get hurt, attack, and die.
 * It has multiple animation phases: Walking, Alert, Attacking, Getting Hurt, and Dying.
 */
class Endboss extends MovableObject {    
    /**
     * The height of the Endboss.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the Endboss.
     * @type {number}
     */
    width = 300;

    /**
     * The y-coordinate of the Endboss.
     * @type {number}
     */
    y = 45;

    /**
     * The energy level of the Endboss.
     * @type {number}
     */
    energy = 100;

    /**
     * The index of the current animation frame of the Endboss.
     * @type {number}
     */
    currentEndbossImage = 0;

    /**
     * Indicates whether the Endboss has changed direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Indicates whether the Endboss has been hit.
     * @type {boolean}
     */
    isHit = false;

    /**
     * The main interval for the Endboss animation.
     * @type {number | null}
     */
    mainInterval = null;

    /**
     * The current animation interval of the Endboss.
     * @type {number | null}
     */
    currentAnimationInterval = null;

    /**
     * The current animation function of the Endboss.
     * @type {Function | null}
     */
    currentAnimation = null;

    /**
     * The interval to check the Endboss's status.
     * @type {number | null}
     */
    checkInterval = null;

    /**
     * The interval for the Y-offset when the Endboss is dead.
     * @type {number | null}
     */
    deadIntervalY = null;

    /**
     * The walking animation interval of the Endboss.
     * @type {number | null}
     */
    walkingInterval = null;

   /**
     * The interval for the hurt animation of the Endboss.
     * @type {number | null}
     */
    isHurtInterval = null;

    /**
     * The images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * The images for the alert animation.
     * @type {Array<string>}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * The images for the death animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * The images for the hurt animation.
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * The images for the attack animation.
     * @type {Array<string>}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Offset values for collision detection.
     * @type {Object}
     */
    offset = {
        'top': 80,
        'right': 40,
        'bottom': 100,
        'left': 20,
    };

    /**
     * Creates an instance of the Endboss.
     * The Endboss is initially placed at a specific position with a specific speed.
     * @constructor
     */
    constructor() {
        super();
        this.loadAllImages();
        this.x = 3000;
        this.speed = 20;
        this.checkStatsInterval();
    }

    /**
     * Loads all images for the Endboss animations.
     */
    loadAllImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Starts the alert animation for the Endboss.
     */
    animateEndboss() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_ALERT, i);
            if (this.isHit) {
                clearInterval(this.currentAnimationInterval);
                this.interruptForHurt();
                return;
            }
            i++;
            this.endAlertAnimation(i);
        }, 300);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Starts the walking animation for the Endboss.
     */
    startWalkingAnimation() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_WALKING, i);
            this.x -= this.speed;
            if (this.isHit) {
                clearInterval(this.currentAnimationInterval);
                this.interruptForHurt();
                return;
            }
            i++;
            this.endWalkingAnimation(i);
        }, 70);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Starts the attack animation for the Endboss.
     */
    startAttackAnimation() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();
        this.currentAnimationInterval = setInterval(() => {
            if (this.shouldStopAttackAnimation(i)) return;
            this.playAnimationEndboss(this.IMAGES_ATTACK, i);
            this.endbossWalkingMovement(i);
            this.endbossAttackSound(i);
            i++;
        }, 1000 / 7);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Checks if the attack animation should stop.
     * @param {number} i - The current animation frame index.
     * @returns {boolean} - Whether the animation should stop.
     */
    shouldStopAttackAnimation(i) {
        if (i === this.IMAGES_ATTACK.length) {
            clearInterval(this.currentAnimationInterval);
            this.animateEndboss();
            return true;
        }
        if (this.isHit) {
            clearInterval(this.currentAnimationInterval);
            this.interruptForHurt();
            return true;
        }
        return false;
    }

    /**
     * Moves the Endboss during an attack.
     * @param {number} i - The current animation frame index.
     */
    endbossWalkingMovement(i) {
        if (i > 3 && i < 7) {
            this.x += this.otherDirection ? 100 : -100;
        }
    }

    /**
     * Plays the Endboss attack sound.
     * @param {number} i - The current animation frame index.
     */
    endbossAttackSound(i) {
        if (i === 3) {
            if (!World.isMuted) {
                this.endbossJumpSound.play();
            }
        }
    }

    /**
     * Interrupts the Endboss animation if hit.
     */
    interruptForHurt() {
        this.isHit = false;
        let i = 0;
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_HURT, i);
            i++;
            if (i === this.IMAGES_HURT.length) {
                this.returnToAnimation();
            }
        }, 120);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Returns the Endboss to its normal animation after being hurt.
     */
    returnToAnimation() {
        clearInterval(this.currentAnimationInterval);
        if (this.currentAnimation) {
            this.currentAnimation();
        }
    }

    /**
     * Regularly checks the status of the Endboss and triggers animations or direction changes.
     */
    checkStatsInterval() {
        this.checkInterval = setInterval(() => {
            this.switchDirection();
            this.endbossIsDead();
            this.startEndbossAnimations();
        }, 1000 / 10);
        MovableObject.endbossIntervals.push(this.checkInterval);
    }

    /**
     * Checks if the Endboss has died.
     */
    endbossIsDead() {
        if (this.energy <= 0) {
            this.endOfGame();
            let i = 0;
            this.currentAnimationInterval = setInterval(() => {
                if (i < this.IMAGES_DEAD.length) {
                    this.animateDead(i);
                    i++;
                } else {
                    this.finalStats();
                }
            }, 100);
            MovableObject.endbossIntervals.push(this.currentAnimationInterval);
        }
    }

    /**
     * Executes the death animation of the Endboss.
     * @param {number} i - The current death animation frame index.
     */
    animateDead(i) {
        this.playAnimationEndboss(this.IMAGES_DEAD, i);
        this.endbossDeadSpeedY();
    }

    /**
     * Displays final stats after the Endboss dies and ends the game.
     */
    finalStats() {
        setTimeout(() => {
            this.showStats();
            clearInterval(this.currentAnimationInterval);
            Character.endbossIsAnimate = false;
        }, 500);
    }

    /**
     * Ends the game and stops all Endboss animations.
     */
    endOfGame() {
        MovableObject.endbossDead = true;
        this.stopAllIntervals();
        this.hideTouch();
        if (!World.isMuted) {
            this.endbossDying.play();
        }
        World.killedEnemies += 1;
    }

    /**
     * Ends the alert animation after all frames have played.
     * @param {number} i - The current alert animation frame index.
     */
    endAlertAnimation(i) {
        if (i >= this.IMAGES_ALERT.length) {
            clearInterval(this.currentAnimationInterval);
            this.startWalkingAnimation();
        }
    }

    /**
     * Ends the walking animation after all frames have played.
     * @param {number} i - The current walking animation frame index.
     */
    endWalkingAnimation(i) {
        if (i >= 20) {
            clearInterval(this.currentAnimationInterval);
            this.startAttackAnimation();
        }
    }

    /**
     * Plays a specific animation frame of the Endboss.
     * @param {Array<string>} images - The list of animation images.
     * @param {number} index - The index of the current frame.
     */
    playAnimationEndboss(images, index) {
        let path = images[index % images.length];
        this.img = this.imageCache[path];
    }

    /**
     * Changes the direction of the Endboss when it reaches a certain position.
     */
     switchDirection() {
        if (this.x < Character.currentX) {
            this.endbossOtherDirection(-15, true);
        } else if (this.x > Character.currentX) {
            this.endbossOtherDirection(15, false);
        }
    }

    /**
     * Sets the speed and direction of the Endboss.
     * @param {number} i - The speed.
     * @param {boolean} direction - The direction (true = right, false = left).
     */
    endbossOtherDirection(i, direction) {
        this.otherDirection = direction;
        this.speed = i;
    }

    /**
     * Simulates the fall of the Endboss by changing its Y-position when dead.
     */
    endbossDeadSpeedY() {
        setTimeout(() => {
            this.deadIntervalY = setInterval(() => {
                this.y += 10;
            }, 1000 / 30);
            setTimeout(() => {
                clearInterval(this.deadIntervalY);
            }, 2000);
        }, 300);
        MovableObject.endbossIntervals.push(this.deadIntervalY);
    }
    /**
     * Starts all Endboss animations when the game begins.
     */
    startEndbossAnimations() {
        if (Character.endbossStart && !Character.endbossIsAnimate) {
            this.animateEndboss();
            Character.endbossStart = false;
            Character.endbossIsAnimate = true;
        }
    }
}