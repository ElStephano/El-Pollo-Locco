let level1


function initLevel() {
        level1 = new Level(
        [
            new Enemy(this.x = 600),
            new Enemy(this.x = 800),
            new Enemy(this.x = 1600),
            new Enemy(this.x = 2000),
            new Enemy(this.x = 3000),
            new Enemy(this.x = 4000),
            new Enemy(this.x = 5000),
            new Enemy(this.x = 6000),
            new Enemy(this.x = 8000),
            new Enemy(this.x = 7000),
            new Endboss()
        ],
        [
            new Cloud(this.x = 300),
            new Cloud(this.x = 1200),
            new Cloud(this.x = 2200),
            new Cloud(this.x = 3200),
            new Cloud(this.x = 4200)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 1438),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438),
            new BackgroundObject('img/5_background/layers/air.png', 2156),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2156)
        ],
        new StatusbarHealth()
        ,

        new StatusBarBottle()
        ,

        new StatusBarCoin()
        ,
        [
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new Coins(this.x = 400, this.y = 150),
            new Coins(this.x = 450, this.y = 130),
            new Coins(this.x = 800, this.y = 200),
            new Coins(this.x = 1000, this.y = 250),
            new Coins(this.x = 1300, this.y = 250)
        ]
    )
}