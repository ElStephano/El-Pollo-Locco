/**
 * Repräsentiert einen feindlichen Charakter im Spiel, der sich bewegen und angreifen kann.
 * Es gibt zwei Typen von Feinden: kleine Hühner und große Hühner. Der Feind kann sich in beide Richtungen bewegen 
 * und hat eine Animation, die zeigt, wie er läuft und stirbt.
 */
class Enemy extends MovableObject {

    /**
     * Die Höhe des Feindes.
     * @type {number}
     */
    height = 100;

    /**
     * Die Breite des Feindes.
     * @type {number}
     */
    width = 100;

    /**
     * Die y-Koordinate des Feindes.
     * @type {number}
     */
    y = 330;

    /**
     * Gibt an, ob der Feind getroffen wurde.
     * @type {boolean}
     */
    isHit = false;

    /**
     * Das Intervall für die Feindbewegungsanimation.
     * @type {number | null}
     */
    enemyAnimationInterval = null;

    /**
     * Das Intervall für die Feindbewegung.
     * @type {number | null}
     */
    enemyMoveInterval = null;

    /**
     * Gibt an, ob der Feind ein kleines Huhn ist.
     * @type {boolean}
     */
    isSmallChicken = false;

    /**
     * Das Audioobjekt für den Tod des Feindes.
     * @type {Audio}
     */
    deadSound = new Audio('audio/dead_chicken.mp3');

    /**
     * Ein Wert, der angibt, ob der Tod-Sound bereits abgespielt wurde.
     * @type {boolean}
     */
    soundPlay = false;

    /**
     * Die Animationsbilder für das Gehen eines großen Huhns.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Das Bild für das Totbild eines großen Huhns.
     * @type {string}
     */
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Die Animationsbilder für das Gehen eines kleinen Huhns.
     * @type {Array<string>}
     */
    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Das Bild für das Totbild eines kleinen Huhns.
     * @type {string}
     */
    SMALL_CHICKEN_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Die Offset-Werte für die Kollisionserkennung.
     * @type {Object}
     */
    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };

    /**
     * Erzeugt eine Instanz eines Feindes.
     * Der Feind kann entweder ein kleines oder ein großes Huhn sein, das zufällig bestimmt wird.
     * @param {number} x - Die x-Koordinate des Feindes.
     * @constructor
     */
    constructor(x) {
        super();
        this.isSmallChicken = Math.random() < 0.5;
        this.x = x;
        if (this.isSmallChicken) {
            this.createSmallChicken();
        } else {
            this.createLargeChicken();
        }
        this.audioSettings();
        this.animate();
    }

    /**
     * Initialisiert das kleine Huhn.
     */
    createSmallChicken() {
        this.speed = 2;
        this.height = 80;
        this.width = 80;
        this.y = 350;
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImage(this.SMALL_CHICKEN_WALKING[0]);
    }

    /**
     * Initialisiert das große Huhn.
     */
    createLargeChicken() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.speed = 3;
    }

    /**
     * Startet die Animationen und Bewegungen des Feindes.
     */
    animate() {
        this.enemyMoveInterval = setInterval(() => {
            this.enemiesMovement();
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyMoveInterval);

        this.enemyAnimationInterval = setInterval(() => {
            this.animateEnemies();
        }, 1000 / 30);
        MovableObject.enemyIntervals.push(this.enemyAnimationInterval);
    }

    /**
     * Bestimmt die Bewegung des Feindes.
     * Wenn der Feind nicht getroffen wurde, bewegt er sich nach links.
     */
    enemiesMovement() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.moveLeft();
        }
    }

    /**
     * Bestimmt, welche Animation für den Feind gespielt wird (Gehen oder Tot).
     */
    animateEnemies() {
        if (!this.isHit && !MovableObject.charcterDead) {
            this.animateWalkingEnemies();
        } else if (this.isHit) {
            this.animateDeadEnemies();
        }
    }

    /**
     * Spielt die Tot-Animation des Feindes ab und spielt den Tod-Sound ab.
     */
    animateDeadEnemies() {
        this.img.src = this.isSmallChicken ? this.SMALL_CHICKEN_DEAD : this.IMAGE_DEAD;
        if (!this.soundPlay) {
            if (!World.isMuted) {
                this.deadSound.play();
            }
            this.soundPlay = true;
        }
    }

    /**
     * Spielt die Gehen-Animation des Feindes ab.
     */
    animateWalkingEnemies() {
        if (this.isSmallChicken) {
            this.playAnimation(this.SMALL_CHICKEN_WALKING);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Setzt die Audio-Einstellungen für den Tod des Feindes.
     */
    audioSettings() {
        this.deadSound.volume = 0.2;
    }
}

