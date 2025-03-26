class Enemy extends MovableObject {


    height = 90
    width = 90
    y = 330
    isHit = false


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]


    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'


    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    }


    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImage(this.IMAGE_DEAD)
        this.x = x
        // 200 + Math.random() * 2000;
        this.speed = 1 + Math.random() * 0.5
        this.animate()
    }


    animate() {
        let enemyMoveInterval = setInterval(() => {
            if (!this.isHit && !MovableObject.charcterDead) {
                this.moveLeft()
            }
        }, 1000 / 10)
        this.enemyIntervals.push(enemyMoveInterval)

        let enemyAnimationInterval = setInterval(() => {
            if (!this.isHit && !MovableObject.charcterDead) {
                this.playAnimation(this.IMAGES_WALKING)
            } else if (this.isHit) {
                this.img.src = this.IMAGE_DEAD
            }
        }, 200);
        this.enemyIntervals.push(enemyAnimationInterval)

    }
}