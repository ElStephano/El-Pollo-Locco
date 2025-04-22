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
    collectCoinSound = new Audio('audio/collectCoin.mp3')
    collectBottleSound = new Audio('audio/collectBottle.mp3')
    checkInterval = null
    static killedEnemies = 0
    static collectedCoins = 0
    static collectedBottles = 0
    backgroundMusic = new Audio('audio/Menu.mp3');
    static isMuted = true


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.getIsMutedFromLocalStorage()
        this.updateMuteIcon()
        this.setMusic()
        this.draw()
        this.setWorld()
        this.run()
        this.waitForFirstUserInteraction()
    }


    setWorld() {
        this.character.world = this;
    }


    setMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.muted = World.isMuted;
    }


    run() {
        this.checkInterval = setInterval(() => {
            this.checkThrowableObjects()
            this.checkCollisions()
            this.checkCollectibleObjects()
            this.checkCollisionBottles()
            this.checkCollisionAboveGround()
            if (MovableObject.characterDead) {
                setTimeout(() => {
                    clearInterval(this.checkInterval)
                }, 500)
            }
        }, 1000 / 30)
    }


    checkCollisionBottles() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss)
        this.throwableObjects.forEach((throwable) => {
            this.level.enemies.forEach((enemy) => {
                this.checkObjects(throwable, enemy, endboss)
            })
        })
    }


    checkObjects(throwable, enemy, endboss) {
        if (throwable.y > 380 && !throwable.isHit) {
            this.bottleOnGround(throwable)
        }
        if (throwable.isColliding(enemy) && !enemy.isHit && !(enemy instanceof Endboss)
            && !throwable.isHit) {
            this.bottleOnEnemy(throwable, enemy)
        }
        if (throwable.isColliding(endboss) && !endboss.isHit && !throwable.isHit) {
            this.bottleOnEndboss(endboss, throwable)
        }
    }


    bottleOnGround(throwable) {
        if (!World.isMuted) {
            this.bottleHitSound.play()
        }
        throwable.bottleHit(throwable.x, throwable.y)
    }


    bottleOnEnemy(throwable, enemy) {
        this.isCollidingEnemy(enemy, throwable)
        enemy.isHit = true
        if (!World.isMuted) {
            this.bottleHitSound.play()
        }
    }


    bottleOnEndboss(endboss, throwable) {
        this.isCollidingEndboss(throwable, endboss)
        endboss.isHit = true
        if (!World.isMuted) {
            this.bottleHitSound.play()
        }
        throwable.isHit = true
        setTimeout(() => {
            endboss.isHit = false
        }, 500)
    }


    isCollidingEndboss(throwable, endboss) {
        if (!throwable.isHit) {
            const bottleIndex = this.throwableObjects.indexOf(throwable)
            if (bottleIndex !== -1 && endboss.energy >= 0 && !throwable.isHit) {
                this.endbossHitByBottle(bottleIndex, throwable, endboss)
            }
        }
    }


    endbossHitByBottle(bottleIndex, throwable, endboss) {
        this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y)
        endboss.energy -= 20
        this.level.statusbarHealthEndboss.percentage -= 20
        this.level.statusbarHealthEndboss.setPercentage(this.level.statusbarHealthEndboss.percentage)
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1)
        }, (this.throwableObjects[bottleIndex].IMAGES_BOTTLE_HIT.length) * 250)
    }


    isCollidingEnemy(enemy, throwable) {
        if (enemy instanceof Enemy) {
            const index = this.level.enemies.indexOf(enemy)
            const bottleIndex = this.throwableObjects.indexOf(throwable)
            if (index !== -1 && bottleIndex !== -1 && !enemy.isHit) {
                this.enemyHitByBottle(enemy, bottleIndex, throwable, index)
            }
        }
    }


    enemyHitByBottle(enemy, bottleIndex, throwable, index) {
        enemy.isHit = true
        World.killedEnemies += 1
        setTimeout(() => {
            this.level.enemies.splice(index, 1)
        }, 2000)
        this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y)
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1)
        }, 1000)
    }


    checkCollectibleObjects() {
        this.level.collectibleObject.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                if (collectible instanceof CollectibleBottles
                    && this.level.bottleStatusBar.bottleAmount <= 9) {
                    this.collectBottle(collectible)
                } else if (collectible instanceof Coins) {
                    this.collectCoin(collectible)
                }
            }
        })
    }


    collectCoin(collectible) {
        if (!World.isMuted) {
            this.collectCoinSound.play()
            this.collectCoinSound.volume = 0.5
        }
        this.level.coinStatusBar.setCoins(this.level.coinStatusBar.coinAmount + 1)
        this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1)
        World.collectedCoins += 1
    }


    collectBottle(collectible) {
        if (!World.isMuted) {
            this.collectBottleSound.play()
            this.collectBottleSound.volume = 0.5
        }
        this.level.bottleStatusBar.setBottleAmount(this.level.bottleStatusBar.bottleAmount + 1)
        this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1)
        World.collectedBottles += 1
    }


    checkThrowableObjects() {
        let now = Date.now()
        if (this.keyboard.SPACE && now - this.lastThrowTime > this.throwCooldown) {
            if (this.level.bottleStatusBar.bottleAmount > 0) {
                let bottle = new ThrowableObject(this.character.x, this.character.y)
                if (!World.isMuted) {
                    this.throwSound.play()
                }
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
                this.killEnemyFromTop(enemy)
            }
        })
    }


    killEnemyFromTop(enemy) {
        World.killedEnemies += 1
        enemy.isHit = true
        this.character.resetJumpAnimation()
        this.character.jump()
        this.character.playSingleJumpAnimation(this.character.IMAGES_JUMPING)
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
        }, 2000)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgrounds()
        this.drawStatusbars()
        this.drawObjects()
        this.ctx.translate(-this.camera_x, 0)
        if (this.gameOverScreen) {
            this.addToMap(this.gameOverScreen)
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawBackgrounds() {
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)
        this.ctx.translate(-this.camera_x, 0)
        this.addObjectsToMap(this.level.clouds)
    }


    drawStatusbars() {
        this.addToMap(this.level.healthStatusBar)
        this.addToMap(this.level.bottleStatusBar)
        this.addToMap(this.level.coinStatusBar)
        this.addToMap(this.level.statusbarHealthEndboss)
        this.ctx.translate(this.camera_x, 0)
    }


    drawObjects() {
        this.addObjectsToMap(this.level.collectibleObject)

        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
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


    restartMusic() {
        this.getIsMutedFromLocalStorage()
        this.backgroundMusic.pause()
        this.backgroundMusic.currentTime = 1
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = 0.2
        this.backgroundMusic.muted = World.isMuted
        if (!World.isMuted) {
            this.backgroundMusic.play()
        }
    }


    startMusic() {
        if (!World.isMuted && this.backgroundMusic.paused) {
            this.backgroundMusic.currentTime = 1
            this.backgroundMusic.play()
        }
    }


    setIsMutedToLocalStorage() {
        localStorage.setItem('isMuted', World.isMuted)
    }


    getIsMutedFromLocalStorage() {
        let storedMuteStatus = localStorage.getItem('isMuted')
        if (storedMuteStatus !== null) {
            World.isMuted = storedMuteStatus === 'true'
        } else {
            World.isMuted = false
        }
    }


    toggleMute() {
        World.isMuted = !World.isMuted
        this.backgroundMusic.muted = World.isMuted
        this.setIsMutedToLocalStorage()
        this.updateMuteIcon()
        const muteButton = document.getElementById('muteButton')
        muteButton.blur()
        if (!World.isMuted) {
            this.backgroundMusic.play()
        }
    }


    updateMuteIcon() {
        const muteIcon = document.getElementById('muteIcon')
        muteIcon.src = World.isMuted ? 'img/10_Icons/mute.png' : 'img/10_Icons/loud.png'
    }


    initMuteButton() {
        const muteButton = document.getElementById('muteButton')
        muteButton.addEventListener('click', (event) => {
            this.toggleMute()
            event.currentTarget.blur()
        })
    }


    waitForFirstUserInteraction() {
        const startMusicOnce = () => {
            this.startMusic()
            document.removeEventListener('keydown', startMusicOnce)
            document.removeEventListener('click', startMusicOnce)
        }
        document.addEventListener('keydown', startMusicOnce)
        document.addEventListener('click', startMusicOnce)
    }
}