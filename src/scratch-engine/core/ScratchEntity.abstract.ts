import { ScratchScene } from "./ScratchScene.abstract";
import { TransformComponent } from "../components/TransformComponent";
import { Processor } from "../../core/container/Processor";
import { ScratchComponent } from "./ScratchComponent.abstract";


export abstract class ScratchEntity extends Processor<ScratchComponent> {

    private readonly _scene: ScratchScene;
    private readonly _id: string;

    public readonly transform: TransformComponent;

    protected constructor(id: string, scene: ScratchScene) {
        super();

        this._scene = scene;
        this._id = id;

        this.transform = this.requireType(TransformComponent);
    }

    get id(): string {
        return this._id;
    }

    get scene(): ScratchScene {
        return this._scene;
    }

}
