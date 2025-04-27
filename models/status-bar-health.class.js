/**
 * Class that represents the health status display.
 * Inherits from the `StatusBar` class and shows the player's health status as a status bar.
 */
class StatusbarHealth extends StatusBar {

    /**
     * @type {string[]} List of image paths for the different health levels of the player.
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * @type {number} The percentage of health (0-100).
     */
    percentage = 100;

    /**
     * Creates a new instance of the StatusbarHealth class.
     * Loads the images for the health display and sets the initial health value.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the displayed image.
     * 
     * @param {number} percentage - The new health value (between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the current health percentage.
     * 
     * @returns {number} The index of the image representing the current health level.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}