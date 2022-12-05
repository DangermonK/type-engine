import { ScratchScene } from "./ScratchScene.abstract";
import { Processor } from "../../core/container/Processor";
import { ScratchComponent } from "./ScratchComponent.abstract";
import { TransformComponent } from "../components/TransformComponent";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";

export abstract class ScratchEntity extends Processor<ScratchComponent> {

    private readonly _scene: ScratchScene;
    private readonly _id: string;

    private readonly _options: IScratchEntityOptions;

    public readonly transform: TransformComponent;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super();

        this._scene = scene;
        this._id = id;

        this._options = options;

        this.transform = this.requireType(TransformComponent);
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

    toJSON() {
        return {
            id: this._id,
            t: {
                x: this.transform.position.x,
                y: this.transform.position.y,
                r: this.transform.rotation
            }
        }
    }

}
