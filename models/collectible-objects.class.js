class CollectibleObject extends MovableObject {


    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    }


    constructor() {
        super()
        this.x = Math.random() * 2200
        this.y = 340
        this.width = 70
        this.height = 80
    }


    getRandomImage(images) {
        let randomIndex = Math.floor(Math.random() * images.length)
        return randomIndex
    }
}