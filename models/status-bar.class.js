/**
 * Klasse, die eine allgemeine Statusleiste darstellt.
 * Erbt von der Klasse `DrawableObject` und stellt eine Basis für verschiedene Statusanzeigen dar.
 */
class StatusBar extends DrawableObject {

    /**
     * Erstellt eine neue Instanz der StatusBar-Klasse.
     * Setzt die Position und Größe der Statusleiste.
     */
    constructor() {
        super();
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }
}
