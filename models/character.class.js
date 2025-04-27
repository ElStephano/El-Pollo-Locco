/**
 * The `Character` class represents the playable character in the game.
 * It inherits from `MovableObject` and controls movement, animation, interactions, and game states.
 */
class Character extends MovableObject {

    /** Height of the character in pixels. */
    height = 260;

    /** Width of the character in pixels. */
    width = 125;

    /** Y position of the character. */
    y = 150;

    /** Reference to the game world. */
    world;

    /** Movement speed. */
    speed = 10;

    /** Character's health. */
    energy = 100;

    /** Indicates if the character is currently jumping. */
    isJumping = false;

    /** Sound effect for jumping. */
    jumpSound = new Audio('audio/charachterJump.mp3');

    /** Sound effect for death. */
    deadSound = new Audio('audio/characterDying.mp3');

    /** Sound effect for long inactivity. */
    snoring = new Audio('audio/snoring.mp3');

    /** Indicates if the character has been hit. */
    isHit = false;

    /** Controls if the final boss has been activated. */
    static endbossStart = false;

    /** Indicates if the final boss animation is running. */
    static endbossIsAnimate = false;

    /** Last key press time for detecting inactivity. */
    lastKeyPressTime = Date.now();

    /** Interval for idle animation. */
    idleInterval = null;

    /** Interval for long idle animation. */
    longIdleInterval = null;

    /** Indicates if the character is currently snoring. */
    isSnoring = false;

    /** Flag for displaying the game over screen. */
    showGameOverScreen = false;

    /** Whether the hurt animation is currently running. */
    isHurtAnimating = false;




    static currentX;





    /** Offset for collision detection. */
    offset = {
        'top': 120,
        'right': 60,
        'bottom': 130,
        'left': 20
    };

