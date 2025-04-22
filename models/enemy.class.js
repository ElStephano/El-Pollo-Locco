class Enemy extends MovableObject {

    height = 100
    width = 100
    y = 330
    isHit = false
    enemyAnimationInterval = null
    enemyMoveInterval = null
    isSmallChicken = false
    deadSound = new Audio('audio/dead_chicken.mp3')
    soundPlay = false


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    SMALL_CHICKEN_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };


    constructor(x) {
        super()
        this.isSmallChicken = Math.random() < 0.5
        this.x = x
        if (this.isSmallChicken) {
            this.createSmallChicken()
        } else {
            this.createLargeChicken()
        }
        this.audioSettings()
        this.animate()
    }


    createSmallChicken() {
        this.speed = 2
        this.height = 80
        this.width = 80
        this.y = 350
        this.loadImages(this.SMALL_CHICKEN_WALKING)
        this.loadImage(this.SMALL_CHICKEN_WALKING[0])
    }


    createLargeChicken() {
        this.loadImages(this.IMAGES_WALKING)
        this.loadImage(this.IMAGES_WALKING[0])
        this.speed = 3
    }


    animate() {
        this.enemyMoveInterval = setInterval(() => {
            this.enemiesMovement()
        }, 1000 / 30)
        MovableObject.enemyIntervals.push(this.enemyMoveInterval)

        this.enemyAnimationInterval = setInterval(() => {
            this.animateEnemies()
        }, 1000 / 30)
        MovableObject.enemyIntervals.push(this.enemyAnimationInterval)
    }


    enemiesMovement() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.moveLeft()
        }
    }


    animateEnemies() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.animateWalkingEnemies()
        } else if (this.isHit) {
            this.animateDeadEnemies()
        }
    }


    animateDeadEnemies() {
        this.img.src = this.isSmallChicken ? this.SMALL_CHICKEN_DEAD : this.IMAGE_DEAD
        if (!this.soundPlay) {
            if (!World.isMuted) {
                this.deadSound.play()
            }
            this.soundPlay = true
        }
    }

    animateWalkingEnemies() {
        if (this.isSmallChicken) {
            this.playAnimation(this.SMALL_CHICKEN_WALKING)
        } else {
            this.playAnimation(this.IMAGES_WALKING)
        }
    }


    audioSettings() {
        this.deadSound.volume = 0.2
    }
}
