class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 45;
    energy = 100;
    currentEndbossImage = 0
    otherDirection = false
    isHit = false
    mainInterval = null
    currentAnimationInterval = null
    currentAnimation = null
    checkInterval = null
    deadIntervalY = null
    walkingInterval = null
    isHurtInterval = null



    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    offset = {
        'top': 80,
        'right': 40,
        'bottom': 100,
        'left': 20
    }


    constructor() {
        super()
        this.loadAllImages();
        // this.updateState();
        this.x = 3000
        this.speed = 20
        this.checkStatsInterval()
    }


    loadAllImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    animateEndboss() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();

        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_ALERT, i);

            if (this.isHit) {
                clearInterval(this.currentAnimationInterval);
                this.interruptForHurt();
                return;
            }

            i++;

            if (i >= this.IMAGES_ALERT.length) {
                clearInterval(this.currentAnimationInterval);
                this.startWalkingAnimation(); // danach Walking starten
            }
        }, 300); // Alert: 5 FPS

        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }


    startWalkingAnimation() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();

        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_WALKING, i);
            this.x -= this.speed;

            if (this.isHit) {
                clearInterval(this.currentAnimationInterval);
                this.interruptForHurt();
                return;
            }

            i++;

            if (i >= 20) { // z. B. 20 Frames lang laufen
                clearInterval(this.currentAnimationInterval);
                this.startAttackAnimation();
            }
        }, 70); // Walking: 10 FPS

        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }


    startAttackAnimation() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();

        this.currentAnimationInterval = setInterval(() => {
            if (i === this.IMAGES_ATTACK.length) {
                clearInterval(this.currentAnimationInterval);
                this.animateEndboss();
                return;
            }

            this.playAnimationEndboss(this.IMAGES_ATTACK, i);

            if (i > 3 && i < 7) {
                this.x += this.otherDirection ? 80 : -80;
            }

            if (i === 3) {
                if (!World.isMuted) {
                    this.endbossJumpSound.play()
                }
            }

            if (this.isHit) {
                clearInterval(this.currentAnimationInterval);
                this.interruptForHurt();
                return;
            }

            i++;
        }, 1000 / 7); // 12.5 FPS

        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }


    interruptForHurt() {
        this.isHit = false;
        let i = 0;

        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_HURT, i);
            i++;

            if (i === this.IMAGES_HURT.length) {
                clearInterval(this.currentAnimationInterval);

                if (this.currentAnimation) {
                    this.currentAnimation(); // Zurück zur vorherigen Animation
                }
            }
        }, 120); // z. B. 8 FPS

        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }


    checkStatsInterval() {
        this.checkInterval = setInterval(() => {
            this.switchDirection()
            this.endbossIsDead()
            this.startEndbossAnimations()
        }, 1000 / 10)
        MovableObject.endbossIntervals.push(this.checkInterval)
    }


    endbossIsDead() {
        if (this.energy <= 0) {
            MovableObject.endbossDead = true;
            this.stopAllIntervals();
            this.hideTouch()
            if (!World.isMuted) {
                this.endbossDying.play();
            }
            World.killedEnemies += 1;

            let i = 0;
            this.currentAnimationInterval = setInterval(() => {
                if (i < this.IMAGES_DEAD.length) {
                    this.playAnimationEndboss(this.IMAGES_DEAD, i);
                    this.endbossDeadSpeedY();
                    i++;
                } else {
                    setTimeout(() => {
                        this.showStats();
                        clearInterval(this.currentAnimationInterval);
                        Character.endbossIsAnimate = false
                        console.log('drin')
                    }, 500);
                }
            }, 100); // 10 FPS

            MovableObject.endbossIntervals.push(this.currentAnimationInterval);
        }
    }


    playAnimationEndboss(images, index) {
        let path = images[index % images.length];
        this.img = this.imageCache[path];
    }


    switchDirection() {
        if (this.x <= 1000) {
            this.endbossOtherDirection(-15, true)
        } else if (this.x >= 2500) {
            this.endbossOtherDirection(15, false)
        }
    }


    endbossOtherDirection(i, direction) {
        this.otherDirection = direction
        this.speed = i
    }


    endbossDeadSpeedY() {
        setTimeout(() => {
            this.deadIntervalY = setInterval(() => {
                this.y += 10
            }, 1000 / 30)
            setTimeout(() => {
                clearInterval(this.deadIntervalY)
            }, 2000)
        }, 300)
        MovableObject.endbossIntervals.push(this.deadIntervalY)
    }


    startEndbossAnimations() {
        if (Character.endbossStart && !Character.endbossIsAnimate) {
            this.animateEndboss()
            Character.endbossStart = false
            Character.endbossIsAnimate = true
        }
    }
}