/**
 * Repräsentiert ein Level im Spiel. Ein Level besteht aus verschiedenen Elementen wie Feinden, Wolken,
 * Hintergrundobjekten, Statusleisten für Gesundheit, Flaschen und Münzen sowie Sammelobjekten.
 */
class Level {
    
    /**
     * Erstellte Instanz eines Levels mit den gegebenen Parametern.
     * 
     * @param {Array} enemies - Eine Liste von Feinden im Level.
     * @param {Array} clouds - Eine Liste von Wolken im Level.
     * @param {Array} backgroundObjects - Eine Liste von Hintergrundobjekten im Level.
     * @param {StatusbarHealth} healthStatusBar - Die Statusleiste für die Gesundheit des Spielers.
     * @param {StatusBarBottle} bottleStatusBar - Die Statusleiste für die Flaschen im Spiel.
     * @param {StatusBarCoin} coinStatusBar - Die Statusleiste für die Münzen im Spiel.
     * @param {StatusbarHealthEndboss} statusbarHealthEndboss - Die Statusleiste für die Gesundheit des Endgegners.
     * @param {Object} collectibleObject - Das Sammelobjekt im Level (z. B. eine Flasche oder ein Power-Up).
     * @param {number} level_end_x - Die X-Koordinate des Endes des Levels.
     * @constructor
     */
    constructor(enemies, clouds, backgroundObjects, healthStatusBar, bottleStatusBar, coinStatusBar, statusbarHealthEndboss, collectibleObject, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.healthStatusBar = healthStatusBar;
        this.bottleStatusBar = bottleStatusBar;
        this.coinStatusBar = coinStatusBar;
        this.statusbarHealthEndboss = statusbarHealthEndboss;
        this.collectibleObject = collectibleObject;
        this.level_end_x = level_end_x;
    }
}
