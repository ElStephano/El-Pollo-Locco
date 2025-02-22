class DrawableObject {
    img
    imageCache = {}
    currentImage = 0
    x = 120
    y = 280
    height = 150
    width = 100


    loadImage(path) {
        this.img = new Image()
        this.img.src = path
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Enemy || this instanceof CollectibleObject || this instanceof Character || this instanceof Endboss) {
            ctx.beginPath()
            ctx.lineWidth = '1'
            ctx.strokeStyle = 'blue'
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
        }
    }


    drawInnerFrame(ctx) {
        if (this instanceof Character) {
            this.drawInnerRectCharacter(ctx);
        } else if (this instanceof Enemy || this instanceof CollectibleObject) {
            this.drawInnerRectEnemyOrCollectible(ctx);
        } else if (this instanceof Endboss) {
            this.drawInnerRectEndboss(ctx);
        }
    }


    drawInnerRectCharacter(ctx) {
        this.drawRedRect(ctx);
    }


    drawInnerRectEnemyOrCollectible(ctx) {
        this.drawRedRect(ctx);
    }


    drawInnerRectEndboss(ctx) {
        this.drawRedRect(ctx);
    }


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


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img
        })
    }
}