import { ScratchScene } from "./ScratchScene.abstract";
import { Scriptable } from "../../core/container/Scriptable.abstract";


export abstract class ScratchSceneScript extends Scriptable<ScratchScene> {

    protected constructor(scene: ScratchScene) {
        super(scene);
    }

}
