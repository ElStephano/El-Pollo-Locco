let level1;

/**
 * Initialisiert das Level mit allen nötigen Spielobjekten:
 * - Gegner (Enemies)
 * - Endgegner (Endboss)
 * - Wolken (Clouds)
 * - Hintergrundebenen (BackgroundObjects)
 * - Statusleisten (Health, Coins, Bottles, Endboss-Health)
 * - Sammelbare Objekte (Bottles, Coins)
 * - Level-Ende Position
 */
function initLevel() {
    level1 = new Level(
        // 🐍 Gegner
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

        // ☁️ Wolken
        [
            new Cloud(300),
            new Cloud(1200),
            new Cloud(2200),
            new Cloud(3200),
            new Cloud(4200)
        ],

        // 🏞 Hintergrundobjekte (jeweils air + 3 Ebenen pro Segment)
        [
            // Segment 1 (vor dem Start sichtbar)
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
            new BackgroundObject('img/5_background/layers/air.png', 2156),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2156),

            // Segment 6
            new BackgroundObject('img/5_background/layers/air.png', 2875),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2875),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2875),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2875),

            // Segment 7
            new BackgroundObject('img/5_background/layers/air.png', 3549),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3549),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3549),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3549)
        ],

        // ❤️ Statusleiste Gesundheit (Spieler)
        new StatusbarHealth(),

        // 🍼 Statusleiste Flaschen
        new StatusBarBottle(),

        // 🪙 Statusleiste Münzen
        new StatusBarCoin(),

        // 💀 Endboss-Lebensanzeige
        new StatusbarHealthEndboss(),

        // ✨ Sammelbare Objekte (Flaschen und Münzen)
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

        // 🏁 Level-Ende X-Position
        3549
    );
}
