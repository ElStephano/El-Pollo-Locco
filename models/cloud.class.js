class Cloud extends MovableObject {
    y = 25
    height = 300
    width = 600
    cloudInterval = null


    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x
        this.animate()
    }

    animate() {
        this.cloudInterval = setInterval(() => {
            this.moveLeft()
        }, 1000 / 60)
        MovableObject.backgroundIntervals.push(this.cloudInterval)
    }
}