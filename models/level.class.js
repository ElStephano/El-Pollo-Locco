class Level {
    enemies
    clouds
    backgroundObjects
    healthStatusBar
    bottleStatusBar
    coinStatusBar
    statusbarHealthEndboss
    collectibleObject
    level_end_x = 3000

    constructor(enemies, clouds, backgroundObjects, healthStatusBar, bottleStatusBar, coinStatusBar, statusbarHealthEndboss, collectibleObject, level_end_x) {
        this.enemies = enemies
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.healthStatusBar = healthStatusBar
        this.bottleStatusBar = bottleStatusBar
        this.coinStatusBar = coinStatusBar
        this.statusbarHealthEndboss = statusbarHealthEndboss
        this.collectibleObject = collectibleObject
        this.level_end_x = level_end_x
    }
}