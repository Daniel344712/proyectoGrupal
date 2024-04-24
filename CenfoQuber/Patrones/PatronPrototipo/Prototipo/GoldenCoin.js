import { Coin } from "../iPrototipo/Coin.js";

export class GoldenCoin extends Coin {

    constructor(scene){
        super(scene);

        this.setTipoMoneda("lendario");
        this.setColorMoneda("golden");
        this.setPuntuacion(50);
    }

    score(playGame){
        //Aqui se puede agregar la logica para sumar puntos al jugador cuando toca la moneda silver
       playGame.score += this.getPuntuacion();
    }

   

    clone(){
        var clone = new GoldenCoin(this.getScene());
        clone.setTipoMoneda(this.getTipoMoneda());
        clone.setColorMoneda(this.getColorMoneda());
        clone.setAsset(this.getColorMoneda());
        clone.setPuntuacion(this.getPuntuacion());

        return clone;
    }
}