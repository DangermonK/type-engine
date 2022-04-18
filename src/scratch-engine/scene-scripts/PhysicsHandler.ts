import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { EntityHandler } from "./EntityHandler";
import { HashedGrid } from "../utils/HashedGrid";
import { ColliderComponent } from "../components/ColliderComponent";


export class PhysicsHandler extends ScratchSceneScript implements IRunnable {

    private readonly _entityHandler: EntityHandler;

    private readonly _layeredGridMap: Map<string, HashedGrid>;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);
        this._layeredGridMap = new Map<string, HashedGrid>();

    }

    pushCollider(collider: ColliderComponent): void {
        if(!this._layeredGridMap.has(collider.container.options.layer))
            this._layeredGridMap.set(collider.container.options.layer, new HashedGrid(20));
        this._entityHandler.addEntityFlag(collider.container, 'collider');
    }

    private resolveLayer(layer: string = 'default'): void {
        this._layeredGridMap.get(layer)!.clear();
        this._entityHandler.getEntitiesByFlag(layer).forEach(entity => {
            this._layeredGridMap.get(layer)!.pushElement(entity.getElement(ColliderComponent));
        });
    }

    getLayer(layer: string): HashedGrid | undefined {
        return this._layeredGridMap.get(layer);
    }

    fixedUpdate(): void {
        this.resolveLayer('default');
    }

    start(): void {
        this.resolveLayer('static');
    }

    stop(): void {
    }

    update(): void {
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
