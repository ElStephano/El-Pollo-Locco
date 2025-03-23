class StatusBarBottle extends StatusBar {
    IMAGES_BOTTLE = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]


    bottleAmount = 3


    constructor() {
        super()
        this.loadImages(this.IMAGES_BOTTLE)
        this.x = 270
        this.setBottleAmount(this.bottleAmount)
    }


    setBottleAmount(amount) {
        this.bottleAmount = amount
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()]
        this.img = this.imageCache[path]

    }


    resolveImageIndex() {
        if (this.bottleAmount >= 9) {
            return 5
        } else if (this.bottleAmount == 8 || this.bottleAmount == 7) {
            return 4
        } else if (this.bottleAmount == 6 || this.bottleAmount == 5) {
            return 3
        } else if (this.bottleAmount == 4 || this.bottleAmount == 3) {
            return 2
        } else if (this.bottleAmount == 1 || this.bottleAmount == 2) {
            return 1
        } else if (this.bottleAmount == 0) {
            return 0
        }
    }
}
