/**
 * Die Klasse `Cloud` repräsentiert eine bewegliche Wolke im Hintergrund des Spiels.
 * Sie erbt von `MovableObject` und bewegt sich kontinuierlich nach links.
 */
class Cloud extends MovableObject {

    /** Die vertikale Position der Wolke. */
    y = 25;

    /** Die Höhe der Wolke in Pixel. */
    height = 300;

    /** Die Breite der Wolke in Pixel. */
    width = 600;

    /** Intervall-ID für die Animation der Wolke. */
    cloudInterval = null;

    /**
     * Erstellt eine neue Instanz der Wolke an der gegebenen X-Position.
     * Lädt das Bild der Wolke und startet die Bewegung.
     * 
     * @param {number} x - Die horizontale Startposition der Wolke.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    /**
     * Startet die kontinuierliche Bewegung der Wolke nach links.
     * Fügt das Animationsintervall dem Hintergrund-Intervall-Array hinzu.
     */
    animate() {
        this.cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS
        MovableObject.backgroundIntervals.push(this.cloudInterval);
    }
}
