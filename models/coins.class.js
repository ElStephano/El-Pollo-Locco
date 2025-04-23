/**
 * Die Klasse `Coins` repräsentiert sammelbare Münzen im Spiel.
 * Sie erbt von `CollectibleObject` und enthält Animationen sowie
 * unterschiedliche Größen je nach aktuellem Bild.
 */
class Coins extends CollectibleObject {

    /**
     * Bildpfade für Münzen-Animation.
     * @type {Array<string>}
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Kollisionsoffset für präzise Hitbox.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        'top': 30,
        'right': 60,
        'bottom': 60,
        'left': 30
    };

    /**
     * Erstellt eine neue Münze mit gegebenen Koordinaten.
     * Lädt Bilder, startet Animation und setzt Position.
     * 
     * @param {number} x - Die X-Position der Münze.
     * @param {number} y - Die Y-Position der Münze.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setCoins();
        this.animate();
        this.x = x;
        this.y = y;
    }

    /**
     * Setzt das Anfangsbild der Münze.
     */
    setCoins() {
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
    }

    /**
     * Animiert die Münze durch Wechseln der Bilder im Intervall.
     * Passt die Größe abhängig vom aktuellen Bild an.
     */
    animate() {
        this.interval = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_COINS.length;
            this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];

            // Anpassung der Größe je nach Bild
            let path = this.IMAGES_COINS[this.currentImageIndex];
            if (path === this.IMAGES_COINS[0]) {
                this.width = 93;
                this.height = 93;
            } else if (path === this.IMAGES_COINS[1]) {
                this.width = 95;
                this.height = 95;
            }
        }, 200);
        MovableObject.backgroundIntervals.push(this.interval);
    }
}
