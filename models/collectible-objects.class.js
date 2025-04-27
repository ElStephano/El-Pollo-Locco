/**
 * The `CollectibleObject` class represents collectible objects in the game,
 * such as coins or bottles. It inherits from `MovableObject` and includes properties
 * for random placement and collision detection.
 */
class CollectibleObject extends MovableObject {

    /**
     * Creates a new instance of a collectible object with a random X position.
     * Positions the object near the ground.
     */
    constructor() {
        super();
        this.x = Math.random() * 2800;
        this.y = 340;
        this.width = 70;
        this.height = 80;
    }

    /**
     * Returns a random index from a given array of image paths.
     * @param {Array<string>} images - The array of image paths.
     * @returns {number} The random index within the image array.
     */
    getRandomImage(images) {
        let randomIndex = Math.floor(Math.random() * images.length);
        return randomIndex;
    }
}
