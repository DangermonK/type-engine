import { ScratchScene } from "./ScratchScene.abstract";
import { Processor } from "../../core/container/Processor";
import { ScratchComponent } from "./ScratchComponent.abstract";
import { Transform } from "../utils/Transform";
import { IScratchEntityOptions } from "./IScratchEntityOptions";


export abstract class ScratchEntity extends Processor<ScratchComponent> {

    private readonly _scene: ScratchScene;
    private readonly _id: string;

    private readonly _options: IScratchEntityOptions;

    public readonly transform: Transform;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super();

        this._scene = scene;
        this._id = id;

        this._options = options;

        this.transform = new Transform();
    }

    get options(): IScratchEntityOptions {
        return this._options;
    }

    get id(): string {
        return this._id;
    }

    get scene(): ScratchScene {
        return this._scene;
    }

}
