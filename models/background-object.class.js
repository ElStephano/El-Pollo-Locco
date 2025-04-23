/**
 * Die `BackgroundObject`-Klasse repräsentiert ein einzelnes Hintergrundbild im Spiel.
 * Sie erbt von `MovableObject` und wird verwendet, um z. B. Landschafts-, Himmel- oder Bodenhintergründe darzustellen.
 */
class BackgroundObject extends MovableObject {
  
  /** Höhe des Hintergrundobjekts in Pixel. */
  height = 480;

  /** Breite des Hintergrundobjekts in Pixel. */
  width = 720;

  /**
   * Erzeugt ein neues `BackgroundObject`.
   * @param {string} imagePath - Der Pfad zum Bild des Hintergrundobjekts.
   * @param {number} x - Die horizontale Position des Objekts im Spiel.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;

    /**
     * Setzt die vertikale Position des Objekts so,
     * dass es am unteren Rand des sichtbaren Bereichs positioniert ist.
     */
    this.y = 480 - this.height;
  }
}
