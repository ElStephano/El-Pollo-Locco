/**
 * Die `Character`-Klasse repräsentiert den spielbaren Charakter im Spiel.
 * Sie erbt von `MovableObject` und steuert Bewegung, Animation, Interaktionen und Spielzustände.
 */
class Character extends MovableObject {

    /** Höhe der Spielfigur in Pixel. */
    height = 260;

    /** Breite der Spielfigur in Pixel. */
    width = 125;

    /** Y-Position der Spielfigur. */
    y = 150;

    /** Referenz zur Spielwelt. */
    world;

    /** Bewegungsgeschwindigkeit. */
    speed = 10;

    /** Lebensenergie des Charakters. */
    energy = 10;

    /** Gibt an, ob der Charakter gerade springt. */
    isJumping = false;

    /** Soundeffekt beim Springen. */
    jumpSound = new Audio('audio/charachterJump.mp3');

    /** Soundeffekt beim Sterben. */
    deadSound = new Audio('audio/characterDying.mp3');

    /** Soundeffekt beim langen Inaktivitätszustand. */
    snoring = new Audio('audio/snoring.mp3');

    /** Gibt an, ob der Charakter getroffen wurde. */
    isHit = false;

    /** Steuert, ob der Endgegner aktiviert wurde. */
    static endbossStart = false;

    /** Gibt an, ob die Endboss-Animation läuft. */
    static endbossIsAnimate = false;

    /** Letzter Tastendruck-Zeitpunkt zur Erkennung von Inaktivität. */
    lastKeyPressTime = Date.now();

    /** Intervall für Idle-Animation. */
    idleInterval = null;

    /** Intervall für Long-Idle-Animation. */
    longIdleInterval = null;

    /** Gibt an, ob der Charakter gerade schnarcht. */
    isSnoring = false;

    /** Flag für das Anzeigen des Game Over Screens. */
    showGameOverScreen = false;

    /** Ob die Hurt-Animation aktuell läuft. */
    isHurtAnimating = false;

    /** Offset zur Kollisionserkennung. */
    offset = {
        'top': 120,
        'right': 60,
        'bottom': 130,
        'left': 20
    };

