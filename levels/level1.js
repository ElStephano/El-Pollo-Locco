let level1


function initLevel() {
        level1 = new Level(
        [
            new Enemy(600),
            new Enemy(800),
            new Enemy(1600),
            new Enemy(2000),
            new Enemy(3000),
            new Enemy(4000),
            new Enemy(5000),
            new Enemy(6000),
            new Enemy(8000),
            new Enemy(7000),
            new Endboss()
        ],
        [
            new Cloud(300),
            new Cloud(1200),
            new Cloud(2200),
            new Cloud(3200),
            new Cloud(4200)
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
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2156),

            new BackgroundObject('img/5_background/layers/air.png', 2875),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2875),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2875),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2875),
            new BackgroundObject('img/5_background/layers/air.png', 3549),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3549),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3549),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3549)
        ],
        new StatusbarHealth()
        ,

        new StatusBarBottle()
        ,

        new StatusBarCoin()
        ,

        new StatusbarHealthEndboss(),
        [
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new Coins(400, 150),
            new Coins(450, 130),
            new Coins(800, 200),
            new Coins(1000, 250),
            new Coins(1300, 250)
        ],

        2150
    )
}