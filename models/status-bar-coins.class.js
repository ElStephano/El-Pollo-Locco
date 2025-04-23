/**
 * Klasse, die die Anzeige der Münzen im Spiel darstellt.
 * Erbt von der `StatusBar`-Klasse und zeigt den aktuellen Stand der gesammelten Münzen als Statusleiste an.
 */
class StatusBarCoin extends StatusBar {

    /**
     * @type {string[]} Liste der Bildpfade für die verschiedenen Münzstatus-Stufen.
     */
    IMAGES_COIN_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * @type {number} Die Anzahl der gesammelten Münzen (von 0 bis 5).
     */
    coinAmount = 1;

    /**
     * Erstellt eine neue Instanz der StatusBarCoin-Klasse.
     * Lädt die Bilder für die Münzanzeige und setzt die Anfangszahl der Münzen auf 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_STATUSBAR);
        this.x = 500;
        this.setCoins(0);
    }

    /**
     * Setzt die Anzahl der gesammelten Münzen und aktualisiert das angezeigte Bild der Münzstatus-Leiste.
     * 
     * @param {number} coinsAmount - Die neue Anzahl der gesammelten Münzen (zwischen 0 und 5).
     */
    setCoins(coinsAmount) {
        this.coinAmount = coinsAmount;
        let path = this.IMAGES_COIN_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildes basierend auf der aktuellen Anzahl der gesammelten Münzen.
     * 
     * @returns {number} Der Index des Bildes, das den aktuellen Münzstatus darstellt.
     */
    resolveImageIndex() {
        if (this.coinAmount == 5) {
            return 5;
        } else if (this.coinAmount == 4) {
            return 4;
        } else if (this.coinAmount == 3) {
            return 3;
        } else if (this.coinAmount == 2) {
            return 2;
        } else if (this.coinAmount == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
