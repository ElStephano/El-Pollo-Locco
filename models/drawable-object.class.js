/**
 * The `DrawableObject` class represents objects that can be drawn on the canvas.
 * It contains functions for loading images, drawing objects, and drawing borders and inner frames for different object types.
 */
class DrawableObject {
    
    /**
     * The image used for the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The cache for the object's images.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * The index of the object's current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The x-coordinate of the object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object.
     * @type {number}
     */
    y = 280;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * Loads an image for the object.
     * @param {string} path The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the object is drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a border around the object if it is an instance of `Enemy`, `CollectibleObject`, `Character`, `Endboss`, or `ThrowableObject`.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the border is drawn.
     */
    drawFrame(ctx) {
        if (this instanceof Enemy || this instanceof CollectibleObject ||
            this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws an inner frame for various object types to highlight additional details.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the inner frame is drawn.
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
     * Draws the inner frame for a `ThrowableObject`.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the inner frame is drawn.
     */
    drawInnerRectThrowableObject(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Draws the inner frame for a `Character`.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the inner frame is drawn.
     */
    drawInnerRectCharacter(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Draws the inner frame for an `Enemy` or `CollectibleObject`.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the inner frame is drawn.
     */
    drawInnerRectEnemyOrCollectible(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Draws the inner frame for an `Endboss`.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the inner frame is drawn.
     */
    drawInnerRectEndboss(ctx) {
        this.drawRedRect(ctx);
    }

    /**
     * Draws a red rectangle as the inner frame of the object.
     * @param {CanvasRenderingContext2D} ctx The canvas context on which the red rectangle is drawn.
     */
    drawRedRect(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'transparent';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right,
            this.height - this.offset.bottom
        );
        ctx.stroke();
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {Array<string>} arr An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}