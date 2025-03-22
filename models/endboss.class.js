class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 40;
    energy = 100;
    x = 2000;
    state = "alert"; // Mögliche States: alert, walking, attacking, dead
    animationPlaying = true
    otherDirection = false


    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    offset = {
        'top': 80,
        'right': 40,
        'bottom': 100,
        'left': 20
    }


    constructor() {
        super()
        this.loadImagess();
        this.updateState();
        this.x = 1000
        this.speed = 2
    }

    loadImagess() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    updateState() {
        setInterval(() => {
            if (this.animationPlaying) return; // Keine neue Animation starten, wenn eine läuft

            switch (this.state) {
                case "alert":
                    this.animationPlaying = true
                    this.playSingleRunAnimation(this.IMAGES_ALERT, () => {
                        setTimeout(() => {
                            this.state = "walking"
                        }, 1000)
                        this.animationPlaying = false
                    })
                    break

                case "walking":
                    this.animationPlaying = true
                    this.walkingAnimation()
                    break

                case "attacking":
                    this.animationPlaying = true
                    this.playSingleRunAnimation(this.IMAGES_ATTACK, () => {
                        this.state = "walking"
                        this.animationPlaying = false
                    })
                    break;

                case "dead":
                    this.animationPlaying = true
                    this.playSingleRunAnimation(this.IMAGES_DEAD)
                    break
            }

            if (this.x <= 500) {
                this.endbossOtherDirection(-2, true)
            } else if (this.x >= 1500) {
                this.endbossOtherDirection(2, false)
            }

            if (this.energy <= 0) {
                this.state = "dead"
            }
        }, 200)

    }

    walkingAnimation() {
        let i = 0
        let interval = setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_WALKING);
                this.x -= this.speed;
                i++
                this.animationPlaying = false;
            } else {
                clearInterval(interval)
                i = 0
                setTimeout(() => {
                    this.state = "attacking";
                }, 1000)
            }
        }, 200)
    }


    endbossOtherDirection(i, direction) {
        this.otherDirection = direction
        this.speed = i
    }


    playSingleRunAnimation(images, callback = null) {
        let i = 0;
        let interval = setInterval(() => {
            if (i < images.length) {
                this.img = this.imageCache[images[i]];
                i++;
            } else {
                setTimeout(() => {
                    clearInterval(interval);
                    if (callback) callback();
                }, 500)
            }
        }, 200);
    }


}