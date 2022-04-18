import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { IRunnable } from "../../core/container/IRunnable";

export class EntityHandler extends ScratchSceneScript implements IRunnable {

    private readonly _flagMap: Map<string, Array<string>>;
    private readonly _entityMap: Map<string, ScratchEntity>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityMap = new Map<string, ScratchEntity>();
        this._flagMap = new Map<string, Array<string>>();
    }

    addEntityFlag(entity: ScratchEntity, flag: string): void {
        entity.options.flags[flag] = true;
        if(!this._flagMap.has(flag))
            this._flagMap.set(flag, new Array<string>());

        this._flagMap.get(flag)!.push(entity.id);
    }

    addEntity<Type extends ScratchEntity>(entity: Type): Type {
        entity.initialize();
        this._entityMap.set(entity.id, entity);

        if(!this._flagMap.has(entity.options.layer))
            this._flagMap.set(entity.options.layer, new Array<string>());

        this._flagMap.get(entity.options.layer)!.push(entity.id);

        Object.keys(entity.options.flags).forEach(flag => {
            if(!this._flagMap.has(flag))
                this._flagMap.set(flag, new Array<string>());

            this._flagMap.get(flag)!.push(entity.id);
        });

        return entity;
    }

    removeEntity(entity: ScratchEntity): void {
        entity.dispose();
        this._entityMap.delete(entity.id);

        const index = this._flagMap.get(entity.options.layer)!.indexOf(entity.id);
        if(index !== -1)
            this._flagMap.get(entity.options.layer)!.splice(index, 1);

        Object.keys(entity.options.flags).forEach(flag => {
            const index = this._flagMap.get(flag)!.indexOf(entity.id);
            if(index === null)
                return;

            this._flagMap.get(flag)!.splice(index, 1);
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

    getEntitiesOfType<Type extends ScratchEntity>(type: new(...args: Array<any>) => Type): Array<Type> {
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
