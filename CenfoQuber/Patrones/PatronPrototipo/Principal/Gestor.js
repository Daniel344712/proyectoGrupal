
import { BronzeCoin } from "../Prototipo/BronzeCoin.js";
import { GoldenCoin } from "../Prototipo/GoldenCoin.js";
import { SilverCoin } from "../Prototipo/SilverCoin.js";

export class Gestor {
    /** @type {Map<string, iPrototipo>} */
    #prototipos = new Map();

    constructor(scene) {
        this.#prototipos.set("Oro", new GoldenCoin(scene));
        this.#prototipos.set("Plata", new SilverCoin(scene));
        this.#prototipos.set("Bronce", new BronzeCoin(scene));
    }
    nuevaMoneda(colorMoneda) {        
        const prototipo = this.#prototipos.get(colorMoneda);
        if (prototipo) {
            return prototipo.clone();
        } else {
            console.error(`Prototipo no encontrado para el color ${color}`);
            return null;
        }
    }

}