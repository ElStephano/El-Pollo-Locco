/**
 * Class that represents a general status bar.
 * Inherits from the `DrawableObject` class and serves as a base for various status displays.
 */
class StatusBar extends DrawableObject {

    /**
     * Creates a new instance of the StatusBar class.
     * Sets the position and size of the status bar.
     */
    constructor() {
        super();
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }
}