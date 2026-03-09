import {StructuredEntity} from "./StructuredEntity.abstract";
import {ScratchScene} from "./ScratchScene.abstract";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";
import {PixiComponent} from "../components/PixiComponent";

export abstract class PixiEntity extends StructuredEntity {

    private readonly _transform: PixiComponent;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super(id, scene, options);


        this._transform = this.requireType(PixiComponent);
    }

    get transform(): PixiComponent {
        return this._transform;
    }

}
