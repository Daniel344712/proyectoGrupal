import { SceneNextLevel } from "../SceneNextLevel.js";
import { SceneGoodGame } from "../SceneGoodGame.js";
import { ScenePractice } from "../ScenePractice.js";


export class GestorProxy {
    #SceneGoodGame;
    #SceneNextLevel;
    #ScenePractice;

    constructor(SceneGoodGame, SceneNextLevel, ScenePractice) {
        this.#SceneGoodGame = SceneGoodGame;
        this.#SceneNextLevel = SceneNextLevel;
        this.#ScenePractice = ScenePractice;
        
    }

    accesScene(score){
        if(this.#SceneGoodGame.acceder(score)){
            this.#SceneGoodGame.startScene();
        } else if(this.#SceneNextLevel.acceder(score)){
            this.#SceneNextLevel.startScene();
        } else if(this.#ScenePractice.acceder(score)){
            this.#ScenePractice.startScene();
        }
    }
}