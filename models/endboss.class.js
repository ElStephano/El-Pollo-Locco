class Endboss extends MovableObject {
    height = 400
    width = 300
    y = 40
    energy = 100
    currentEndbossImage = 0
    deadAnimation = false
    hasDied = false
    isWalking = false
    isAlert = true
    alertAnimation = false
    startAttack = false
    stopAttack = true



    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    offset = {
        'top': 80,
        'right': 40,
        'bottom': 100,
        'left': 20
    }


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_ATTACK)
        this.x = 2000
        this.checkAnimation()
        this.applyGravity()
        this.deadAnimationInterval()
        this.walkingAnimationInterval()
        this.alertAnimationInterval()
        this.attackAnimationInterval()
        this.speed = 5
    }


    checkAnimation() {
        setInterval(() => {
            if (this.startEndboss && this.isAlive() && this.isAlert && !MovableObject.charcterDead) {
                this.endbossStart()
            }
            if (this.isWalking && this.isAlive() && this.x === 1800 && !MovableObject.charcterDead) {
                this.finishWalking()
            }
            if (this.x <= 1800) {
                this.attack()
            }
            if (this.energy === 0 && !this.deadAnimation) {
                this.deathAnimation()
            }
        }, 1000 / 10)
    }


    endbossStart() {
        this.alertAnimation = true
        setTimeout(() => {
            this.alertAnimation = false
            this.isAlert = false
            this.startEndboss = false
            this.isWalking = true
        }, 1250)
    }


    finishWalking() {
        this.isWalking = false
        this.currentEndbossImage = 0
    }


    attack() {
        this.startAttack = true
        if (this.isWalking) {
            this.isWalking = false
            this.currentEndbossImage = 0
        }
    }


    deathAnimation() {
        this.stopAllAnimation()
        this.currentEndbossImage = 0
        this.deadAnimation = true
        this.hasDied = true
    }


    stopAllAnimation() {
        if (this.isWalking) {
            this.isWalking = false
        }
        if (this.alertAnimation) {
            this.alertAnimation = false
            this.isAlert = false
        }
        if (this.stopAttack) {
            this.stopAttack = false
            this.startAttack = false
        }
    }


    attackAnimationInterval() {
        let attackAnimationInterval = setInterval(() => {
            if (this.stopAttack && this.startAttack &&
                this.currentEndbossImage < this.IMAGES_ATTACK.length && !MovableObject.charcterDead) {
                this.singleRunImages(this.IMAGES_ATTACK)
            } else if (this.currentEndbossImage === this.IMAGES_ATTACK.length && !this.stopAttack) {
                this.stopAttack = true
            }
        }, 250)
        this.endbossIntervals.push(attackAnimationInterval)
    }


    alertAnimationInterval() {
        let alertAnimationInterval = setInterval(() => {
            if (this.alertAnimation && this.isAlert && this.currentEndbossImage < this.IMAGES_ALERT.length &&
                !MovableObject.charcterDead) {
                this.singleRunImages(this.IMAGES_ALERT)
            } else if (this.currentEndbossImage >= this.IMAGES_ALERT.length) {
                this.isAlert = false
                this.alertAnimation = false
                clearInterval(alertAnimationInterval)
            }

        }, 250)

        this.endbossIntervals.push(alertAnimationInterval)
    }


    deadAnimationInterval() {
        let deadAnimationInterval =
            setInterval(() => {
                if (this.deadAnimation && this.hasDied
                    && this.currentEndbossImage < this.IMAGES_DEAD.length
                     && !MovableObject.charcterDead) {
                    this.runDeadAnimation()
                }
                if (this.currentEndbossImage >= this.IMAGES_DEAD.length && this.hasDied) {
                    this.endDeadAnimation()
                }
            }, 250)
        this.endbossIntervals.push(deadAnimationInterval)
    }


    runDeadAnimation() {
        this.playSingleRunAnimation(this.IMAGES_DEAD)
        this.y -= 20
    }


    endDeadAnimation() {
        this.hasDied = false
        this.currentEndbossImage = 0
    }


    walkingAnimationInterval() {
        let walkingAnimationInterval = setInterval(() => {
            if (this.isWalking  && !MovableObject.charcterDead) {
                this.walkingAnimation()
            }
        }, 200)
        this.endbossIntervals.push(walkingAnimationInterval)
    }


    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= this.speed;
    }


    playSingleRunAnimation(images) {
        if (this.currentEndbossImage < images.length) {
            this.singleRunImages(images)
        }
    }


    singleRunImages(images) {
        let path = images[this.currentEndbossImage]
        this.img = this.imageCache[path]
        this.currentEndbossImage++
    }
}