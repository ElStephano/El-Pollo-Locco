/**
 * Die Klasse `CollectibleObject` repräsentiert sammelbare Objekte im Spiel,
 * wie z.B. Münzen oder Flaschen. Sie erbt von `MovableObject` und besitzt Eigenschaften
 * für zufällige Platzierung und Kollisionserkennung.
 */
class CollectibleObject extends MovableObject {

    /**
     * Offset-Werte zur Anpassung des Kollisionsrahmens für das sammelbare Objekt.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };

    /**
     * Erstellt eine neue Instanz eines sammelbaren Objekts mit zufälliger X-Position.
     * Positioniert das Objekt in Bodennähe.
     */
    constructor() {
        super();
        this.x = Math.random() * 2200;
        this.y = 340;
        this.width = 70;
        this.height = 80;
    }

    /**
     * Gibt einen zufälligen Index aus einem übergebenen Array von Bildpfaden zurück.
     * @param {Array<string>} images - Das Array mit Bildpfaden.
     * @returns {number} Der zufällige Index im Bild-Array.
     */
    getRandomImage(images) {
        let randomIndex = Math.floor(Math.random() * images.length);
        return randomIndex;
    }
}