    /** Bildpfade für Idle-, Jump-, Hurt-, Death-Animationen etc. */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    /**
         * Konstruktor lädt alle Bilder und initialisiert Physik, Animationen und Inaktivitätsprüfung.
         */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.applyGravity()
        this.checkInactivity()
        this.animate()
    }

    /**
 * Startet alle Bewegungs- und Animations-Intervalle des Charakters.
 */
    animate() {
        let moveInterval = setInterval(() => {
            this.movement()
        }, 1000 / 30);
        MovableObject.characterIntervals.push(moveInterval)

        let animationInterval = setInterval(() => {
            this.animateCharacter()
        }, 1000 / 20);
        MovableObject.characterIntervals.push(animationInterval)

        let jumpingInterval = setInterval(() => {
            this.jumpingAnimation()
        }, 1000 / 10)
        MovableObject.characterIntervals.push(jumpingInterval)
    }

    /**
     * Verarbeitet Bewegungslogik abhängig von Tasteneingaben und Spiellogik.
     */
    movement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive()) {
            this.movementRight()
        }
        if (this.world.keyboard.LEFT && this.x > 0 && this.isAlive()) {
            this.movementLeft()
        }
        if (this.world.keyboard.UP && !this.isJumping && this.isAlive()) {
            this.movementJump()
        }
        if (this.x === 500 && this.isAlive()) {
            this.activateEndboss()
        }
        this.world.camera_x = -this.x + 100
    }

    /**
      * Führt Sprunganimation aus, wenn Charakter springt.
      */
    jumpingAnimation() {
        if (this.isJumping && this.isAlive() && !this.isHurtAnimating) {
            this.playSingleJumpAnimation(this.IMAGES_JUMPING)
        }
    }

    /**
     * Führt Bewegung nach rechts aus.
     */
    movementRight() {
        this.moveRight()
        this.otherDirection = false
        this.resetInactivityTimer()
    }

    /**
     * Führt Bewegung nach links aus.
     */
    movementLeft() {
        this.moveLeft()
        this.otherDirection = true
        this.resetInactivityTimer()
    }

    /**
     * Führt Sprungbewegung aus.
     */
    movementJump() {
        this.jump()
        this.resetInactivityTimer()
    }

    /**
     * Aktiviert den Endgegner, sobald der Spieler eine bestimmte X-Position erreicht.
     */
    activateEndboss() {
        let endbossIndex = this.world.level.enemies.length - 1
        let endboss = this.world.level.enemies[endbossIndex]
        endboss.animationPlaying = false
    }

    /**
     * Steuert die laufende Animation basierend auf Zustand des Charakters.
     */
    animateCharacter() {
        if (this.isHurt() && this.isAlive() && !this.isHurtAnimating) {
            this.hurtAnimation()
        }
        if (this.walking()) {
            this.playAnimation(this.IMAGES_WALKING)
        }
        if (this.isDead()) {
            this.gameOver()
        }
        this.startEndboss()
    }

    /**
     * Führt den Game-Over-Prozess aus.
     */
    gameOver() {
        if (!MovableObject.characterDead && this.isDead()) {
            this.deactivateControl()
        }
        this.playSingleDeadAnimation(this.IMAGES_DEAD)
        setTimeout(() => {
            this.stopAllIntervals()
            this.resetVariables()
        }, 3000)
    }

    /**
      * Deaktiviert Steuerung und spielt Sterbesound.
      */
    deactivateControl() {
        this.currentImage = 0
        MovableObject.characterDead = true
        this.hideTouch()
        if (!World.isMuted) {
            this.deadSound.play()
        }
        setTimeout(() => {
            if (!World.isMuted) {
                this.gameOverSound.play()
            }
        }, 500)
    }

    /**
    * Prüft ob Charakter läuft.
    * @returns {boolean}
    */
    walking() {
        return this.world.keyboard.RIGHT && !this.isAboveGround() && this.isAlive() && !this.isHurtAnimating ||
            this.world.keyboard.LEFT && !this.isAboveGround() && this.isAlive() && !this.isHurtAnimating

    }

    /**
     * Führt Hurt-Animation aus, wenn der Charakter getroffen wird.
     */
    hurtAnimation() {
        this.isHurtAnimating = true
        this.currentImage = 0
        let hurtDuration = 1000
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT)
        }, 1000 / 10)
        MovableObject.characterIntervals.push(hurtInterval)

        setTimeout(() => {
            clearInterval(hurtInterval)
            this.isHurtAnimating = false
        }, hurtDuration)
    }

    /**
     * Setzt den Timer für Inaktivität zurück.
     */
    resetInactivityTimer() {
        this.lastKeyPressTime = Date.now()
        if (this.idleInterval) {
            clearInterval(this.idleInterval)
            clearInterval(this.longIdleInterval)
            this.idleInterval = null
            this.longIdleInterval = null
        }
        this.isIdle = false
        this.isLongIdle = false
        this.resetSnoring()
    }

    /**
     * Startet Überwachung auf Inaktivität (für Idle-Animationen).
     */
    checkInactivity() {
        let idleInterval = setInterval(() => {
            this.resetSnoring()
            let currentTime = Date.now()
            if (currentTime - this.lastKeyPressTime > 100 && !this.isIdle && !this.isLongIdle) {
                this.playIdleAnimation(this.IMAGES_IDLE)
            } else if (currentTime - this.lastKeyPressTime > 7000) {
                if (!this.isLongIdle) {
                    clearInterval(this.idleInterval)
                    this.playLongIdleAnimation(this.IMAGES_LONG_IDLE)
                }
            }
        }, 1000 / 20);
        MovableObject.characterIntervals.push(idleInterval)
    }

    /**
      * Stoppt das Schnarchen.
      */
    resetSnoring() {
        if (!this.isLongIdle || this.isDead() || World.isMuted) {
            this.snoring.pause()
            this.snoring.currentTime = 0
        }
    }

    /**
     * Startet Idle-Animation bei kurzer Inaktivität.
     * @param {Array<string>} obj - Bildpfade
     */
    playIdleAnimation(obj) {
        if (!this.isIdle) {
            this.isIdle = true
            this.idleInterval = setInterval(() => {
                this.playAnimation(obj)
            }, 1000 / 10)
            MovableObject.characterIntervals.push(this.idleInterval)
        }
    }

    /**
     * Startet Long-Idle-Animation bei längerer Inaktivität.
     * @param {Array<string>} obj - Bildpfade
     */
    playLongIdleAnimation(obj) {
        if (this.isIdle) {
            this.isIdle = false
            this.isLongIdle = true
            if (!World.isMuted) {
                this.snoring.play()
                this.snoring.loop = true
            }
            this.longIdleInterval = setInterval(() => {
                this.playAnimation(obj)
            }, 1000 / 5)
            MovableObject.characterIntervals.push(this.longIdleInterval)
        }
    }

    /**
     * Spielt eine einfache Sprunganimation.
     * @param {Array<string>} images - Bildpfade
     */
    playSingleJumpAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
        } else if (!this.isAboveGround()) {
            this.resetJumpAnimation()
        }
    }

    /**
     * Spielt Sterbeanimation und zeigt Game Over Screen.
     * @param {Array<string>} images - Bildpfade
     */
    playSingleDeadAnimation(images) {
        if (this.currentImage < images.length) {
            this.singleRunFrames(images)
            this.y += 30
        } else {
            this.currentImage = 0
            if (!this.showGameOverScreen) {
                this.gameOverScreen()
                this.showGameOverScreen = true
            }
        }
    }

    /**
     * Wechselt die Bildframes durch.
     * @param {Array<string>} images - Bildpfade
     */
    singleRunFrames(images) {
        let path = images[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    /**
     * Setzt Sprunganimation zurück.
     */
    resetJumpAnimation() {
        this.isJumping = false
        this.currentImage = 0
    }

    /**
     * Löst den Sprung aus.
     */
    jump() {
        this.speedY = 30
        if (!World.isMuted) {
            this.jumpSound.play()
        }
        if (!this.isJumping) {
            this.isJumping = true
            this.currentImage = 0
        }
    }

    /**
     * Setzt globale Spielvariablen zurück (für Neustart).
     */
    resetVariables() {
        MovableObject.endbossIntervals = [];
        MovableObject.characterIntervals = [];
        MovableObject.enemyIntervals = [];
        MovableObject.endbossDead = false;
        MovableObject.characterDead = false;
        Character.endbossStart = false
        Character.endbossIsAnimate = false
    }

    /**
     * Startet Endboss-Mechanik, wenn Spieler weit genug gelaufen ist.
     */
    startEndboss() {
        if (this.x > 2500) {
            if (!Character.endbossStart)
                Character.endbossStart = true
        }
    }
}
