/**
 * Class that represents the display of coins in the game.
 * Inherits from the `StatusBar` class and shows the current number of collected coins as a status bar.
 */
class StatusBarCoin extends StatusBar {

    /**
     * @type {string[]} List of image paths for the different coin status levels.
     */
    IMAGES_COIN_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * @type {number} The number of collected coins (from 0 to 5).
     */
    coinAmount = 1;

    /**
     * Creates a new instance of the StatusBarCoin class.
     * Loads the images for the coin display and sets the initial number of coins to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_STATUSBAR);
        this.x = 500;
        this.setCoins(0);
    }

    /**
     * Sets the number of collected coins and updates the displayed image of the coin status bar.
     * 
     * @param {number} coinsAmount - The new number of collected coins (between 0 and 5).
     */
    setCoins(coinsAmount) {
        this.coinAmount = coinsAmount;
        let path = this.IMAGES_COIN_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the current number of collected coins.
     * 
     * @returns {number} The index of the image representing the current coin status.
     */
    resolveImageIndex() {
        if (this.coinAmount === 9 || this.coinAmount === 10)  {
            return 5;
        } else if (this.coinAmount === 7 || this.coinAmount === 8) {
            return 4;
        } else if (this.coinAmount === 5 || this.coinAmount === 6) {
            return 3;
        } else if (this.coinAmount === 3 || this.coinAmount === 4) {
            return 2;
        } else if (this.coinAmount === 1 || this.coinAmount === 2) {
            return 1;
        } else {
            return 0;
        }
    }
}

