import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class EntityHandler extends ScratchSceneScript {

    private readonly _entityMap: Map<string, ScratchEntity>;

    private readonly _removeStack: Array<string>;
    private readonly _addStack: Array<ScratchEntity>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();

        this._removeStack = new Array<string>();
        this._addStack = new Array<ScratchEntity>();
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        this._addStack.push(entity);

        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        this._removeStack.push(entity.id);
    }

    resolveStack(): void {
        this.resolveRemoveStack();
        this.resolveAddStack();
    }

    private resolveRemoveStack(): void {
        while (this._removeStack.length > 0) {
            const entity = this._entityMap.get(this._removeStack.pop()!)!;

            entity.dispose();
            this._entityMap.delete(entity.id);
        }
    }

    private resolveAddStack(): void {
        while(this._addStack.length > 0) {
            const entity = this._addStack.pop()!;

            entity.initialize();
            this._entityMap.set(entity.id, entity);
        }
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
