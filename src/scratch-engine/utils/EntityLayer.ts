import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { HashedGrid } from "./HashedGrid";


export class EntityLayer {

    private readonly _entityMap: Map<string, ScratchEntity>;
    private readonly _hashMap: HashedGrid;

    constructor() {
        this._entityMap = new Map<string, ScratchEntity>();
        this._hashMap = new HashedGrid(50); // TODO: change grid cell size
    }

    get entities(): Array<ScratchEntity> {
        return [...this._entityMap.values()];
    }

    get hashMap(): HashedGrid {
        return this._hashMap;
    }

    getEntitiesOfType<Type extends ScratchEntity>(entity: new() => Type): Array<Type> {
        return this.entities.filter(e => e instanceof entity) as Array<Type>;
    }

    resolveHashes(): void {
        this._entityMap.clear();
        this._entityMap.forEach(entity => this._hashMap.pushElement(entity));
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        this._entityMap.set(entity.id, entity);
        entity.initialize();
        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        this._entityMap.delete(entity.id);
        entity.dispose();
    }

}
