/**
 * Klasse, die die Gesundheitsanzeige für den Endboss darstellt.
 * Erbt von der Klasse `StatusBar` und zeigt den Gesundheitsstatus des Endbosses als Statusleiste an.
 */
class StatusbarHealthEndboss extends StatusBar {

    /**
     * @type {string[]} Liste der Bildpfade für die verschiedenen Gesundheitsstufen des Endbosses.
     */
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green100.png'
    ];

    /**
     * @type {number} Der Prozentsatz des Gesundheitsstatus des Endbosses (0-100).
     */
    percentage = 100;

    /**
     * Erstellt eine neue Instanz der StatusbarHealthEndboss-Klasse.
     * Lädt die Bilder für die Gesundheitsanzeige und setzt den initialen Gesundheitswert.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = 50;
        this.x = 180;
        this.width = 360;
        this.height = 80;
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
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
