/**
 * Klasse, die die Gesundheitsanzeige darstellt.
 * Erbt von der `StatusBar`-Klasse und zeigt den Gesundheitsstatus des Spielers als Statusleiste an.
 */
class StatusbarHealth extends StatusBar {

    /**
     * @type {string[]} Liste der Bildpfade für die verschiedenen Gesundheitsstufen des Spielers.
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * @type {number} Der Prozentsatz des Gesundheitsstatus (0-100).
     */
    percentage = 100;

    /**
     * Erstellt eine neue Instanz der StatusbarHealth-Klasse.
     * Lädt die Bilder für die Gesundheitsanzeige und setzt den initialen Gesundheitswert.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Setzt den Prozentsatz des Gesundheitsstatus und aktualisiert das angezeigte Bild.
     * 
     * @param {number} percentage - Der neue Gesundheitswert (zwischen 0 und 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildes basierend auf dem aktuellen Gesundheitsprozentsatz.
     * 
     * @returns {number} Der Index des Bildes, das die aktuelle Gesundheitsstufe darstellt.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
