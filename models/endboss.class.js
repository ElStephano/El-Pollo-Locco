/**
 * Repräsentiert den Endboss des Spiels. Der Endboss kann gehen, sich verletzen, angreifen und sterben.
 * Er hat mehrere Animationsphasen: Gehen, Alarmieren, Angreifen, Verletzen und Sterben.
 */
class Endboss extends MovableObject {

    /**
     * Die Höhe des Endbosses.
     * @type {number}
     */
    height = 400;

    /**
     * Die Breite des Endbosses.
     * @type {number}
     */
    width = 300;

    /**
     * Die y-Koordinate des Endbosses.
     * @type {number}
     */
    y = 45;

    /**
     * Die Energie des Endbosses.
     * @type {number}
     */
    energy = 100;

    /**
     * Der Index des aktuellen Animationsbildes des Endbosses.
     * @type {number}
     */
    currentEndbossImage = 0;

    /**
     * Gibt an, ob der Endboss die Richtung gewechselt hat.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Gibt an, ob der Endboss getroffen wurde.
     * @type {boolean}
     */
    isHit = false;

    /**
     * Das Hauptintervall für die Endboss-Animation.
     * @type {number | null}
     */
    mainInterval = null;

    /**
     * Das aktuelle Animationsintervall des Endbosses.
     * @type {number | null}
     */
    currentAnimationInterval = null;

    /**
     * Die aktuelle Animation des Endbosses.
     * @type {Function | null}
     */
    currentAnimation = null;

    /**
     * Das Intervall zur Überprüfung des Endboss-Status.
     * @type {number | null}
     */
    checkInterval = null;

    /**
     * Das Intervall für den Y-Offset des toten Endbosses.
     * @type {number | null}
     */
    deadIntervalY = null;

    /**
     * Das Intervall für die Gehanimation des Endbosses.
     * @type {number | null}
     */
    walkingInterval = null;

    /**
     * Das Intervall für die Verletzungsanimation des Endbosses.
     * @type {number | null}
     */
    isHurtInterval = null;

    /**
     * Die Bilder für die Geh-Animation des Endbosses.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * Die Bilder für die Alarm-Animation des Endbosses.
     * @type {Array<string>}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Die Bilder für die Todes-Animation des Endbosses.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Die Bilder für die Verletzungs-Animation des Endbosses.
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Die Bilder für die Angriffs-Animation des Endbosses.
     * @type {Array<string>}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Offset-Werte für die Kollisionserkennung.
     * @type {Object}
     */
    offset = {
        'top': 80,
        'right': 40,
        'bottom': 100,
        'left': 20,
    };

    /**
     * Erzeugt eine Instanz des Endbosses.
     * Der Endboss wird initial auf einer bestimmten Position und mit einer bestimmten Geschwindigkeit platziert.
     * @constructor
     */
    constructor() {
        super();
        this.loadAllImages();
        this.x = 3000;
        this.speed = 20;
        this.checkStatsInterval();
    }