    /** Image paths for idle, jump, hurt, death animations, etc. */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]



    /**
     * Constructor loads all images and initializes physics, animations, and inactivity check.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.applyGravity()
        this.checkInactivity()
        this.animate()
    }

    /**
     * Starts all movement and animation intervals of the character.
     */
    animate() {
        let moveInterval = setInterval(() => {
            this.movement()
        }, 1000 / 30);
        MovableObject.characterIntervals.push(moveInterval)

        let animationInterval = setInterval(() => {
            this.animateCharacter()
        }, 1000 / 20);
        MovableObject.characterIntervals.push(animationInterval)

        let jumpingInterval = setInterval(() => {
            this.jumpingAnimation()
        }, 1000 / 10)
        MovableObject.characterIntervals.push(jumpingInterval)
    }

    /**
     * Processes movement logic based on keyboard inputs and game logic.
     */
    movement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive()) {
            this.movementRight()
        }
        if (this.world.keyboard.LEFT && this.x > 0 && this.isAlive()) {
            this.movementLeft()
        }
        if (this.world.keyboard.UP && !this.isJumping && this.isAlive()) {
            this.movementJump()
        }
        if (this.x === 500 && this.isAlive()) {
            this.activateEndboss()
        }
        Character.currentX = this.x
        this.world.camera_x = -this.x + 100
    }

    /**
     * Executes jump animation when the character jumps.
     */
    jumpingAnimation() {
        if (this.isJumping && this.isAlive() && !this.isHurtAnimating) {
            this.playSingleJumpAnimation(this.IMAGES_JUMPING)
        }
    }

    /**
     * Executes movement to the right.
     */
    movementRight() {
        this.moveRight()
        this.otherDirection = false
        this.resetInactivityTimer()
    }

    /**
     * Executes movement to the left.
     */
    movementLeft() {
        this.moveLeft()
        this.otherDirection = true
        this.resetInactivityTimer()
    }

    /**
     * Executes jump movement.
     */
    movementJump() {
        this.jump()
        this.resetInactivityTimer()
    }

    /**
     * Activates the final boss once the player reaches a specific X position.
     */
    activateEndboss() {
        let endbossIndex = this.world.level.enemies.length - 1
        let endboss = this.world.level.enemies[endbossIndex]
        endboss.animationPlaying = false
    }


    /**
     * Controls the running animation based on the character's state.
     */
    animateCharacter() {
        if (this.isHurt() && this.isAlive() && !this.isHurtAnimating) {
            this.hurtAnimation()
        }
        if (this.walking()) {
            this.playAnimation(this.IMAGES_WALKING)
        }
        if (this.isDead()) {
            this.gameOver()
        }
        this.startEndboss()
    }

    /**
     * Executes the game-over process.
     */
    gameOver() {
        if (!MovableObject.characterDead && this.isDead()) {
            this.deactivateControl()
        }
        this.playSingleDeadAnimation(this.IMAGES_DEAD)
        setTimeout(() => {
            this.stopAllIntervals()
            this.resetVariables()
        }, 3000)
    }

    /**
     * Deactivates control and plays death sound.
     */
    deactivateControl() {
        this.currentImage = 0
        MovableObject.characterDead = true
        this.hideTouch()
        if (!World.isMuted) {
            this.deadSound.play()
        }
        setTimeout(() => {
            if (!World.isMuted) {
                this.gameOverSound.play()
            }
        }, 500)
    }

    /**
     * Checks if the character is walking.
     * @returns {boolean}
     */
    walking() {
        return this.world.keyboard.RIGHT && !this.isAboveGround() && this.isAlive() && !this.isHurtAnimating ||
            this.world.keyboard.LEFT && !this.isAboveGround() && this.isAlive() && !this.isHurtAnimating
    }

    /**
     * Executes hurt animation when the character is hit.
     */
    hurtAnimation() {
        this.isHurtAnimating = true
        this.currentImage = 0
        let hurtDuration = 1000
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT)
        }, 1000 / 10)
        MovableObject.characterIntervals.push(hurtInterval)

        setTimeout(() => {
            clearInterval(hurtInterval)
            this.isHurtAnimating = false
        }, hurtDuration)
    }

    /**
     * Resets the inactivity timer.
     */
    resetInactivityTimer() {
        this.lastKeyPressTime = Date.now()
        if (this.idleInterval) {
            clearInterval(this.idleInterval)
            clearInterval(this.longIdleInterval)
            this.idleInterval = null
            this.longIdleInterval = null
        }
        this.isIdle = false
        this.isLongIdle = false
        this.resetSnoring()
    }

    /**
     * Starts monitoring inactivity (for idle animations).
     */
    checkInactivity() {
        let idleInterval = setInterval(() => {
            this.resetSnoring()
            let currentTime = Date.now()
            if (currentTime - this.lastKeyPressTime > 100 && !this.isIdle && !this.isLongIdle) {
                this.playIdleAnimation(this.IMAGES_IDLE)
            } else if (currentTime - this.lastKeyPressTime > 7000) {
                if (!this.isLongIdle) {
                    clearInterval(this.idleInterval)
                    this.playLongIdleAnimation(this.IMAGES_LONG_IDLE)
                }
            }
        }, 1000 / 20);
        MovableObject.characterIntervals.push(idleInterval)
    }

    /**
     * Stops the snoring.
     */
    resetSnoring() {
        if (!this.isLongIdle || this.isDead() || World.isMuted) {
            this.snoring.pause()
            this.snoring.currentTime = 0
        }
    }

    /**
     * Starts idle animation on short inactivity.
     * @param {Array<string>} obj - Image paths
     */
    playIdleAnimation(obj) {
        if (!this.isIdle) {
            this.isIdle = true
            this.idleInterval = setInterval(() => {
                this.playAnimation(obj)
            }, 1000 / 10)
            MovableObject.characterIntervals.push(this.idleInterval)
        }
    }

    /**
     * Starts long-idle animation on extended inactivity.
     * @param {Array<string>} obj - Image paths
     */
    playLongIdleAnimation(obj) {
        if (this.isIdle) {
            this.isIdle = false
            this.isLongIdle = true
            if (!World.isMuted) {
                this.snoring.play()
                this.snoring.loop = true
            }
            this.longIdleInterval = setInterval(() => {
                this.playAnimation(obj)
            }, 1000 / 5)
            MovableObject.characterIntervals.push(this.longIdleInterval)
        }
    }


      /**
     * Plays a simple jump animation.
     * @param {Array<string>} images - Image paths
     */
      playSingleJumpAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
        } else if (!this.isAboveGround()) {
            this.resetJumpAnimation()
        }
    }

    /**
     * Plays death animation and shows game over screen.
     * @param {Array<string>} images - Image paths
     */
    playSingleDeadAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
            this.y += 30
        } else {
            this.currentImage = 0
            if (!this.showGameOverScreen) {
                this.gameOverScreen()
                this.showGameOverScreen = true
            }
        }
    }

    /**
     * Cycles through image frames.
     * @param {Array<string>} images - Image paths
     */
    singleRunFrames(images) {
        let path = images[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    /**
     * Resets jump animation.
     */
    resetJumpAnimation() {
        this.isJumping = false
        this.currentImage = 0
        this.y = 165
    }

    /**
     * Triggers the jump.
     */
    jump() {
        this.speedY = 30
        if (!World.isMuted) {
            this.jumpSound.play()
        }
        if (!this.isJumping) {
            this.isJumping = true
            this.currentImage = 0
        }
    }

    /**
     * Resets global game variables (for restart).
     */
    resetVariables() {
        MovableObject.endbossIntervals = [];
        MovableObject.characterIntervals = [];
        MovableObject.enemyIntervals = [];
        MovableObject.endbossDead = false;
        MovableObject.characterDead = false;
        Character.endbossStart = false
        Character.endbossIsAnimate = false
    }

    /**
     * Starts endboss mechanics when the player has run far enough.
     */
    startEndboss() {
        if (this.x > 2500) {
            if (!Character.endbossStart)
                Character.endbossStart = true
        }
    }
}
