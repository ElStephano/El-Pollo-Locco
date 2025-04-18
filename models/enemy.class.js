class Enemy extends MovableObject {

    height = 100;
    width = 100;
    y = 330;
    isHit = false;
    enemyAnimationInterval = null;
    enemyMoveInterval = null;
    isSmallChicken = false; // Neue Eigenschaft zur Unterscheidung
    deadSound = new Audio('audio/dead_chicken.mp3')
    soundPlay = false


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    SMALL_CHICKEN_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };


    constructor(x) {
        super();

        // Entscheidet bei jedem Gegner, ob es groß oder klein ist
        this.isSmallChicken = Math.random() < 0.5; // 50% Chance für kleines Huhn
        this.x = x;

        if (this.isSmallChicken) {
            this.speed = 2
            this.height = 80; // Kleinere Höhe für kleines Huhn
            this.width = 80;
            this.y = 350; // Damit es etwas tiefer erscheint
            this.loadImages(this.SMALL_CHICKEN_WALKING);
            this.loadImage(this.SMALL_CHICKEN_WALKING[0]);
        } else {
            this.loadImages(this.IMAGES_WALKING);
            this.loadImage(this.IMAGES_WALKING[0]);
            this.speed = 3
        }

        this.audioSettings()
        this.animate();
    }


    animate() {
        this.enemyMoveInterval = setInterval(() => {
            if (!this.isHit && !MovableObject.charcterDead) {
                this.moveLeft();
            }
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyMoveInterval);

        this.enemyAnimationInterval = setInterval(() => {
            if (!this.isHit && !MovableObject.charcterDead) {
                if (this.isSmallChicken) {
                    this.playAnimation(this.SMALL_CHICKEN_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            } else if (this.isHit) {
                this.img.src = this.isSmallChicken ? this.SMALL_CHICKEN_DEAD : this.IMAGE_DEAD;
                if (!this.soundPlay) {
                    if (!World.isMuted) {
                        this.deadSound.play()
                    }
                    this.soundPlay = true
                }
            }
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyAnimationInterval);
    }


    audioSettings() {
        this.deadSound.volume = 0.2
    }
}
