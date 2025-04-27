/**
 * Class that represents the health display for the final boss.
 * Inherits from the `StatusBar` class and shows the health status of the final boss as a status bar.
 */
class StatusbarHealthEndboss extends StatusBar {

    /**
     * @type {string[]} List of image paths for the different health stages of the final boss.
     */
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green100.png'
    ];

    /**
     * @type {number} The health percentage of the final boss (0-100).
     */
    percentage = 100;

    /**
     * Creates a new instance of the StatusbarHealthEndboss class.
     * Loads the images for the health display and sets the initial health value.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = 50;
        this.x = 180;
        this.width = 360;
        this.height = 80;
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
     * Determines the image index based on the current health percentage.
     * 
     * @returns {number} The index of the image representing the current health status.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}