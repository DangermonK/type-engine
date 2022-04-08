import { Scriptable } from "../container/Scriptable.abstract";
import { Container } from "../container/Container";
import { EntityHandler } from "./EntityHandler";
import { Entity } from "../management/Entity.abstract";
import { Scene } from "../management/Scene.abstract";
import { v4 as uuidv4 } from "uuid";
import { SceneScript } from "../management/SceneScript.abstract";


export class EntityFactory extends SceneScript {

    private readonly _entityHandler: EntityHandler;

    constructor(scene: Scene) {
        super(scene);
        this._entityHandler = this.requireScript(EntityHandler);
    }

    dispose(): void {
    }

    initialize(): void {
    }

    instantiate<Type extends Entity>(entity: new(...args: any) => Type): Type {
        return this._entityHandler.addEntity(new entity(uuidv4(), this.container));
    }

}
