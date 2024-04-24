export class SceneNextLevel {
       /** *@type {boolean} */
       #acceso;
    constructor() {
        this.scene = new Phaser.Scene({ key: "SceneNextLevel" });
    }
    preload() {
    }
    create() {
        this.text = this.scene.add.text(50, 60, 'Siguiente nivel!', { fontSize: '32px', fill: 'white' });
    }
    update() {
    }
    acceder(score){
        if(score>=70){
            this.#acceso = true;
            return true;
        } else{
            this.#acceso = false;
            return false;
        }
    }
    startScene(){
        if(this.#acceso){
            this.scene.start("SceneNextLevel");
        }
    }
}