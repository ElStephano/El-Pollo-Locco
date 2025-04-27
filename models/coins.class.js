/**
 * The `Coins` class represents collectible coins in the game.
 * It inherits from `CollectibleObject` and includes animations as well as
 * different sizes depending on the current image.
 */
class Coins extends CollectibleObject {

    /**
     * Image paths for coin animation.
     * @type {Array<string>}
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Collision offset for precise hitbox.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        'top': 30,
        'right': 60,
        'bottom': 60,
        'left': 30
    };

    /**
     * Creates a new coin at the given coordinates.
     * Loads images, starts animation, and sets position.
     * 
     * @param {number} x - The X position of the coin.
     * @param {number} y - The Y position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setCoins();
        this.animate();
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the initial image of the coin.
     */
    setCoins() {
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
    }

    /**
     * Animates the coin by switching images at an interval.
     * Adjusts the size depending on the current image.
     */
    animate() {
        this.interval = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_COINS.length;
            this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
            let path = this.IMAGES_COINS[this.currentImageIndex];
            if (path === this.IMAGES_COINS[0]) {
                this.width = 93;
                this.height = 93;
            } else if (path === this.IMAGES_COINS[1]) {
                this.width = 95;
                this.height = 95;
            }
        }, 200);
        MovableObject.backgroundIntervals.push(this.interval);
    }
}