    /**
     * Lädt alle Bilder für die Animationen des Endbosses.
     */
    loadAllImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Startet die Alarm-Animation des Endbosses.
     */
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
            this.endAlertAnimation(i);
        }, 300);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Startet die Gehanimation des Endbosses.
     */
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
            this.endWalkingAnimation(i);
        }, 70);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Startet die Angriffs-Animation des Endbosses.
     */
    startAttackAnimation() {
        let i = 0;
        this.currentAnimation = () => this.startWalkingAnimation();
        this.currentAnimationInterval = setInterval(() => {
            if (this.shouldStopAttackAnimation(i)) return;
            this.playAnimationEndboss(this.IMAGES_ATTACK, i);
            this.endbossWalkingMovement(i);
            this.endbossAttackSound(i);
            i++;
        }, 1000 / 7);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Überprüft, ob die Angriffs-Animation gestoppt werden soll.
     * @param {number} i - Der aktuelle Index der Animation.
     * @returns {boolean} - Gibt zurück, ob die Animation gestoppt werden soll.
     */
    shouldStopAttackAnimation(i) {
        if (i === this.IMAGES_ATTACK.length) {
            clearInterval(this.currentAnimationInterval);
            this.animateEndboss();
            return true;
        }
        if (this.isHit) {
            clearInterval(this.currentAnimationInterval);
            this.interruptForHurt();
            return true;
        }
        return false;
    }

    /**
     * Bewegt den Endboss während des Angriffs.
     * @param {number} i - Der aktuelle Index der Animation.
     */
    endbossWalkingMovement(i) {
        if (i > 3 && i < 7) {
            this.x += this.otherDirection ? 80 : -80;
        }
    }

    /**
     * Spielt den Angriffssound des Endbosses ab.
     * @param {number} i - Der aktuelle Index der Animation.
     */
    endbossAttackSound(i) {
        if (i === 3) {
            if (!World.isMuted) {
                this.endbossJumpSound.play();
            }
        }
    }

    /**
     * Unterbricht die Animation des Endbosses, wenn er verletzt wurde.
     */
    interruptForHurt() {
        this.isHit = false;
        let i = 0;
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimationEndboss(this.IMAGES_HURT, i);
            i++;
            if (i === this.IMAGES_HURT.length) {
                this.returnToAnimation();
            }
        }, 120);
        MovableObject.endbossIntervals.push(this.currentAnimationInterval);
    }

    /**
     * Setzt die Animation des Endbosses zurück.
     */
    returnToAnimation() {
        clearInterval(this.currentAnimationInterval);
        if (this.currentAnimation) {
            this.currentAnimation();
        }
    }

    /**
     * Überprüft regelmäßig den Status des Endbosses und startet gegebenenfalls Animationen oder Richtungswechsel.
     */
    checkStatsInterval() {
        this.checkInterval = setInterval(() => {
            this.switchDirection();
            this.endbossIsDead();
            this.startEndbossAnimations();
        }, 1000 / 10);
        MovableObject.endbossIntervals.push(this.checkInterval);
    }

    /**
     * Überprüft, ob der Endboss gestorben ist.
     */
    endbossIsDead() {
        if (this.energy <= 0) {
            this.endOfGame();
            let i = 0;
            this.currentAnimationInterval = setInterval(() => {
                if (i < this.IMAGES_DEAD.length) {
                    this.animateDead(i);
                    i++;
                } else {
                    this.finalStats();
                }
            }, 100);
            MovableObject.endbossIntervals.push(this.currentAnimationInterval);
        }
    }

    /**
     * Führt die Todesanimation des Endbosses aus.
     * @param {number} i - Der aktuelle Index der Todes-Animation.
     */
    animateDead(i) {
        this.playAnimationEndboss(this.IMAGES_DEAD, i);
        this.endbossDeadSpeedY();
    }

    /**
     * Zeigt nach dem Tod des Endbosses die Endwerte und beendet das Spiel.
     */
    finalStats() {
        setTimeout(() => {
            this.showStats();
            clearInterval(this.currentAnimationInterval);
            Character.endbossIsAnimate = false;
        }, 500);
    }

    /**
     * Beendet das Spiel und stoppt alle Endboss-Animationen.
     */
    endOfGame() {
        MovableObject.endbossDead = true;
        this.stopAllIntervals();
        this.hideTouch();
        if (!World.isMuted) {
            this.endbossDying.play();
        }
        World.killedEnemies += 1;
    }

    /**
     * Beendet die Alarm-Animation, wenn alle Bilder abgespielt wurden.
     * @param {number} i - Der aktuelle Index der Alarm-Animation.
     */
    endAlertAnimation(i) {
        if (i >= this.IMAGES_ALERT.length) {
            clearInterval(this.currentAnimationInterval);
            this.startWalkingAnimation();
        }
    }

    /**
     * Beendet die Gehanimation, wenn alle Bilder abgespielt wurden.
     * @param {number} i - Der aktuelle Index der Geh-Animation.
     */
    endWalkingAnimation(i) {
        if (i >= 20) {
            clearInterval(this.currentAnimationInterval);
            this.startAttackAnimation();
        }
    }

    /**
     * Spielt eine Animation des Endbosses ab.
     * @param {Array<string>} images - Die Liste der Bilder der Animation.
     * @param {number} index - Der Index des aktuellen Bildes.
     */
    playAnimationEndboss(images, index) {
        let path = images[index % images.length];
        this.img = this.imageCache[path];
    }

    /**
     * Wechselt die Richtung des Endbosses, wenn er eine bestimmte Position erreicht.
     */
    switchDirection() {
        if (this.x <= 1000) {
            this.endbossOtherDirection(-15, true);
        } else if (this.x >= 2500) {
            this.endbossOtherDirection(15, false);
        }
    }

    /**
     * Setzt die Geschwindigkeit und die Richtung des Endbosses.
     * @param {number} i - Die Geschwindigkeit.
     * @param {boolean} direction - Die Richtung des Endbosses (true = nach rechts, false = nach links).
     */
    endbossOtherDirection(i, direction) {
        this.otherDirection = direction;
        this.speed = i;
    }

    /**
     * Setzt die Y-Position des toten Endbosses, um einen Fall zu simulieren.
     */
    endbossDeadSpeedY() {
        setTimeout(() => {
            this.deadIntervalY = setInterval(() => {
                this.y += 10;
            }, 1000 / 30);
            setTimeout(() => {
                clearInterval(this.deadIntervalY);
            }, 2000);
        }, 300);
        MovableObject.endbossIntervals.push(this.deadIntervalY);
    }

    /**
     * Startet alle Animationen des Endbosses, wenn das Spiel beginnt.
     */
    startEndbossAnimations() {
        if (Character.endbossStart && !Character.endbossIsAnimate) {
            this.animateEndboss();
            Character.endbossStart = false;
            Character.endbossIsAnimate = true;
        }
    }
}