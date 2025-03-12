class StatusBarCoin extends StatusBar {
    IMAGES_COIN_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ]


    coinAmount = 1


    constructor () {
        super()
        this.loadImages(this.IMAGES_COIN_STATUSBAR)
        this.x = 500
        this.setCoins(0)

    }


    setCoins(coinsAmount) {
        this.coinAmount  = coinsAmount
        let path = this.IMAGES_COIN_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }


    resolveImageIndex() {
        if (this.coinAmount  == 5) {
            return 5
        } else if (this.coinAmount  == 4) {
            return 4
        } else if (this.coinAmount  == 3) {
            return 3
        } else if (this.coinAmount  == 2) {
            return 2
        } else if (this.coinAmount  == 1) {
            return 1
        } else {
            return 0
        }
    }
}