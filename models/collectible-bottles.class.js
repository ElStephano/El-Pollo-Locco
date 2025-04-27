/**
 * The `CollectibleBottles` class represents collectible bottles in the game.
 * It inherits from `CollectibleObject` and uses specific images for bottles.
 */
class CollectibleBottles extends CollectibleObject {

    /**
     * Image paths for collectible bottle objects.
     * @type {Array<string>}
     */
    IMAGES_COLLECTIBLE_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * Offset values to adjust the collision frame for the collectible object.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        'top': 10,
        'right': 40,
        'bottom': 20,
        'left': 25
    };

    /**
     * Creates a new collectible bottle.
     * Loads the images and randomly selects a bottle.
     */
    constructor() {
        super().loadImages(this.IMAGES_COLLECTIBLE_BOTTLES);
        this.setBottles();
    }

    /**
     * Selects a random bottle image from the cache
     * and assigns it to the object.
     */
    setBottles() {
        let path = this.IMAGES_COLLECTIBLE_BOTTLES[this.getRandomImage(this.IMAGES_COLLECTIBLE_BOTTLES)];
        this.img = this.imageCache[path];
    }
}

