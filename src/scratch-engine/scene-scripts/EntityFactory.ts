import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { v4 as uuidv4 } from "uuid";
import { EntityHandler } from "./EntityHandler";


export class EntityFactory extends ScratchSceneScript {

    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);
    }

    instantiate<Type extends ScratchEntity>(entity: new(...args: Array<any>) => Type): Type {
        return this._entityHandler.addEntity(new entity(uuidv4(), this.container));
    }

    dispose(): void {
    }

    initialize(): void {
    }



}
