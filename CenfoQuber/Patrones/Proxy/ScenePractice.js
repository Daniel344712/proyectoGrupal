export class ScenePractice extends Phaser.Scene {
    /** *@type {boolean} */
    #acceso;
    constructor() {
        super({ key: "ScenePractice" });
    }
    preload() {
      
    }
    create() {
        this.text = this.add.text(50, 60, 'Sigue Practicando!', { fontSize: '32px', fill: 'white' });
    }
    update() {
    }
    acceder(score){
        if(score>=0 && score<=50){
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
            this.scene.start("ScenePractice");
        }
    }
}