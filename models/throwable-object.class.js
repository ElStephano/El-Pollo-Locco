class ThrowableObject extends MovableObject{
    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.x = x
        this.y = y
        this.width = 70
        this.height = 70
        this.throw(x, y + 120)
    }


    throw(x, y) {
        this.x = x
        this.y = y
        this.speedY = 10
        this.speedX = 20
        this.applyGravity()
        setInterval(() => {
            this.x += 10
        }, 20)
    } 

    setBottles() {

    }
}