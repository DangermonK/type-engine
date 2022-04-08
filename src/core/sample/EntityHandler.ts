import { Entity } from "../management/Entity.abstract";
import { SceneScript } from "../management/SceneScript.abstract";
import { Scene } from "../management/Scene.abstract";
import { IRunnable } from "../container/IRunnable";

export class EntityHandler extends SceneScript implements IRunnable {

    private readonly _entityMap: Map<string, Entity>;

    constructor(scene: Scene) {
        super(scene);
        this._entityMap = new Map<string, Entity>();
    }

    get entities(): Array<Entity> {
        return [...this._entityMap.values()];
    }

    getEntitiesOfType<Type extends Entity>(type: new(...args: Array<any>) => Type): Array<Type> {
        return this.entities.filter(entity => entity instanceof type) as Array<Type>;
    }

    addEntity<Type extends Entity>(entity: Type): Type {
        this._entityMap.set(entity.id, entity);
        entity.initialize();
        return entity;
    }

    removeEntity<Type extends Entity>(entity: Type): void {
        this._entityMap.delete(entity.id);
    }

    dispose(): void {
        this._entityMap.forEach(entity => entity.dispose());
    }

    initialize(): void {
    }

    fixedUpdate(): void {
        this._entityMap.forEach(entity => entity.fixedUpdate());
    }

    start(): void {
        this._entityMap.forEach(entity => entity.start());
    }

    stop(): void {
        this._entityMap.forEach(entity => entity.stop());
    }

    update(): void {
        this._entityMap.forEach(entity => entity.update());
    }


}
