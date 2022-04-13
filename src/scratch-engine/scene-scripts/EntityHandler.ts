import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { HashedGrid } from "../utils/HashedGrid";

export class EntityHandler extends ScratchSceneScript implements IRunnable {

    private readonly _entityMap: Map<string, ScratchEntity>;
    private readonly _staticMap: Map<string, ScratchEntity>;

    private readonly _entityHashMap: HashedGrid;
    private readonly _staticHashMap: HashedGrid;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();
        this._staticMap = new Map<string, ScratchEntity>();

        this._entityHashMap = new HashedGrid(50); // TODO: specify cellsize for hashmap
        this._staticHashMap = new HashedGrid(50); // TODO: specify cellsize for hashmap
    }

    start(): void {
        this._staticMap.forEach(entity => this._staticHashMap.pushElement(entity));
    }

    stop(): void {
    }

    update(): void {
        this.entities.forEach(entity => entity.update());
    }

    fixedUpdate(): void {
        this._entityHashMap.clear();
        this._entityMap.forEach(entity => this._entityHashMap.pushElement(entity));

        this.entities.forEach(entity => entity.fixedUpdate());
    }

    get all(): Array<ScratchEntity> {
        return [...this._entityMap.values(), ...this._staticMap.values()];
    }

    get entities(): Array<ScratchEntity> {
        return [...this._entityMap.values()];
    }

    get statics(): Array<ScratchEntity> {
        return [...this._staticMap.values()];
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        if(entity.isStatic)
            this._staticMap.set(entity.id, entity);
        else
            this._entityMap.set(entity.id, entity);

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
