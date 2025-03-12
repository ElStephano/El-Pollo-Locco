class Level {
    enemies
    clouds
    backgroundObjects
    healthStatusBar
    bottleStatusBar
    coinStatusBar
    collectibleObject
    level_end_x = 2165

    constructor(enemies, clouds, backgroundObjects, healthStatusBar, bottleStatusBar,  coinStatusBar, collectibleObject) {
        this.enemies = enemies
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.healthStatusBar = healthStatusBar
        this.bottleStatusBar = bottleStatusBar
        this.coinStatusBar = coinStatusBar
        this.collectibleObject = collectibleObject
    }
}