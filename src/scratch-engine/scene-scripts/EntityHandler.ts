import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { HashedGrid } from "../utils/HashedGrid";
import { EntityLayer } from "../utils/EntityLayer";

export class EntityHandler extends ScratchSceneScript implements IRunnable {

    private readonly _entityLayerMap: Map<string, EntityLayer>;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityLayerMap = new Map<string, EntityLayer>();
        this._entityLayerMap.set('default', new EntityLayer());
    }

    getLayer(layer: string): EntityLayer {
        return this._entityLayerMap.get(layer)!;
    }

    addEntity<Type extends ScratchEntity>(entity: Type, layer: string = 'default'): Type {
        if(!this._entityLayerMap.has(layer))
            this._entityLayerMap.set(layer, new EntityLayer());

        this._entityLayerMap.get(layer)!.addEntity(entity);

        return entity;
    }

    start(): void {
        this._entityLayerMap.get('static')?.resolveHashes();
    }

    stop(): void {
    }

    update(): void {
    }

    fixedUpdate(): void {
        this._entityLayerMap.get('default')!.entities.forEach(entity => entity.fixedUpdate());
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
