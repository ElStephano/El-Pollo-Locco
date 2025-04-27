/**
 * The `BackgroundObject` class represents a single background image in the game.
 * It inherits from `MovableObject` and is used to display elements such as landscapes, sky, or ground backgrounds.
 */
class BackgroundObject extends MovableObject {
  
  /** Height of the background object in pixels. */
  height = 480;

  /** Width of the background object in pixels. */
  width = 720;

  /**
   * Creates a new `BackgroundObject`.
   * @param {string} imagePath - The path to the background object's image.
   * @param {number} x - The horizontal position of the object in the game.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;

    /**
     * Sets the vertical position of the object so that it is positioned at the bottom of the visible area.
     */
    this.y = 480 - this.height;
  }
}
