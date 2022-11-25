
import { IRunnable } from "../../core/interfaces/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";
import { Processor } from "../../core/container/Processor";
import { IScratchSceneSettings } from "../interfaces/IScratchSceneSettings";

export abstract class ScratchScene extends Processor<ScratchSceneScript> implements IRunnable {

    protected constructor(settings: IScratchSceneSettings) {
        super();

    }

}
