class Cloud extends MovableObject {
    y = 25
    height = 300
    width = 600
    constructor(x) {
        super().loadImage('../img/5_background/layers/4_clouds/1.png')
        this.x = x
        this.animate()
    }

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60)
    }
}