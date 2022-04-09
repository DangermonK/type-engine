import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";


export class EntityHandler extends ScratchSceneScript {

    private readonly _entityMap: Map<string, ScratchEntity>;
    private readonly _entityStaticMap: Map<string, ScratchEntity>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();
        this._entityStaticMap = new Map<string, ScratchEntity>();
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        this._entityMap.set(entity.id, entity);
        return entity;
    }

    addEntityStatic<Type extends ScratchEntity>(entity: Type): Type {
        this._entityStaticMap.set(entity.id, entity);
        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        this._entityMap.delete(entity.id);
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
