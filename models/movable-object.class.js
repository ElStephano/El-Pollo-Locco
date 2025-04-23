/**
 * Class representing a movable object in the game world.
 * Extends DrawableObject to inherit drawable properties.
 */
class MovableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed */
    speed = 0.2;

    /** @type {boolean} Indicates if object is facing the other direction */
    otherDirection = false;

    /** @type {number} Vertical speed */
    speedY = 0;

    /** @type {number} Gravity acceleration */
    accelaration = 2.5;

    /** @type {number} Timestamp of the last hit */
    lastHit = 0;

    /** @type {number} Interval ID for gravity */
    gravityInterval = 0;

    /** @type {number} Current jumping animation frame */
    currentJumpingImage = 0;

    /** @type {boolean} Indicates if object is jumping */
    isJumping = false;

    /** @type {number[]} Intervals for endboss-related logic */
    static endbossIntervals = [];

    /** @type {number[]} Intervals for character logic */
    static characterIntervals = [];

    /** @type {number[]} Intervals for enemy logic */
    static enemyIntervals = [];

    /** @type {number[]} Intervals for background logic */
    static backgroundIntervals = [];

    /** @type {boolean} Indicates if endboss is dead */
    static endbossDead = false;

    /** @type {boolean} Indicates if character is dead */
    static characterDead = false;

    /** @type {boolean} Indicates if character has recently been hit */
    characterIsHit = false;

    /** @type {HTMLAudioElement} Game over sound */
    gameOverSound = new Audio('audio/gameOver.mp3');

    /** @type {HTMLAudioElement} Endboss jump sound */
    endbossJumpSound = new Audio('audio/endbossJump.mp3');

    /** @type {HTMLAudioElement} Endboss dying sound */
    endbossDying = new Audio('audio/endbossDying.mp3');

    /**
     * Applies gravity to the object over time.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 30);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return true;
        else if (this instanceof Character) return this.y < 165;
        else return this.y < 40;
    }

    /**
     * Checks collision with another movable object.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.left > mo.x + mo.offset.left &&
               this.y + this.height - 10 > mo.y + mo.offset.left &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.left &&
               this.y + this.offset.top < mo.y + mo.height + this.offset.top;
    }

    /** Moves the object to the right. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left. */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays animation from an image array.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Reduces energy when hit, prevents rapid successive hits. */
    hit() {
        if (!this.characterIsHit) {
            this.characterIsHit = true;
            this.energy -= 10;
            if (this.energy < 0) this.energy = 0;
            else this.lastHit = new Date().getTime();

            setTimeout(() => {
                this.characterIsHit = false;
            }, 1000);
        }
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean}
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the object was recently hurt.
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is alive.
     * @returns {boolean}
     */
    isAlive() {
        return this.energy > 0;
    }

    /** Stops all movement and animation intervals. */
    stopAllIntervals() {
        this.stopAllCharacterIntervals();
        this.stopAllEndbossIntervals();
        this.stopAllEnemyIntervals();
        this.stopAllBackgroundIntervals();
    }

    /** Stops background intervals. */
    stopAllBackgroundIntervals() {
        if (MovableObject.backgroundIntervals.length > 0) {
            MovableObject.backgroundIntervals.forEach(interval => clearInterval(interval));
            MovableObject.backgroundIntervals = [];
        }
    }

    /** Stops endboss-related intervals. */
    stopAllEndbossIntervals() {
        if (MovableObject.endbossIntervals.length > 0) {
            MovableObject.endbossIntervals.forEach(interval => clearInterval(interval));
            MovableObject.endbossIntervals = [];
        }
    }

    /** Stops character-related intervals. */
    stopAllCharacterIntervals() {
        if (MovableObject.characterIntervals.length > 0) {
            MovableObject.characterIntervals.forEach(interval => clearInterval(interval));
            MovableObject.characterIntervals = [];
        }
    }

    /** Stops enemy-related intervals. */
    stopAllEnemyIntervals() {
        if (MovableObject.enemyIntervals.length > 0) {
            MovableObject.enemyIntervals.forEach(interval => clearInterval(interval));
            MovableObject.enemyIntervals = [];
        }
    }

    /** Displays game over screen if character is dead. */
    gameOverScreen() {
        if (MovableObject.characterDead) {
            let gameOverScreen = new DrawableObject();
            gameOverScreen.loadImage('img/9_intro_outro_screens/game_over/game over.png');
            gameOverScreen.x = 0;
            gameOverScreen.y = 0;
            gameOverScreen.width = 720;
            gameOverScreen.height = 500;
            this.world.gameOverScreen = gameOverScreen;

            let startScreen = document.getElementById('startScreen');
            if (startScreen.classList.contains('d-none')) {
                this.showButtons();
            }
        }
    }

    /** Shows restart or menu buttons after game ends. */
    showButtons() {
        let buttons = document.getElementById('buttonContainer');
        if (buttons.classList.contains('d-none')) {
            setTimeout(() => {
                buttons.classList.remove('d-none');
            }, 3000);
        }
    }

    /** Displays stats and winning screen if endboss is dead. */
    showStats() {
        if (MovableObject.endbossDead) {
            this.stopAllIntervals();
            this.getStats();
            document.getElementById('winningScreen').classList.remove('d-none');
            this.showButtons();
            setTimeout(() => {
                this.resetStats();
            }, 500);
        }
    }

    /** Updates the stats display in the UI. */
    getStats() {
        if (MovableObject.endbossDead) {
            document.getElementById('killedEnemies').innerHTML = `${World.killedEnemies}`;
            document.getElementById('collectedCoins').innerHTML = `${World.collectedCoins}`;
            document.getElementById('collectedBottles').innerHTML = `${World.collectedBottles}`;
        }
    }

    /** Resets all tracked stats to zero. */
    resetStats() {
        World.killedEnemies = 0;
        World.collectedCoins = 0;
        World.collectedBottles = 0;
    }

    /** Hides touch controls on smaller screens. */
    hideTouch() {
        let touch = document.getElementById("mobileControls");
        if (window.innerWidth < 720 || window.innerHeight < 480) {
            touch.classList.add('d-none');
        }
    }
}