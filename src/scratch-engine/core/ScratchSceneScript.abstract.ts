import { ScratchScene } from "./ScratchScene.abstract";
import { Process } from "../../core/container/Process.abstract";


export abstract class ScratchSceneScript extends Process<ScratchScene> {

    protected constructor(scene: ScratchScene) {
        super(scene);
    }

}
