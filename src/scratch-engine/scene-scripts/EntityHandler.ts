import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { HashedGrid } from "../utils/HashedGrid";
import { EntityLayer } from "../utils/EntityLayer";

export class EntityHandler extends ScratchSceneScript implements IRunnable {

    private readonly _flagMap: Map<string, Array<string>>;
    private readonly _entityMap: Map<string, ScratchEntity>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();
        this._flagMap = new Map<string, Array<string>>();
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        this._entityMap.set(entity.id, entity);

        Object.keys(entity.options).forEach(option => {
            if(!this._flagMap.has(option))
                this._flagMap.set(option, new Array<string>());

            this._flagMap.get(option)!.push(entity.id);
        });

        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        this._entityMap.delete(entity.id);

        Object.keys(entity.options).forEach(option => {
            const index = this._flagMap.get(option)!.indexOf(entity.id);
            if(index === null)
                return;

            this._flagMap.get(option)!.splice(index, 1);
        });
    }

    getEntitiesByFlag(flag: string): Array<ScratchEntity> {
        const flaggedEntities = this._flagMap.get(flag) || [];

        const entities: Array<ScratchEntity> = new Array<ScratchEntity>();
        for(let i = 0; i < flaggedEntities.length; i++) {
            entities.push(this._entityMap.get(flaggedEntities[i])!);
        }
        return entities;
    }

    getEntityById(id: string): ScratchEntity | undefined {
        return this._entityMap.get(id);
    }

    getEntitiesOfType<Type extends ScratchEntity>(type: new() => Type): Array<Type> {
        return this.entities.filter(entity => entity instanceof type) as Array<Type>;
    }

    get entities(): Array<ScratchEntity> {
        return [...this._entityMap.values()];
    }

    start(): void {
    }

    stop(): void {
    }

    update(): void {
    }

    fixedUpdate(): void {

    }

    dispose(): void {
    }

    initialize(): void {
    }

}
