import { ScratchScene } from "./ScratchScene.abstract";
import { Processor } from "../../core/container/Processor";
import { ScratchComponent } from "./ScratchComponent.abstract";
import { Transform } from "../utils/Transform";


export abstract class ScratchEntity extends Processor<ScratchComponent> {

    private readonly _scene: ScratchScene;
    private readonly _id: string;

    public readonly isStatic: boolean;

    public readonly transform: Transform;

    protected constructor(id: string, scene: ScratchScene, isStatic: boolean) {
        super();

        this._scene = scene;
        this._id = id;

        this.isStatic = isStatic;

        this.transform = new Transform();
    }

    get id(): string {
        return this._id;
    }

    get scene(): ScratchScene {
        return this._scene;
    }

}
