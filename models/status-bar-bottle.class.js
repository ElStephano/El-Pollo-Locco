/**
 * Klasse, die die Anzeige der Flaschen im Spiel darstellt.
 * Erbt von der `StatusBar`-Klasse und zeigt den aktuellen Stand der verfügbaren Flaschen als Statusleiste an.
 */
class StatusBarBottle extends StatusBar {

    /**
     * @type {string[]} Liste der Bildpfade für die verschiedenen Flaschenstatus-Stufen.
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * @type {number} Die Anzahl der verfügbaren Flaschen.
     */
    bottleAmount = 3;

    /**
     * Erstellt eine neue Instanz der StatusBarBottle-Klasse.
     * Lädt die Bilder für die Flaschenanzeige und setzt die Anfangszahl der Flaschen.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 270;
        this.setBottleAmount(this.bottleAmount);
    }

    /**
     * Setzt die Anzahl der verfügbaren Flaschen und aktualisiert das angezeigte Bild der Flaschenstatus-Leiste.
     * 
     * @param {number} amount - Die neue Anzahl der verfügbaren Flaschen.
     */
    setBottleAmount(amount) {
        this.bottleAmount = amount;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildes basierend auf der aktuellen Anzahl der verfügbaren Flaschen.
     * 
     * @returns {number} Der Index des Bildes, das den aktuellen Flaschenstatus darstellt.
     */
    resolveImageIndex() {
        if (this.bottleAmount >= 9) {
            return 5;
        } else if (this.bottleAmount == 8 || this.bottleAmount == 7) {
            return 4;
        } else if (this.bottleAmount == 6 || this.bottleAmount == 5) {
            return 3;
        } else if (this.bottleAmount == 4 || this.bottleAmount == 3) {
            return 2;
        } else if (this.bottleAmount == 1 || this.bottleAmount == 2) {
            return 1;
        } else if (this.bottleAmount == 0) {
            return 0;
        }
    }
}

