import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class EntityHandler extends ScratchSceneScript {

    private readonly _entityMap: Map<string, ScratchEntity>;

    private readonly _removeStack: Array<string>;
    private readonly _addStack: Array<ScratchEntity>;

    private readonly _listenerFunctionMap: Map<string, Array<string>>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();

        this._removeStack = new Array<string>();
        this._addStack = new Array<ScratchEntity>();

        this._listenerFunctionMap = new Map<string, Array<string>>();
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

    private addEntityListenerFunctions(entity: ScratchEntity): void {
        for(const func of ['update', 'fixedUpdate', 'start', 'stop']) {
            if(!entity.hasListener(func))
                continue;

            if(!this._listenerFunctionMap.has(func))
                this._listenerFunctionMap.set(func, new Array<string>());

            this._listenerFunctionMap.get(func)!.push(entity.id);
        }
    }

    private removeEntityListenerFunctions(entity: ScratchEntity): void {
        for(const func of ['update', 'fixedUpdate', 'start', 'stop']) {
            if(!entity.hasListener(func))
                continue;

            const index = this._listenerFunctionMap.get(func)!.indexOf(entity.id);
            this._listenerFunctionMap.get(func)!.splice(index, 1);
        }
    }

    private resolveRemoveStack(): void {
        while (this._removeStack.length > 0) {
            const entity = this._entityMap.get(this._removeStack.pop()!)!;

            entity.dispose();
            this._entityMap.delete(entity.id);

            this.removeEntityListenerFunctions(entity);
        }
    }

    private resolveAddStack(): void {
        while(this._addStack.length > 0) {
            const entity = this._addStack.pop()!;

            entity.initialize();
            this._entityMap.set(entity.id, entity);

            this.addEntityListenerFunctions(entity);
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

    start(): void {
        for(const entityId of this._listenerFunctionMap.get('start') || []) {
            this._entityMap.get(entityId)!.emit('start');
        }
    }

    stop(): void {
        for(const entityId of this._listenerFunctionMap.get('stop') || []) {
            this._entityMap.get(entityId)!.emit('stop');
        }
    }

    fixedUpdate(): void {
        for(const entityId of this._listenerFunctionMap.get('fixedUpdate') || []) {
            this._entityMap.get(entityId)!.emit('fixedUpdate');
        }
    }

    update(): void {
        for(const entityId of this._listenerFunctionMap.get('update') || []) {
            this._entityMap.get(entityId)!.emit('update');
        }
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
