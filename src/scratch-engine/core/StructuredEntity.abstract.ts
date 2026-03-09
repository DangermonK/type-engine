import { ScratchScene } from "./ScratchScene.abstract";
import { Processor } from "../../core/container/Processor";
import { ScratchComponent } from "./ScratchComponent.abstract";
import { TransformComponent } from "../components/TransformComponent";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";
import { IScratchEntity } from "../interfaces/ISerializedData";
import {ITransformComponent} from "../components/ITransformComponent";
import {Vector2} from "../utils/Vector2";

export abstract class StructuredEntity<Vector> extends Processor<ScratchComponent> {

    private readonly _scene: ScratchScene;
    private readonly _id: string;

    private readonly _options: IScratchEntityOptions;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super();

        this._scene = scene;
        this._id = id;

        this._options = options;
    }

    abstract get transform(): ITransformComponent<Vector>;

    get options(): IScratchEntityOptions {
        return this._options;
    }

    get id(): string {
        return this._id;
    }

    get scene(): ScratchScene {
        return this._scene;
    }

    toJSON(): IScratchEntity {
        return {
            id: this._id
        }
    }

}
