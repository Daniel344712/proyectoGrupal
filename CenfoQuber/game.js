import { BronzeCoin } from "./Patrones/PatronPrototipo/Prototipo/BronzeCoin.js";
import { Gestor } from "./Patrones/PatronPrototipo/Principal/Gestor.js";
import { ScenePractice } from "./Patrones/Proxy/ScenePractice.js";
import { SceneGoodGame } from "./Patrones/Proxy/SceneGoodGame.js";
import { SceneNextLevel } from "./Patrones/Proxy/SceneNextLevel.js";
import { GestorProxy } from "./Patrones/Proxy/Gestor/Gestor.js";

let game;
let sceneGestor;
let gameOptions = {

    // hero horizontal speed, in pixels per second
    heroSpeed: 200,
    enemySpeed: 200
}

window.onload = function () {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x444444,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 640,
            height: 480
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: playGame
    }
    game = new Phaser.Game(gameConfig);

    var scenePractice = new ScenePractice();
    var sceneNextLevel = new SceneNextLevel();
    var sceneGoodGame = new SceneGoodGame();
    game.scene.add("ScenePractice", scenePractice);
    game.scene.add("SceneNextLevel", sceneNextLevel);
    game.scene.add("SceneGoodGame", sceneGoodGame);
    sceneGestor = new GestorProxy(scenePractice, sceneNextLevel, sceneGoodGame);
}

class playGame extends Phaser.Scene {
    /**  * @type {Gestor}  */
    #gestorMonedas;

    /**  * @type {BronzeCoin}  */
    #BronzeCoin

    constructor() {
        super("PlayGame");
    }
    preload() {
        //instanciar el objeto de la clase Gestor para cargar las monedas bronce, silver y golden
        this.load.image("bronze", "Bronze_Coin.png");
        this.load.image("silver", "Silver_Coin.png");
        this.load.image("golden", "Gold_Coin.png");
        this.load.tilemapTiledJSON("level", "level.json");
        this.load.image("tile", "tile.png");
        this.load.image("hero", "hero.png");
        this.load.image("enemy", "enemy.png");

    }
    create() {
        this.#gestorMonedas = new Gestor(this);

        // creation of "level" tilemap
        this.map = this.make.tilemap({
            key: "level"
        });

        // add tiles to tilemap
        let tile = this.map.addTilesetImage("tileset01", "tile");

        // which layers should we render? That's right, "layer01"
        this.layer = this.map.createStaticLayer("layer01", tile);

        // layer (wall) is enabled for collision
        this.layer.setCollision(1);

        // add the hero sprite and enable arcade physics for the hero
        this.hero = this.physics.add.sprite(260, 376, "hero");
        //add the enemy sprite and enable arcade physics for the enemy
        this.enemy = this.physics.add.sprite(400, 420, "enemy");
        //add the bronze coin sprite and enable arcade physics for the bronze coin
        this.bronze = this.#gestorMonedas.nuevaMoneda("Bronce");// this.physics.add.sprite(100, 100, "bronze").setScale(0.1);
        this.bronze.getAsset().setPosition(100, 100);

        this.silver = this.#gestorMonedas.nuevaMoneda("Plata");// this.physics.add.sprite(100, 100, "bronze").setScale(0.1);
        this.silver.getAsset().setPosition(200, 300);

        this.golden = this.#gestorMonedas.nuevaMoneda("Oro");// this.physics.add.sprite(100, 100, "bronze").setScale(0.1);
        this.golden.getAsset().setPosition(300, 500);

        this.score = 0;
        this.scoreText = this.add.text(50, 30, this.score, { fontSize: '32px', fill: 'white' });

        this.text = this.add.text(50, 60, 'Time: 0', { fontSize: '32px', fill: 'white' });
        let time = 0;
        this.time.addEvent({
            delay: 1000, callback: () => {
                time++;
                this.text.setText('Time: ' + time);
                if (time == 30) {
                    sceneGestor.accesScene(this.score);
                }
            }, loop: true
        });

        // make hero bounce
        this.hero.setBounce(1);
        //make enemy bounce
        this.enemy.setBounce(1);

        // set hero velocity
        this.hero.setVelocity(gameOptions.heroSpeed * Math.cos(Math.PI / 4), gameOptions.heroSpeed * Math.sin(Math.PI / 4));
        //set enemy velocity
        this.enemy.setVelocity(gameOptions.enemySpeed * Math.cos(Math.PI / 4), gameOptions.enemySpeed * Math.sin(Math.PI / 4));
        // listener for input
        this.input.on("pointerdown", this.changeDirection, this);

        // set world bounds to allow camera to follow the hero
        this.cameras.main.setBounds(0, 0, 1920, 1440);

        // make the camera follow the hero
        this.cameras.main.startFollow(this.hero);
        //Hacer que el score siga a la camara
        this.scoreText.setScrollFactor(0);
        this.text.setScrollFactor(0);

    }




    // method to make the change direction
    changeDirection() {

        // invert hero y velocity
        this.hero.body.velocity.y *= -1;
        //invert enemy y velocity
        this.enemy.body.velocity.y *= -1;
    }

    // method to be executed at each frame
    update() {

        // handle collision between hero and tiles
        this.physics.world.collide(this.hero, this.layer);
        //handle collision between enemy and tiles
        this.physics.world.collide(this.enemy, this.layer)

        // flip hero according to direction
        this.hero.flipX = this.hero.body.velocity.x < 0;
        //flip enemy according to direction
        this.enemy.flipX = this.enemy.body.velocity.x < 0;
        this.detectionHeroPositionWithCoins();
    }
    //metodo para detectar si el hero esta en la posicion de las monedas
   
    detectionHeroPositionWithCoins() {
        
        // Check if hero overlaps with bronze coin
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.hero.getBounds(), this.bronze.getAsset().getBounds()) && this.bronze.getAsset().visible) {
            this.bronze.getAsset().visible = false;
            this.score += this.bronze.getPuntuacion();            
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.hero.getBounds(), this.silver.getAsset().getBounds()) && this.silver.getAsset().visible) {
            this.silver.getAsset().visible = false;
            this.score += this.silver.getPuntuacion();
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.hero.getBounds(), this.golden.getAsset().getBounds()) && this.golden.getAsset().visible) {
            this.golden.getAsset().visible = false;
            this.score += this.golden.getPuntuacion();
        }

        this.scoreText.setText(this.score);
        
    }
}
