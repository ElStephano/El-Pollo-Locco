class ThrowableObject extends MovableObject {


    isHit = false


    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTLE_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    }


    constructor(x, y) {
        super()
        this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
        this.loadImages(this.IMAGES_BOTTLE_THROW)
        this.loadImages(this.IMAGES_BOTTLE_HIT)
        this.x = x
        this.y = y
        this.width = 70
        this.height = 70
        this.throwInterval = null
        this.animationInterval = null
        this.gravityInterval = null
        // this.hitAnimationInterval = null
        this.throw(x, y + 120)
    }


    throw(x, y) {
        this.x = x
        this.y = y
        this.speedY = 10
        this.speedX = 12
        this.applyGravity()
        this.throwInterval = setInterval(() => {
            this.x += 25
        }, 50)
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROW)
        }, 1000 / 20)
    }


    bottleHit(x, y) {
            this.isHit = true
            this.x = x
            this.y = y
            this.speedX = 0
            this.speedY = 0

            clearInterval(this.throwInterval)
            clearInterval(this.animationInterval)
            clearInterval(this.gravityInterval)
            this.playHitAnimation()
    } 
    

    playHitAnimation() {
        let frameCount = 0;
        let maxFrames = this.IMAGES_BOTTLE_HIT.length;
        let hitAnimationInterval = setInterval(() => 
            this.updateHitAnimation(hitAnimationInterval, frameCount++, maxFrames), 250);
    }
    

    updateHitAnimation(interval, frameCount, maxFrames) {
        this.playAnimation(this.IMAGES_BOTTLE_HIT);
        if (frameCount >= maxFrames) {
            this.removeAfterAnimation(interval);
        }
    }
    

    removeAfterAnimation(interval) {
        clearInterval(interval);
        let index = world.throwableObjects.indexOf(this);
        if (index !== -1) {
            world.throwableObjects.splice(index, 1)
            this.imageCache = 0
        }
    }
    
}