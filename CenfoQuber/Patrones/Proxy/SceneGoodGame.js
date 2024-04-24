export class SceneGoodGame {
   /** *@type {boolean} */
    #acceso;
    constructor() {
        this.scene = new Phaser.Scene({ key: "SceneGoodGame" });
    }
    preload() {
    }
    create() {
        this.text = this.scene.add.text(50, 60, 'Bien hecho!', { fontSize: '32px', fill: 'white' });
    }
    update() {
    }
    acceder(score){
        if(score>=51 && score<=69){
            this.#acceso = true;
            return true;
        } else{
            this.#acceso = false;
            return false;
        }
    }
    startScene(){
        if(this.#acceso){
            this.scene.stop("PlayGame");
            this.scene.start("SceneGoodGame");
        }
    }
}