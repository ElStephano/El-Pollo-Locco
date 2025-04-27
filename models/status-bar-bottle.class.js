/**
 * Class that represents the display of bottles in the game.
 * Inherits from the `StatusBar` class and displays the current amount of available bottles as a status bar.
 */
class StatusBarBottle extends StatusBar {

    /**
     * @type {string[]} List of image paths for the different bottle status levels.
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * @type {number} The number of available bottles.
     */
    bottleAmount = 3;

    /**
     * Creates a new instance of the StatusBarBottle class.
     * Loads the images for the bottle display and sets the initial number of bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 270;
        this.setBottleAmount(this.bottleAmount);
    }

    /**
     * Sets the number of available bottles and updates the displayed image of the bottle status bar.
     * 
     * @param {number} amount - The new number of available bottles.
     */
    setBottleAmount(amount) {
        this.bottleAmount = amount;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the current number of available bottles.
     * 
     * @returns {number} The index of the image representing the current bottle status.
     */
    resolveImageIndex() {
        if (this.bottleAmount >= 9) {
            return 5;
        } else if (this.bottleAmount == 8 || this.bottleAmount == 7) {
            return 4;
        } else if (this.bottleAmount == 6 || this.bottleAmount == 5) {
            return 3;
        } else if (this.bottleAmount == 4 || this.bottleAmount == 3) {
            return 2;
        } else if (this.bottleAmount == 1 || this.bottleAmount == 2) {
            return 1;
        } else if (this.bottleAmount == 0) {
            return 0;
        }
    }
}