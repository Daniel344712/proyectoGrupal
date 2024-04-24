
export class Coin {    
    /** @type {Phaser.Scene} */
    #scene = null;
    /** @type {Phaser.GameObjects.Image} */
    #sprite = null;
    /** @type {string} */
    #tipoMoneda = null;
    /** @type {number} */
    #puntuacion = 0;
    /** @type {number} */
    #colorMoneda = 0;
    
    constructor(scene) {        
        this.#scene = scene;
    }

    getTipoMoneda(){
        return this.#tipoMoneda;
    }
    setTipoMoneda(tipo){
        this.#tipoMoneda = tipo;
    }
    getColorMoneda(){
        return this.#colorMoneda;
    }
    setColorMoneda(color){
        this.#colorMoneda = color;
    }
    
    getPuntuacion(){
        return this.#puntuacion;
    }
    setPuntuacion(puntuacion){
        this.#puntuacion = puntuacion;
    }
    getAsset(){
        return this.#sprite;
    }
    setAsset(asset){
        this.#sprite = this.#scene.physics.add.sprite(0, 0, asset).setScale(0.1);
    }
    getScene(){
        return this.#scene;
    }
    setScene(scene){
        this.#scene = scene;
    }
    
    clone() {
        throw new Error("Method not implemented.");
    }
}
