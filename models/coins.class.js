class Coins extends CollectibleObject {
    
    
    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ]
    
    
    constructor() {
        super()
        this.loadImages(this.IMAGES_COINS)
        this.setCoins()
    }


    setCoins() {
        let path = this.IMAGES_COINS[this.getRandomImage(this.IMAGES_COINS)]
        this.img = this.imageCache[path]
    }
}