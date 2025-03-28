class MovableObject extends DrawableObject {
    speed = 0.2
    otherDirection = false
    speedY = 0
    accelaration = 2.5
    lastHit = 0
    gravityInterval = 0
    currentJumpingImage = 0
    isJumping = false
    static endbossIntervals = []
    static characterIntervals = []
    static enemyIntervals = []
    static endbossDead = false
    static characterDead = false
    characterIsHit = false
    gameOverSound = new Audio('audio/gameOver.mp3')


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
        if (!this.characterIsHit) {
            this.characterIsHit = true
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime()
            }
            setTimeout(() => {
                this.characterIsHit = false
            }, 1000)
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


    stopAllIntervals() {
        this.stopAllCharacterIntervals()
        this.stopAllEndbossIntervals()
        this.stopAllEnemyIntervals()
    }


    stopAllEndbossIntervals() {
        if (MovableObject.endbossIntervals.length > 0) {
            MovableObject.endbossIntervals.forEach(interval => clearInterval(interval))
        }
    }


    stopAllCharacterIntervals() {
        if (MovableObject.characterIntervals.length > 0) {
            MovableObject.characterIntervals.forEach(interval => clearInterval(interval))
        }
    }


    stopAllEnemyIntervals() {
        if (MovableObject.enemyIntervals.length > 0) {
            MovableObject.enemyIntervals.forEach(interval => clearInterval(interval))
        }
    }


    gameOverScreen() {
        if (MovableObject.characterDead) {
            let gameOverScreen = new DrawableObject();
            gameOverScreen.loadImage('img/9_intro_outro_screens/game_over/game over.png'); // Bildpfad anpassen
            gameOverScreen.x = 0;  // Position in der Mitte
            gameOverScreen.y = 0;
            gameOverScreen.width = 720; // Größe anpassen
            gameOverScreen.height = 500
            this.world.gameOverScreen = gameOverScreen; // Speichern im World-Objekt
            this.showButtons()
            console.log('gameOverSreen')
        }
    }


    showButtons() {
        setTimeout(() => {
            document.getElementById('buttonContainer').classList.remove('d-none')
        }, 1000)
    }
}