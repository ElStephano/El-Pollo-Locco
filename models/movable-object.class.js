class MovableObject extends DrawableObject{
    speed = 0.15
    otherDirection = false
    speedY = 0
    accelaration = 1
    lastHit = 0


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.accelaration
            }
        }, 1000 / 25)
    }


    isAboveGround() {
        return this.y < 165
    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
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
        return this.energy == 0;
    }

    
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit
        timePassed = timePassed / 1000
        return timePassed < 1;
    }
}