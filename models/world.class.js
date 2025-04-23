/**
 * Represents the game world where the character interacts with enemies, objects and the environment.
 */
class World {
    /** @type {Character} The main character controlled by the player */
    character = new Character();

    /** @type {Level} The current level the character is in */
    level = level1;

    /** @type {CanvasRenderingContext2D} Rendering context for the canvas */
    ctx;

    /** @type {HTMLCanvasElement} The canvas element for rendering the game */
    canvas;

    /** @type {Object} Keyboard input handler */
    keyboard;

    /** @type {number} Horizontal camera offset for rendering */
    camera_x = 0;

    /** @type {ThrowableObject[]} List of throwable objects in the world */
    throwableObjects = [];

    /** @type {number} Cooldown in milliseconds between throws */
    throwCooldown = 800;

    /** @type {number} Timestamp of the last bottle throw */
    lastThrowTime = 0;

    /** @type {HTMLAudioElement} Sound for throwing a bottle */
    throwSound = new Audio('audio/throwBottle.mp3');

    /** @type {HTMLAudioElement} Sound played when a bottle hits something */
    bottleHitSound = new Audio('audio/bottleHit.mp3');

    /** @type {HTMLAudioElement} Sound for collecting a coin */
    collectCoinSound = new Audio('audio/collectCoin.mp3');

    /** @type {HTMLAudioElement} Sound for collecting a bottle */
    collectBottleSound = new Audio('audio/collectBottle.mp3');

    /** @type {number|null} Interval ID for game loop checks */
    checkInterval = null;

    /** @type {number} Number of enemies killed in this session */
    static killedEnemies = 0;

    /** @type {number} Number of coins collected in this session */
    static collectedCoins = 0;

    /** @type {number} Number of bottles collected in this session */
    static collectedBottles = 0;

    /** @type {HTMLAudioElement} Background music audio element */
    backgroundMusic = new Audio('audio/Menu.mp3');

    /** @type {boolean} Whether the game is currently muted */
    static isMuted = true;

