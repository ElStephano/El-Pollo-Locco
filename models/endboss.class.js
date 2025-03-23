class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 40;
    energy = 20;
    x = 2000;
    state = "alert"; // Mögliche States: alert, walking, attacking, dead
    animationPlaying = true
    otherDirection = false
    isHit = false


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
        this.speed = 15
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
        clearInterval(this.mainInterval);
        this.mainInterval = setInterval(() => {
            if (this.animationPlaying) return;
    
            // ZUERST prüfen, ob der Boss tot ist
            if (!this.isAlive()) {
                this.state = "dead";
                clearInterval(this.mainInterval);
                this.animationPlaying = true;
                this.playSingleRunAnimation(this.IMAGES_DEAD, () => {
                    setTimeout(() => {
                        this.animationPlaying = false;
                    }, 1000);
                });
                return; // Hier abbrechen, damit kein anderer Zustand mehr aktiviert wird!
            }
    
            switch (this.state) {
                case "alert":
                    this.animationPlaying = true;
                    this.clearAnimation();
                    this.playSingleRunAnimation(this.IMAGES_ALERT, () => {
                        setTimeout(() => {
                            this.state = "walking";
                            this.animationPlaying = false;
                        }, 500);
                    });
                    break;
    
                case "walking":
                    if (!this.animationPlaying) {
                        this.animationPlaying = true;
                        this.clearAnimation();
                        this.walkingAnimation(() => {
                            this.state = "attacking";
                            this.animationPlaying = false;
                        });
                    }
                    break;
    
                case "attacking":
                    if (!this.animationPlaying) {
                        this.animationPlaying = true;
                        this.clearAnimation();
                        this.playSingleRunAnimation(this.IMAGES_ATTACK, () => {
                            setTimeout(() => {
                                this.state = "walking";
                                this.animationPlaying = false;
                            }, 100);
                        });
                    }
                    break;
            }
            
            this.switchDirection();
        }, 200);
    }
    

    walkingAnimation(callback) {
        let i = 0;
        let interval = setInterval(() => {
            if (i < 10 && this.isAlive()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.x -= this.speed;
                i++;
            } else {
                clearInterval(interval);
                callback && callback();
            }
        }, 1000 / 10);
    }
    

    clearAnimation() {
        clearInterval(this.currentAnimationInterval);
        this.currentAnimationInterval = null;
    }
    

    playSingleRunAnimation(images, callback = null) {
        if (images.length === 0) return;
        
        this.clearAnimation(); // Verhindert Überlagerungen
        
        let i = 0;
        this.img = this.imageCache[images[i]]; // Setzt das erste Bild sofort
        
        this.currentAnimationInterval = setInterval(() => {
            if (i < images.length) {
                this.img = this.imageCache[images[i]];
                i++;
            } else {
                clearInterval(this.currentAnimationInterval);
                if (callback) callback();
            }
        }, 200);
    }
    

    switchDirection() {
        if (this.x <= 500) {
            this.endbossOtherDirection(-15, true)
        } else if (this.x >= 1500) {
            this.endbossOtherDirection(15, false)
        }
    }


    endbossOtherDirection(i, direction) {
        this.otherDirection = direction
        this.speed = i
    }
}