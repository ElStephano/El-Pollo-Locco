/**
 * Represents a level in the game. A level consists of various elements such as enemies, clouds,
 * background objects, health status bars, bottles and coins, as well as collectible items.
 */
class Level {

    /**
     * Creates an instance of a level with the given parameters.
     * 
     * @param {Array} enemies - A list of enemies in the level.
     * @param {Array} clouds - A list of clouds in the level.
     * @param {Array} backgroundObjects - A list of background objects in the level.
     * @param {StatusbarHealth} healthStatusBar - The health status bar of the player.
     * @param {StatusBarBottle} bottleStatusBar - The bottle status bar in the game.
     * @param {StatusBarCoin} coinStatusBar - The coin status bar in the game.
     * @param {StatusbarHealthEndboss} statusbarHealthEndboss - The health status bar of the final boss.
     * @param {Object} collectibleObject - The collectible object in the level (e.g., a bottle or power-up).
     * @param {number} level_end_x - The X-coordinate of the end of the level.
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

