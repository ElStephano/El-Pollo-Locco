class Character extends MovableObject {
    height = 260
    width = 125
    y = 160
    world
    speed = 10
    energy = 10
    isJumping = false
    jumpSound = new Audio('audio/charachterJump.mp3')
    deadSound = new Audio('audio/characterDying.mp3')
    isHit = false
    static endbossStart = false
    static endbossIsAnimate = false
    lastKeyPressTime = Date.now()
    idleInterval = null
    longIdleInterval = null


    offset = {
        'top': 120,
        'right': 40,
        'bottom': 130,
        'left': 20
    }


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

    animate() {
        let moveInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive()) {
                this.moveRight()
                this.otherDirection = false
                this.resetInactivityTimer()
            }
            if (this.world.keyboard.LEFT && this.x > 0 && this.isAlive()) {
                this.moveLeft()
                this.otherDirection = true
                this.resetInactivityTimer()
            }
            if (this.world.keyboard.UP && !this.isJumping && this.isAlive()) {
                this.jump()
                this.resetInactivityTimer()
            }

            if (this.x === 500 && this.isAlive()) {
                let endbossIndex = this.world.level.enemies.length - 1
                let endboss = this.world.level.enemies[endbossIndex]
                endboss.animationPlaying = false
            }
            this.world.camera_x = -this.x + 100
        }, 1000 / 30);
        MovableObject.characterIntervals.push(moveInterval)

        let animationInterval = setInterval(() => {
            if (this.isHurt() && this.isAlive()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            if (this.world.keyboard.RIGHT && !this.isAboveGround() && this.isAlive() ||
                this.world.keyboard.LEFT && !this.isAboveGround() && this.isAlive()) {
                this.playAnimation(this.IMAGES_WALKING)
            }
            if (this.isDead()) {
                if (!MovableObject.characterDead && this.isDead()) {
                    this.currentImage = 0
                    MovableObject.characterDead = true
                    this.deadSound.play()
                    setTimeout(() => {
                        this.gameOverSound.play()
                    }, 500)
                }
                this.playSingleDeadAnimation(this.IMAGES_DEAD)
                setTimeout(() => {
                    this.stopAllIntervals()
                    this.resetVariables()
                }, 3000)
            }
            this.startEndboss()
        }, 1000 / 20);
        MovableObject.characterIntervals.push(animationInterval)

        let jumpingInterval = setInterval(() => {
            if (this.isJumping === true && this.isAlive()) {
                this.playSingleJumpAnimation(this.IMAGES_JUMPING)
            }
        }, 1000 / 10)
        MovableObject.characterIntervals.push(jumpingInterval)
    }


    resetInactivityTimer() {
        this.lastKeyPressTime = Date.now();
        // Falls eine Idle-Animation läuft, stoppen
        if (this.idleInterval) {
            clearInterval(this.idleInterval);
            clearInterval(this.longIdleInterval);
            this.idleInterval = null;
            this.longIdleInterval = null;

        }
        this.isIdle = false; // Setzt den Idle-Status zurück
        this.isLongIdle = false
    }


    checkInactivity() {
        let idleInterval = setInterval(() => {
            let currentTime = Date.now();
            if (currentTime - this.lastKeyPressTime > 100 && !this.isIdle &&
                !this.isLongIdle) { // 10 Sek. Inaktiv?
                this.playIdleAnimation(this.IMAGES_IDLE);
            } else if (currentTime - this.lastKeyPressTime > 7000) {
                if (!this.isLongIdle) {
                    clearInterval(this.idleInterval)
                    this.playLongIdleAnimation(this.IMAGES_LONG_IDLE)
                }
            }
        }, 1000 / 20);
        MovableObject.characterIntervals.push(idleInterval)
    }


    playIdleAnimation(obj) {
        if (!this.isIdle) {
            this.isIdle = true;
            this.idleInterval = setInterval(() => {
                this.playAnimation(obj);
            }, 1000 / 10); // Animation abspielen mit 10 FPS
            MovableObject.characterIntervals.push(this.idleInterval)
        }
    }


    playLongIdleAnimation(obj) {
        if (this.isIdle) {
            this.isIdle = false
            this.isLongIdle = true
            this.longIdleInterval = setInterval(() => {
                this.playAnimation(obj);
            }, 1000 / 5); // Animation abspielen mit 10 FPS
            MovableObject.characterIntervals.push(this.longIdleInterval)
        }
    }


    playSingleJumpAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
        } else if (!this.isAboveGround()) {
            this.resetJumpAnimation()
        }
    }


    playSingleDeadAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
            this.y += 30
        } else {
            this.currentImage = 0
            this.gameOverScreen()
        }
    }


    singleRunFrames(images) {
        let path = images[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    resetJumpAnimation() {
        this.isJumping = false
        this.currentImage = 0
    }


    jump() {
        this.speedY = 30
        this.jumpSound.play()
        if (!this.isJumping) {
            this.isJumping = true
            this.currentImage = 0
        }
    }


    resetVariables() {
        MovableObject.endbossIntervals = [];
        MovableObject.characterIntervals = [];
        MovableObject.enemyIntervals = [];
        MovableObject.endbossDead = false;
        MovableObject.characterDead = false;
        Character.endbossStart = false
        Character.endbossIsAnimate = false
    }


    startEndboss() {
        if(this.x > 2000) {
            if(!Character.endbossStart)
            Character.endbossStart = true
        }
    }
}
