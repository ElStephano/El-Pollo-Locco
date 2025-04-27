let level1;

/**
 * Initializes the level with all necessary game objects:
 * - Enemies
 * - Endboss
 * - Clouds
 * - Background layers (BackgroundObjects)
 * - Status bars (Health, Coins, Bottles, Endboss Health)
 * - Collectible items (Bottles, Coins)
 * - Level end position
 */
function initLevel() {
    level1 = new Level(
        // 🐍 Enemies
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

        // ☁️ Clouds
        [
            new Cloud(300),
            new Cloud(1200),
            new Cloud(2200),
            new Cloud(3200),
            new Cloud(4200)
        ],

        // 🏞 Background objects (each segment has air + 3 layers)
        [
            // Segment 1 (visible before the start)
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            // Segment 2
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            // Segment 3
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            // Segment 4
            new BackgroundObject('img/5_background/layers/air.png', 1438),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438),

            // Segment 5
            new BackgroundObject('img/5_background/layers/air.png', 2157),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157),

            // Segment 6
            new BackgroundObject('img/5_background/layers/air.png', 2876),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876),

            // Segment 7
            new BackgroundObject('img/5_background/layers/air.png', 3595),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3595),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3595),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3595)
        ],

        // ❤️ Health status bar (player)
        new StatusbarHealth(),

        // 🍼 Bottle status bar
        new StatusBarBottle(),

        // 🪙 Coin status bar
        new StatusBarCoin(),

        // 💀 Endboss health bar
        new StatusbarHealthEndboss(),

        // ✨ Collectible items (bottles and coins)
        [
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
            new CollectibleBottles(),
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
            new Coins(1000, 130),
            new Coins(1500, 150),
            new Coins(1900, 130),
            new Coins(2200, 130),
            new Coins(2400, 200),
            new Coins(2500, 130),
            new Coins(3000, 110)
        ],

        // 🏁 Level end X-position
        3549
    );
}
