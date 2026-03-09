import {StructuredEntity} from "./StructuredEntity.abstract";
import {ScratchScene} from "./ScratchScene.abstract";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";
import {TransformComponent} from "../components/TransformComponent";
import {Vector2} from "../utils/Vector2";

export abstract class ScratchEntity extends StructuredEntity<Vector2> {

    private readonly _transform: TransformComponent;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super(id, scene, options);


        this._transform = this.requireType(TransformComponent);
    }

    get transform(): TransformComponent {
        return this._transform;
    }

}
