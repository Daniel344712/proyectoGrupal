import { Coin } from "../iPrototipo/Coin.js";

export class BronzeCoin extends Coin {

    constructor(scene){
        super(scene);
        this.setTipoMoneda("comun");
        this.setColorMoneda("bronze");
        this.setPuntuacion(10);
    }

    score(playGame){
        //Aqui se puede agregar la logica para sumar puntos al jugador cuando toca la moneda silver
       playGame.score += this.getPuntuacion();
    }

   

    clone(){
        var clone = new BronzeCoin(this.getScene());
        clone.setTipoMoneda(this.getTipoMoneda());
        clone.setColorMoneda(this.getColorMoneda());
        clone.setAsset(this.getColorMoneda());
        clone.setPuntuacion(this.getPuntuacion());

        return clone;
    }
}