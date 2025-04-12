class Coins extends CollectibleObject {
    
    
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    
    
    constructor(x, y) {
        super()
        this.loadImages(this.IMAGES_COINS)
        this.setCoins()
        this.animate()
        this.x = x
        this.y = y
    }


    // setCoins() {
    //     let path = this.IMAGES_COINS[this.getRandomImage(this.IMAGES_COINS)]
    //     this.img = this.imageCache[path]
    // }

    setCoins() {
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
    }    

    animate() {
        this.interval = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_COINS.length;
            this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
        }, 200); // Wechselt alle 200 Millisekunden
        MovableObject.backgroundIntervals.push(this.interval)
    }
}