class Character extends MovableObject {
    height = 260
    width = 125
    y = 165
    world
    speed = 10
    energy = 100
    isJumping = false
    jumpSound = new Audio('../audio/charachterJump.mp3')
    deadSound = new Audio('../audio/characterDying.mp3')
    isHit = false


    offset = {
        'top': 120,
        'right': 40,
        'bottom': 130,
        'left': 20
    }

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ]
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ]
    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ]
    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ]


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.applyGravity()
        this.animate()
    }

    animate() {
        let moveInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive()) {
                this.moveRight()
                this.otherDirection = false
            }
            if (this.world.keyboard.LEFT && this.x > 0 && this.isAlive()) {
                this.moveLeft()
                this.otherDirection = true
            }
            if (this.world.keyboard.UP && !this.isJumping && this.isAlive()) {
                this.jump()
            }

            if (this.x === 500 && this.isAlive()) {
                let endbossIndex = this.world.level.enemies.length - 1
                let endboss = this.world.level.enemies[endbossIndex]
                endboss.animationPlaying = false
            }
            this.world.camera_x = -this.x + 100
        }, 1000 / 30);
        this.characterIntervals.push(moveInterval)

        let animationInterval = setInterval(() => {
            if (this.isHurt() && this.isAlive()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            if (this.world.keyboard.RIGHT && !this.isAboveGround() && this.isAlive() ||
                this.world.keyboard.LEFT && !this.isAboveGround() && this.isAlive()) {
                this.playAnimation(this.IMAGES_WALKING)
            }
            if (this.isDead()) {
                if (!MovableObject.charcterDead) {
                    this.currentImage = 0
                    MovableObject.charcterDead = true
                    this.deadSound.play()
                    setTimeout(() => {
                        this.gameOverSound.play()
                    }, 500)

                }
                this.playSingleDeadAnimation(this.IMAGES_DEAD)
            }
        }, 1000 / 20);
        this.characterIntervals.push(animationInterval)

        let jumpingInterval = setInterval(() => {
            if (this.isJumping === true && this.isAlive()) {
                this.playSingleJumpAnimation(this.IMAGES_JUMPING)
            }
        }, 200)
        this.characterIntervals.push(jumpingInterval)
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
        }
        else if (this.currentImage === images.length) {
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
        this.speedY = 15
        this.jumpSound.play()
        if (this.isJumping === false) {
            this.isJumping = true
        }
    }
}