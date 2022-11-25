
import { IRunnable } from "../../core/interfaces/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";
import { Processor } from "../../core/container/Processor";

export abstract class ScratchScene extends Processor<ScratchSceneScript> implements IRunnable {

    protected constructor() {
        super();

    }

}
