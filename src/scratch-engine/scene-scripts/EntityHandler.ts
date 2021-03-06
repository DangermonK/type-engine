import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class EntityHandler extends ScratchSceneScript {

    private readonly _layerMap: Map<string, Array<string>>;
    private readonly _entityMap: Map<string, ScratchEntity>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();
        this._layerMap = new Map<string, Array<string>>();
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        entity.initialize();
        this._entityMap.set(entity.id, entity);

        if(!this._layerMap.has(entity.options.layer))
            this._layerMap.set(entity.options.layer, new Array<string>());

        this._layerMap.get(entity.options.layer)!.push(entity.id);

        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        entity.dispose();
        this._entityMap.delete(entity.id);

        const index = this._layerMap.get(entity.options.layer)!.indexOf(entity.id);
        if(index !== -1)
            this._layerMap.get(entity.options.layer)!.splice(index, 1);
    }

    getEntitiesOfLayer(layer: string): Array<ScratchEntity> {
        const flaggedEntities = this._layerMap.get(layer) || [];

        const entities: Array<ScratchEntity> = new Array<ScratchEntity>();
        for(let i = 0; i < flaggedEntities.length; i++) {
            entities.push(this._entityMap.get(flaggedEntities[i])!);
        }
        return entities;
    }

    getEntities(ids: Array<string>): Array<ScratchEntity> {
        const arr: Array<ScratchEntity> = new Array<ScratchEntity>();
        for(let i = 0; i < ids.length; i++) {
            arr.push(this._entityMap.get(ids[i])!);
        }
        return arr;
    }

    getEntitiesOfType<Type extends ScratchEntity>(type: new(...args: Array<any>) => Type): Array<Type> {
        return this.entities.filter(entity => entity instanceof type) as Array<Type>;
    }

    get entities(): Array<ScratchEntity> {
        return [...this._entityMap.values()];
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
