import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { EntityHandler } from "./EntityHandler";
import { HashedGrid } from "../utils/HashedGrid";
import { ColliderComponent } from "../components/ColliderComponent";
import { IBounds } from "../utils/IBounds";


export class PhysicsHandler extends ScratchSceneScript implements IRunnable {

    private readonly _entityHandler: EntityHandler;

    private readonly _layerMap: Map<string, Array<string>>;
    private readonly _layeredGridMap: Map<string, HashedGrid>;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);

        this._layerMap = new Map<string, Array<string>>();
        this._layeredGridMap = new Map<string, HashedGrid>();
    }

    pushCollider(collider: ColliderComponent): void {
        if(!this._layerMap.has(collider.container.options.layer))
            this._layerMap.set(collider.container.options.layer, new Array<string>());
        this._layerMap.get(collider.container.options.layer)!.push(collider.container.id);

        if(!this._layeredGridMap.has(collider.container.options.layer))
            this._layeredGridMap.set(collider.container.options.layer, new HashedGrid(this.container.settings.hashGridCellSize));
    }

    removeCollider(collider: ColliderComponent): void {
        const layer = this._layerMap.get(collider.container.options.layer)!;
        const index = layer.indexOf(collider.container.id);
        if(index === -1)
            return;

        layer.splice(index, 1);

        // TODO: Only use following line if definitely needed due to performance decrease
        // this._layeredGridMap.get(collider.container.options.layer)!.removeElement(collider);
    }

    private resolveLayer(layer: string = 'default'): void {
        this._layeredGridMap.get(layer)!.clear();
        this._entityHandler.getEntitiesOfLayer(layer).forEach(entity => {
            this._layeredGridMap.get(layer)!.pushElement(entity.getElement(ColliderComponent));
        });
    }

    private checkBoundsIntersection(boundsA: IBounds, boundsB: IBounds): boolean {
        return boundsA.x < boundsB.x + boundsB.w &&
               boundsA.y < boundsB.y + boundsB.h &&
               boundsA.x > boundsB.x - boundsA.w &&
               boundsA.y > boundsB.y - boundsA.w;
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
