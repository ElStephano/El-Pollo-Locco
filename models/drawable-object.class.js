/**
 * Die Klasse `DrawableObject` stellt Objekte dar, die auf dem Canvas gezeichnet werden können.
 * Sie enthält Funktionen zum Laden von Bildern, Zeichnen von Objekten und das Zeichnen von Rahmen und inneren Rahmen für verschiedene Objektarten.
 */
class DrawableObject {
    
    /**
     * Das Bild, das für das Objekt verwendet wird.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Der Cache für die Bilder des Objekts.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Der Index des aktuellen Bildes des Objekts.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Die x-Koordinate des Objekts.
     * @type {number}
     */
    x = 120;

    /**
     * Die y-Koordinate des Objekts.
     * @type {number}
     */
    y = 280;

    /**
     * Die Höhe des Objekts.
     * @type {number}
     */
    height = 150;

    /**
     * Die Breite des Objekts.
     * @type {number}
     */
    width = 100;

    /**
     * Lädt ein Bild für das Objekt.
     * @param {string} path Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Zeichnet das Objekt auf dem Canvas.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem das Objekt gezeichnet wird.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen Rahmen um das Objekt, wenn es eine Instanz von `Enemy`, `CollectibleObject`, `Character`, `Endboss` oder `ThrowableObject` ist.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der Rahmen gezeichnet wird.
     */
    drawFrame(ctx) {
        if (this instanceof Enemy || this instanceof CollectibleObject ||
            this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Zeichnet einen inneren Rahmen für verschiedene Objekttypen, um zusätzliche Details hervorzuheben.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der innere Rahmen gezeichnet wird.
     */
    drawInnerFrame(ctx) {
        if (this instanceof Character) {
            this.drawInnerRectCharacter(ctx);
        } else if (this instanceof Enemy || this instanceof CollectibleObject) {
            this.drawInnerRectEnemyOrCollectible(ctx);
        } else if (this instanceof Endboss) {
            this.drawInnerRectEndboss(ctx);
        } else if (this instanceof ThrowableObject) {
            this.drawInnerRectThrowableObject(ctx);
        }
    }

    /**
     * Zeichnet den inneren Rahmen für ein `ThrowableObject`.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der innere Rahmen gezeichnet wird.
     */
    drawInnerRectThrowableObject(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Zeichnet den inneren Rahmen für ein `Character`.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der innere Rahmen gezeichnet wird.
     */
    drawInnerRectCharacter(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Zeichnet den inneren Rahmen für ein `Enemy` oder `CollectibleObject`.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der innere Rahmen gezeichnet wird.
     */
    drawInnerRectEnemyOrCollectible(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Zeichnet den inneren Rahmen für ein `Endboss`.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem der innere Rahmen gezeichnet wird.
     */
    drawInnerRectEndboss(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Zeichnet ein rotes Rechteck als inneren Rahmen des Objekts.
     * @param {CanvasRenderingContext2D} ctx Der Canvas-Kontext, auf dem das rote Rechteck gezeichnet wird.
     */
    drawRedRect(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right,
            this.height - this.offset.bottom
        );
        ctx.stroke();
    }

    /**
     * Lädt mehrere Bilder und speichert sie im Image-Cache.
     * @param {Array<string>} arr Ein Array von Bildpfaden, die geladen werden sollen.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
