/**
 * Klasse, die ein Objekt beschreibt, das geworfen werden kann.
 * Erbt von der Klasse `MovableObject` und stellt ein geworfenes Objekt (z.B. eine Flasche) dar.
 * Das Objekt kann geworfen werden, trifft auf Hindernisse und spielt eine Animation ab, wenn es trifft.
 */
class ThrowableObject extends MovableObject {
    /**
     * @type {boolean} Gibt an, ob das Objekt getroffen wurde.
     */
    isHit = false;

    /**
     * @type {string[]} Liste der Bildpfade für die Rotationsanimation der Flasche.
     */
    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * @type {string[]} Liste der Bildpfade für die Spritzanimation der Flasche, wenn sie getroffen wurde.
     */
    IMAGES_BOTTLE_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * @type {Object} Offset-Werte, die die Position des Objekts beeinflussen.
     * @property {number} top Abstand von der oberen Kante.
     * @property {number} right Abstand von der rechten Kante.
     * @property {number} bottom Abstand von der unteren Kante.
     * @property {number} left Abstand von der linken Kante.
     */
    offset = {
        'top': 10,
        'right': 20,
        'bottom': 20,
        'left': 10
    };

    /**
     * Erstellt ein neues `ThrowableObject` an den angegebenen Positionen.
     * 
     * @param {number} x - Die X-Position des Objekts.
     * @param {number} y - Die Y-Position des Objekts.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_HIT);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.throwInterval = null;
        this.animationInterval = null;
        this.gravityInterval = null;
        this.throw(x, y + 120);
    }

    /**
     * Wirft das Objekt in die angegebene Richtung.
     * 
     * @param {number} x - Die X-Position, in die das Objekt geworfen wird.
     * @param {number} y - Die Y-Position, in die das Objekt geworfen wird.
     */
    throw(x, y) {
        let direction = world.character.otherDirection;
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.speedX = 30;
        this.applyGravity();
        this.throwedDirection(direction);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROW);
        }, 1000 / 20);
    }

    /**
     * Bestimmt die Richtung, in die das Objekt geworfen wird.
     * 
     * @param {boolean} direction - Gibt an, ob das Objekt nach links oder rechts geworfen wird.
     */
    throwedDirection(direction) {
        if (!direction) {
            this.throwRightDirection();
        } else if (direction) {
            this.throwLeftDirection();
        }
    }

    /**
     * Wirft das Objekt nach rechts.
     */
    throwRightDirection() {
        this.throwInterval = setInterval(() => {
            this.x += 25;
        }, 50);
    }

    /**
     * Wirft das Objekt nach links.
     */
    throwLeftDirection() {
        this.throwInterval = setInterval(() => {
            this.x -= 25;
        }, 50);
    }

    /**
     * Wird aufgerufen, wenn das Objekt auf ein anderes Objekt trifft.
     * Stoppt die Bewegung und spielt die Trefferanimation ab.
     * 
     * @param {number} x - Die X-Position des Treffers.
     * @param {number} y - Die Y-Position des Treffers.
     */
    bottleHit(x, y) {
        this.isHit = true;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
        this.playHitAnimation();
    }

    /**
     * Startet die Animation, die abgespielt wird, wenn die Flasche getroffen wird.
     */
    playHitAnimation() {
        let frameCount = 0;
        let maxFrames = this.IMAGES_BOTTLE_HIT.length;
        let hitAnimationInterval = setInterval(() =>
            this.updateHitAnimation(hitAnimationInterval, frameCount++, maxFrames), 250);
    }

    /**
     * Aktualisiert die Hit-Animation während der Spielzeit.
     * 
     * @param {number} interval - Das Intervall für die Animationsaktualisierung.
     * @param {number} frameCount - Der aktuelle Frame in der Animation.
     * @param {number} maxFrames - Die maximale Anzahl der Frames in der Animation.
     */
    updateHitAnimation(interval, frameCount, maxFrames) {
        this.playAnimation(this.IMAGES_BOTTLE_HIT);
        if (frameCount >= maxFrames) {
            this.removeAfterAnimation(interval);
        }
    }

    /**
     * Entfernt das Objekt nach dem Ende der Trefferanimation.
     * 
     * @param {number} interval - Das Intervall der Animationsaktualisierung, das gestoppt wird.
     */
    removeAfterAnimation(interval) {
        clearInterval(interval);
        let index = world.throwableObjects.indexOf(this);
        if (index !== -1) {
            world.throwableObjects.splice(index, 1);
            this.imageCache = 0;
        }
    }
}