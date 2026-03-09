import {StructuredEntity} from "./StructuredEntity.abstract";
import {ScratchScene} from "./ScratchScene.abstract";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";
import {PixiComponent} from "../components/PixiComponent";
import {IPointData} from "pixi.js";

export abstract class PixiEntity extends StructuredEntity<IPointData> {

    private readonly _transform: PixiComponent;

    protected constructor(id: string, scene: ScratchScene, options: IScratchEntityOptions) {
        super(id, scene, options);


        this._transform = this.requireType(PixiComponent);
    }

    get transform(): PixiComponent {
        return this._transform;
    }

}
