class Enemy extends MovableObject {
    height = 90
    width = 90
    y = 330
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    offset = {
        'top': 10,
        'right': 20,
        'bottom':20,
        'left': 10
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate()
    }

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60)

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }
}