class World {
    character = new Character();
    level = level1
    ctx
    canvas
    keyboard
    camera_x = 0
    healthStatusBar = new StatusbarHealth()
    bottleStatusBar = new StatusBarBottle()
    coinStatusBar = new StatusBarCoin()
    collectibleObject = [
        new CollectibleBottles(),
        new CollectibleBottles(),
        new CollectibleBottles(),
        new CollectibleBottles(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ]
    throwableObjects = []


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.draw()
        this.setWorld()
        this.run()
    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => { 
            this.checkColissions()
            this.checkThrowObjects()
        }, 500)
    }


    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x, this.character.y)
            this.throwableObjects.push(bottle)
        }
    }


    checkColissions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit()
                this.healthStatusBar.setPercentage(this.character.energy)
            }
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.healthStatusBar)
        this.addToMap(this.bottleStatusBar)
        this.addToMap(this.coinStatusBar)   
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.collectibleObject)

        this.addObjectsToMap(this.throwableObjects)

        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)
        mo.drawInnerFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save()
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        this.ctx.restore()
        mo.x = mo.x * -1
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }
}