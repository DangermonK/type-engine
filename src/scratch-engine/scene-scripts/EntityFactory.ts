import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {v4 as uuidv4} from "uuid";
import {EntityHandler} from "./EntityHandler";
import {ScratchEntity} from "../core/ScratchEntity.abstract";
import {IScratchEntityOptions} from "../interfaces/IScratchEntityOptions";
import {Layer} from "../enums/Layer.enum";


export class EntityFactory extends ScratchSceneScript {

    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);
    }

    instantiate<Type extends ScratchEntity>(entity: new(...args: Array<any>) => Type, id: string = uuidv4(),
                                            options: IScratchEntityOptions = { layer: Layer.DEFAULT }): Type {
        return this._entityHandler.addEntity(new entity(id, this.container, options));
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
