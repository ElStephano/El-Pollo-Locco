class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false
    speedY = 0
    accelaration = 1
    lastHit = 0
    gravityInterval = 0
    currentJumpingImage = 0
    isJumping = false
    endbossIntervals = []
    characterIntervals = []
    enemyIntervals = []
    startEndboss = false
    isEndbossWalking = false
    singleRunAnimation = false
    static charcterDead = false


    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.accelaration
            }
        }, 1000 / 25)
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else if (this instanceof Character) {
            return this.y < 165
        } else {
            return this.y < 40
        }
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.left > mo.x + mo.offset.left &&      // enemy = mo
            this.y + this.height - 10 > mo.y + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height + this.offset.top
    }


    moveRight() {
        this.x += this.speed
    }


    moveLeft() {
        this.x -= this.speed
    }


    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
        }
    }


    isDead() {
        return this.energy === 0;
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit
        timePassed = timePassed / 1000
        return timePassed < 1;
    }


    isAlive() {
        return this.energy > 0
    }


    stopAllEndbossIntervals() {
        this.endbossIntervals.forEach(interval => clearInterval(interval))
    }


    stopAllCharacterIntervals() {
        this.characterIntervals.forEach(interval => clearInterval(interval))
    }


    stopAllEnemyIntervals() {
        this.enemyIntervals.forEach(interval => clearInterval(interval))
    }
}