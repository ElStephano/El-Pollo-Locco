/**
 * Die Klasse `CollectibleBottles` repräsentiert sammelbare Flaschen im Spiel.
 * Sie erbt von `CollectibleObject` und verwendet spezifische Bilder für Flaschen.
 */
class CollectibleBottles extends CollectibleObject {

    /**
     * Bildpfade für sammelbare Flaschenobjekte.
     * @type {Array<string>}
     */
    IMAGES_COLLECTIBLE_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * Erstellt eine neue sammelbare Flasche.
     * Lädt die Bilder und wählt zufällig eine Flasche aus.
     */
    constructor() {
        super().loadImages(this.IMAGES_COLLECTIBLE_BOTTLES);
        this.setBottles();
    }

    /**
     * Wählt ein zufälliges Flaschenbild aus dem Cache
     * und weist es dem Objekt zu.
     */
    setBottles() {
        let path = this.IMAGES_COLLECTIBLE_BOTTLES[this.getRandomImage(this.IMAGES_COLLECTIBLE_BOTTLES)];
        this.img = this.imageCache[path];
    }
}
