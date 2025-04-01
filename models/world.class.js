class World {
    character = new Character();
    level = level1
    ctx
    canvas
    keyboard
    camera_x = 0
    throwableObjects = []
    throwCooldown = 800
    lastThrowTime = 0
    throwSound = new Audio('audio/throwBottle.mp3')
    bottleHitSound = new Audio('audio/bottleHit.mp3')
    checkInterval= null



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.draw()
        this.setWorld()
        this.run()
    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        this.checkInterval = setInterval(() => {
            this.checkThrowableObjects()
            this.checkCollisions()
            this.checkCollectibleObjects()
            this.checkCollisionBottles()
            this.checkCollisionAboveGround()
            if(MovableObject.characterDead) {
                setTimeout(()=>{                    
                    clearInterval(this.checkInterval)
                },500)
            }
        }, 1000 / 30)
    }


    checkCollisionBottles() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss)
        this.throwableObjects.forEach((throwable) => {
            this.level.enemies.forEach((enemy) => {
                if (throwable.y > 380 && !throwable.isHit) {
                    this.bottleHitSound.play()
                    throwable.bottleHit(throwable.x, throwable.y)
                    throwable.isHit = true
                }
                if (throwable.isColliding(enemy) && !enemy.isHit) {
                    this.isCollidingEnemy(enemy, throwable)
                    enemy.isHit = true
                    this.bottleHitSound.play()
                }
                if (throwable.isColliding(endboss) && !endboss.isHit) {
                    this.isCollidingEndboss(throwable, endboss)
                    endboss.isHit = true
                    this.bottleHitSound.play()
                    setTimeout(() => {
                        endboss.isHit = false
                    }, 2000)
                }
            })
        })
    }


    isCollidingEndboss(throwable, endboss) {
        if (!throwable.isHit) {
            const bottleIndex = this.throwableObjects.indexOf(throwable)
            if (bottleIndex !== -1 && endboss.energy > 0) {
                this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y)
                endboss.energy -= 20
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1)
                }, (this.throwableObjects[bottleIndex].IMAGES_BOTTLE_HIT.length) * 250)
            }
        }
    }


    isCollidingEnemy(enemy, throwable) {
        if (enemy instanceof Enemy) {
            const index = this.level.enemies.indexOf(enemy)
            const bottleIndex = this.throwableObjects.indexOf(throwable)
            if (index !== -1 && bottleIndex !== -1 && !enemy.isHit) {
                enemy.isHit = true
                setTimeout(() => {
                    this.level.enemies.splice(index, 1)
                }, 2000)
                this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y)
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1)
                }, 1000)
            }
        }
    }


    checkCollectibleObjects() {
        this.level.collectibleObject.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                if (collectible instanceof CollectibleBottles && this.level.bottleStatusBar.bottleAmount <= 9) {
                    this.level.bottleStatusBar.setBottleAmount(this.level.bottleStatusBar.bottleAmount + 1)
                    this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1)
                } else if (collectible instanceof Coins) {
                    this.level.coinStatusBar.setCoins(this.level.coinStatusBar.coinAmount + 1)
                    this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1)
                }
            }
        })
    }


    checkThrowableObjects() {
        let now = Date.now()
        if (this.keyboard.SPACE && now - this.lastThrowTime > this.throwCooldown) {
            if (this.level.bottleStatusBar.bottleAmount > 0) {
                let bottle = new ThrowableObject(this.character.x, this.character.y)
                this.throwSound.play()
                this.lastThrowTime = now
                this.throwableObjects.push(bottle)
                this.level.bottleStatusBar.bottleAmount = this.level.bottleStatusBar.bottleAmount - 1
                this.level.bottleStatusBar.setBottleAmount(this.level.bottleStatusBar.bottleAmount)
            }
        }
    }


    checkCollisions() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss)
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isHit && enemy instanceof Enemy &&
                !this.character.isAboveGround()) {
                this.character.hit()
                this.level.healthStatusBar.setPercentage(this.character.energy)
            } else if (this.character.isColliding(endboss) && endboss.energy > 0) {
                this.character.hit()
                this.level.healthStatusBar.setPercentage(this.character.energy)
            }
        })
    }


    checkCollisionAboveGround() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isHit && this.character.isAboveGround()
                && enemy instanceof Enemy) {
                enemy.isHit = true
                this.character.jump()
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
                }, 2000)
            }
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.level.healthStatusBar)
        this.addToMap(this.level.bottleStatusBar)
        this.addToMap(this.level.coinStatusBar)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.collectibleObject)

        this.addObjectsToMap(this.throwableObjects)

        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)

        if (this.gameOverScreen) {
            this.addToMap(this.gameOverScreen) // Game Over anzeigen
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)
        mo.drawInnerFrame(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }


    flipImage(mo) {
        this.ctx.save()
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }


    flipImageBack(mo) {
        this.ctx.restore()
        mo.x = mo.x * -1
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }
}