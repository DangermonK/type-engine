import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class EntityHandler extends ScratchSceneScript {

    private readonly _entityMap: Map<string, ScratchEntity>;

    private readonly _removeStack: Array<string>;
    private readonly _addStack: Array<ScratchEntity>;

    private readonly _listenerFunctionMap: Map<string, Map<string, string>>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();

        this._removeStack = new Array<string>();
        this._addStack = new Array<ScratchEntity>();

        this._listenerFunctionMap = new Map<string, Map<string, string>>();
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
                this._listenerFunctionMap.set(func, new Map<string, string>());

            this._listenerFunctionMap.get(func)!.set(entity.id, entity.id);
        }
    }

    private removeEntityListenerFunctions(entity: ScratchEntity): void {
        for(const func of ['update', 'fixedUpdate', 'start', 'stop']) {
            if(!entity.hasListener(func))
                continue;

            this._listenerFunctionMap.get(func)!.delete(entity.id);
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

    getEntities(ids: IterableIterator<string>): Array<ScratchEntity> {
        const arr: Array<ScratchEntity> = new Array<ScratchEntity>();
        for(const id of ids) {
            arr.push(this._entityMap.get(id)!);
        }
        return arr;
    }

    getEntitiesOfType<Type extends ScratchEntity>(type: new(...args: Array<any>) => Type): Array<Type> {
        const output: Array<Type> = new Array<Type>();
        for(const entity of this.entities) {
            if(entity instanceof type)
                output.push(entity);
        }
        return output;
    }

    get entities(): IterableIterator<ScratchEntity> {
        return this._entityMap.values();
    }

    private start(): void {
        this.resolveStack();

        for(const entityId of this._listenerFunctionMap.get('start')?.keys() || []) {
            this._entityMap.get(entityId)!.emit('start');
        }
    }

    private stop(): void {
        for(const entityId of this._listenerFunctionMap.get('stop')?.keys() || []) {
            this._entityMap.get(entityId)!.emit('stop');
        }
    }

    private fixedUpdate(): void {
        this.resolveStack();

        for(const entityId of this._listenerFunctionMap.get('fixedUpdate')?.keys() || []) {
            this._entityMap.get(entityId)!.emit('fixedUpdate');
        }
    }

    private update(): void {
        for(const entityId of this._listenerFunctionMap.get('update')?.keys() || []) {
            this._entityMap.get(entityId)!.emit('update');
        }
    }

    dispose(): void {
    }

    initialize(): void {
        this.resolveStack();
    }

}
