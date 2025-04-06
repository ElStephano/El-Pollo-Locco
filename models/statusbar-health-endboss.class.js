class StatusbarHealthEndboss extends StatusBar {

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green100.png'
    ]

    percentage = 100

    constructor() {
        super()
        this.loadImages(this.IMAGES)
        this.setPercentage(100)
        this.y = 50
        this.x = 180
        this.width = 360
        this.height = 80
    }

    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }
}