    /**
     * Initializes the World instance, sets up canvas, keyboard, audio, and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.getIsMutedFromLocalStorage();
        this.updateMuteIcon();
        this.setMusic();
        this.draw();
        this.setWorld();
        this.run();
        this.waitForFirstUserInteraction();
    }

    /**
 * Links the character to the current world instance.
 */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Configures the background music: looping, volume, and mute state.
     */
    setMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.muted = World.isMuted;
    }

    /**
     * Starts the main game loop to check for collisions and other state updates.
     * Runs at ~30 frames per second.
     */
    run() {
        this.checkInterval = setInterval(() => {
            this.checkThrowableObjects();
            this.checkCollisions();
            this.checkCollectibleObjects();
            this.checkCollisionBottles();
            this.checkCollisionAboveGround();

            if (MovableObject.characterDead) {
                setTimeout(() => {
                    clearInterval(this.checkInterval);
                }, 500);
            }
        }, 1000 / 30);
    }

    /**
     * Checks for collisions between throwable objects (bottles) and enemies or the ground.
     */
    checkCollisionBottles() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.throwableObjects.forEach((throwable) => {
            this.level.enemies.forEach((enemy) => {
                this.checkObjects(throwable, enemy, endboss);
            });
        });
    }

    /**
     * Handles different types of collisions between a throwable object and enemies or the endboss.
     * @param {ThrowableObject} throwable - The thrown object (bottle).
     * @param {Enemy} enemy - An enemy that could be hit.
     * @param {Endboss} endboss - The endboss instance.
     */
    checkObjects(throwable, enemy, endboss) {
        if (throwable.y > 380 && !throwable.isHit) {
            this.bottleOnGround(throwable);
        }
        if (throwable.isColliding(enemy) && !enemy.isHit && !(enemy instanceof Endboss)
            && !throwable.isHit) {
            this.bottleOnEnemy(throwable, enemy);
        }
        if (throwable.isColliding(endboss) && !endboss.isHit && !throwable.isHit) {
            this.bottleOnEndboss(endboss, throwable);
        }
    }

    /**
* Handles a bottle hitting the ground (not an enemy).
* @param {ThrowableObject} throwable - The bottle that hit the ground.
*/
    bottleOnGround(throwable) {
        if (!World.isMuted) {
            this.bottleHitSound.play();
        }
        throwable.bottleHit(throwable.x, throwable.y);
    }

    /**
     * Handles collision between a bottle and a regular enemy.
     * @param {ThrowableObject} throwable - The thrown bottle.
     * @param {Enemy} enemy - The enemy that was hit.
     */
    bottleOnEnemy(throwable, enemy) {
        this.isCollidingEnemy(enemy, throwable);
        enemy.isHit = true;
        if (!World.isMuted) {
            this.bottleHitSound.play();
        }
    }

    /**
     * Handles collision between a bottle and the endboss.
     * @param {Endboss} endboss - The endboss instance.
     * @param {ThrowableObject} throwable - The thrown bottle.
     */
    bottleOnEndboss(endboss, throwable) {
        this.isCollidingEndboss(throwable, endboss);
        endboss.isHit = true;
        if (!World.isMuted) {
            this.bottleHitSound.play();
        }
        throwable.isHit = true;
        setTimeout(() => {
            endboss.isHit = false;
        }, 500);
    }

    /**
     * Checks if a bottle hit the endboss and triggers damage logic.
     * @param {ThrowableObject} throwable - The bottle to check.
     * @param {Endboss} endboss - The endboss instance.
     */
    isCollidingEndboss(throwable, endboss) {
        if (!throwable.isHit) {
            const bottleIndex = this.throwableObjects.indexOf(throwable);
            if (bottleIndex !== -1 && endboss.energy >= 0 && !throwable.isHit) {
                this.endbossHitByBottle(bottleIndex, throwable, endboss);
            }
        }
    }

    /**
     * Applies damage to the endboss and updates the status bar.
     * @param {number} bottleIndex - Index of the bottle in the throwableObjects array.
     * @param {ThrowableObject} throwable - The bottle that hit.
     * @param {Endboss} endboss - The endboss to damage.
     */
    endbossHitByBottle(bottleIndex, throwable, endboss) {
        this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y);
        endboss.energy -= 20;
        this.level.statusbarHealthEndboss.percentage -= 20;
        this.level.statusbarHealthEndboss.setPercentage(this.level.statusbarHealthEndboss.percentage);
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, (this.throwableObjects[bottleIndex].IMAGES_BOTTLE_HIT.length) * 250);
    }

    /**
     * Checks collision between a bottle and a regular enemy and triggers hit logic.
     * @param {Enemy} enemy - The enemy instance.
     * @param {ThrowableObject} throwable - The thrown bottle.
     */
    isCollidingEnemy(enemy, throwable) {
        if (enemy instanceof Enemy) {
            const index = this.level.enemies.indexOf(enemy);
            const bottleIndex = this.throwableObjects.indexOf(throwable);
            if (index !== -1 && bottleIndex !== -1 && !enemy.isHit) {
                this.enemyHitByBottle(enemy, bottleIndex, throwable, index);
            }
        }
    }

    /**
     * Handles bottle hitting a regular enemy: damage, sound, removal of bottle and enemy.
     * @param {Enemy} enemy - The enemy hit.
     * @param {number} bottleIndex - Index of the bottle in the throwableObjects array.
     * @param {ThrowableObject} throwable - The bottle that hit.
     * @param {number} index - Index of the enemy in the enemies array.
     */
    enemyHitByBottle(enemy, bottleIndex, throwable, index) {
        enemy.isHit = true;
        World.killedEnemies += 1;
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 2000);
        this.throwableObjects[bottleIndex].bottleHit(throwable.x, throwable.y);
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 1000);
    }

    /**
 * Checks if the character is colliding with collectible objects (coins or bottles).
 * If so, triggers collection logic.
 */
    checkCollectibleObjects() {
        this.level.collectibleObject.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                if (
                    collectible instanceof CollectibleBottles &&
                    this.level.bottleStatusBar.bottleAmount <= 9
                ) {
                    this.collectBottle(collectible);
                } else if (collectible instanceof Coins) {
                    this.collectCoin(collectible);
                }
            }
        });
    }

    /**
     * Collects a coin: updates coin status bar, plays sound, and removes coin.
     * @param {Coins} collectible - The coin to collect.
     */
    collectCoin(collectible) {
        if (!World.isMuted) {
            this.collectCoinSound.play();
            this.collectCoinSound.volume = 0.5;
        }
        this.level.coinStatusBar.setCoins(this.level.coinStatusBar.coinAmount + 1);
        this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1);
        World.collectedCoins += 1;
    }

    /**
     * Collects a bottle: updates bottle status bar, plays sound, and removes bottle.
     * @param {CollectibleBottles} collectible - The bottle to collect.
     */
    collectBottle(collectible) {
        if (!World.isMuted) {
            this.collectBottleSound.play();
            this.collectBottleSound.volume = 0.5;
        }
        this.level.bottleStatusBar.setBottleAmount(this.level.bottleStatusBar.bottleAmount + 1);
        this.level.collectibleObject.splice(this.level.collectibleObject.indexOf(collectible), 1);
        World.collectedBottles += 1;
    }

    /**
     * Handles input for throwing bottles.
     * Limits throwing rate via cooldown and checks for available bottles.
     */
    checkThrowableObjects() {
        let now = Date.now();
        if (this.keyboard.SPACE && now - this.lastThrowTime > this.throwCooldown) {
            if (this.level.bottleStatusBar.bottleAmount > 0) {
                let bottle = new ThrowableObject(this.character.x, this.character.y);
                if (!World.isMuted) {
                    this.throwSound.play();
                }
                this.lastThrowTime = now;
                this.throwableObjects.push(bottle);
                this.level.bottleStatusBar.bottleAmount -= 1;
                this.level.bottleStatusBar.setBottleAmount(this.level.bottleStatusBar.bottleAmount);
            }
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     * Triggers character damage if not jumping on the enemy.
     */
    checkCollisions() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.level.enemies.forEach((enemy) => {
            if (
                this.character.isColliding(enemy) &&
                !enemy.isHit &&
                enemy instanceof Enemy &&
                !this.character.isAboveGround()
            ) {
                this.character.hit();
                this.level.healthStatusBar.setPercentage(this.character.energy);
            } else if (
                this.character.isColliding(endboss) &&
                endboss.energy > 0
            ) {
                this.character.hit();
                this.level.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions where the character is above an enemy (e.g., jumping on them).
     * If so, triggers enemy defeat.
     */
    checkCollisionAboveGround() {
        this.level.enemies.forEach((enemy) => {
            if (
                this.character.isColliding(enemy) &&
                !enemy.isHit &&
                this.character.isAboveGround() &&
                enemy instanceof Enemy
            ) {
                this.killEnemyFromTop(enemy);
            }
        });
    }

    /**
     * Kills an enemy by jumping on top of them.
     * Increments kill counter, resets and plays jump animation, and removes the enemy.
     * @param {Enemy} enemy - The enemy to be removed.
     */
    killEnemyFromTop(enemy) {
        World.killedEnemies += 1;
        enemy.isHit = true;
        this.character.resetJumpAnimation();
        this.character.jump();
        this.character.playSingleJumpAnimation(this.character.IMAGES_JUMPING);
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 2000);
    }

    /**
     * Clears the canvas and redraws the world (backgrounds, status bars, objects).
     * Also calls itself using requestAnimationFrame to create a continuous rendering loop.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgrounds();
        this.drawStatusbars();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        if (this.gameOverScreen) {
            this.addToMap(this.gameOverScreen);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws the background elements, including background objects and clouds.
     */
    drawBackgrounds() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the status bars for health, bottle amount, coins, and endboss health.
     */
    drawStatusbars() {
        this.addToMap(this.level.healthStatusBar);
        this.addToMap(this.level.bottleStatusBar);
        this.addToMap(this.level.coinStatusBar);
        this.addToMap(this.level.statusbarHealthEndboss);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all game objects, including collectible objects, throwable objects, enemies, and the character.
     */
    drawObjects() {
        this.addObjectsToMap(this.level.collectibleObject);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
    }

    /**
     * Adds a movable object to the canvas by calling its draw method.
     * Flips the image horizontally if the object is facing the other direction.
     * @param {MovableObject} mo - The movable object to be added.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawInnerFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of a movable object horizontally on the canvas.
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the canvas context back to its original state after flipping.
     * @param {MovableObject} mo - The movable object to restore.
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * Adds multiple objects to the map by calling the addToMap method for each one.
     * @param {Array<MovableObject>} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
 * Restarts the background music by resetting its properties and playing it.
 * Ensures the mute status is respected and updates the music.
 */
    restartMusic() {
        this.getIsMutedFromLocalStorage();
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 1;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.muted = World.isMuted;
        if (!World.isMuted) {
            this.backgroundMusic.play();
        }
    }

    /**
     * Starts playing the background music if it's not muted and is paused.
     */
    startMusic() {
        if (!World.isMuted && this.backgroundMusic.paused) {
            this.backgroundMusic.currentTime = 1;
            this.backgroundMusic.play();
        }
    }

    /**
     * Saves the mute status to localStorage for persistence across sessions.
     */
    setIsMutedToLocalStorage() {
        localStorage.setItem('isMuted', World.isMuted);
    }

    /**
     * Retrieves the mute status from localStorage and applies it.
     * Defaults to unmuted if no status is saved.
     */
    getIsMutedFromLocalStorage() {
        let storedMuteStatus = localStorage.getItem('isMuted');
        if (storedMuteStatus !== null) {
            World.isMuted = storedMuteStatus === 'true';
        } else {
            World.isMuted = false;
        }
    }

    /**
     * Toggles the mute status, updates the music's muted property, and stores the new status.
     * Also updates the mute icon.
     */
    toggleMute() {
        World.isMuted = !World.isMuted;
        this.backgroundMusic.muted = World.isMuted;
        this.setIsMutedToLocalStorage();
        this.updateMuteIcon();
        const muteButton = document.getElementById('muteButton');
        muteButton.blur();
        if (!World.isMuted) {
            this.backgroundMusic.play();
        }
    }

    /**
     * Updates the mute icon based on the current mute status.
     * Changes the icon to 'mute' or 'loud' accordingly.
     */
    updateMuteIcon() {
        const muteIcon = document.getElementById('muteIcon');
        muteIcon.src = World.isMuted ? 'img/10_Icons/mute.png' : 'img/10_Icons/loud.png';
    }

    /**
     * Initializes the mute button and binds the toggleMute method to the click event.
     */
    initMuteButton() {
        const muteButton = document.getElementById('muteButton');
        muteButton.addEventListener('click', (event) => {
            this.toggleMute();
            event.currentTarget.blur();
        });
    }

    /**
     * Waits for the first user interaction (key press or click) to start the background music.
     */
    waitForFirstUserInteraction() {
        const startMusicOnce = () => {
            this.startMusic();
            document.removeEventListener('keydown', startMusicOnce);
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('keydown', startMusicOnce);
        document.addEventListener('click', startMusicOnce);
    }
}    