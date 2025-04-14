class Coins extends CollectibleObject {
    
    
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]


    offset = {
        'top': 30,
        'right': 60,
        'bottom': 60,
        'left': 30
    }
    
    
    constructor(x, y) {
        super()
        this.loadImages(this.IMAGES_COINS)
        this.setCoins()
        this.animate()
        this.x = x
        this.y = y
    }


    setCoins() {
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
    }    


    animate() {
        this.interval = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_COINS.length;
            this.img = this.imageCache[this.IMAGES_COINS[this.currentImageIndex]];
            let path = this.IMAGES_COINS[this.currentImageIndex]
            if (path === this.IMAGES_COINS[0]) {
                this.width = 93;   // Breite für coin_1
                this.height = 93;  // Höhe für coin_1               
            } else if (path === this.IMAGES_COINS[1]) {
                this.width = 95;   // Breite für coin_2
                this.height = 95;  // Höhe für coin_2
            }
        }, 200); // Wechselt alle 200 Millisekunden
        MovableObject.backgroundIntervals.push(this.interval)
    }
}