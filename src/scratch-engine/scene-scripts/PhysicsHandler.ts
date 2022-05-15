import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { EntityHandler } from "./EntityHandler";
import { HashedGrid } from "../utils/HashedGrid";
import { ColliderComponent } from "../components/ColliderComponent";
import { IBounds } from "../utils/IBounds";


export class PhysicsHandler extends ScratchSceneScript {

    private readonly _entityHandler: EntityHandler;

    private readonly _layerMap: Map<string, Array<string>>;
    private readonly _layeredGridMap: Map<string, HashedGrid>;

    private readonly _activeCollisions: Map<string, any> = new Map<string, any>();

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

    resolveAllLayers(): void {
        for(const layer of [...this._layeredGridMap.keys()]) {
            this.resolveHashLayer(layer);
        }
    }

    resolveCollisionsOnLayer(layer: string = 'default'): void {
        const elements = this._entityHandler.getEntities(this._layerMap.get(layer) || []);
        const compareLayers = this.container.settings.collisionRules.get(layer) || [];

        const current = new Map<string, any>(this._activeCollisions);
        for(const element of elements) {
            const collider = element.getElement(ColliderComponent);
            for(const compareLayer of compareLayers) {
                const comparants = this._entityHandler.getEntities(
                        this._layeredGridMap.get(compareLayer)!.getElementsFromHashes(collider.hashCoords));
                for(const comparant of comparants) {
                  // TODO: implement collision detection for all shapes
                    if(PhysicsHandler.checkBoundsIntersection(collider.bounds, comparant.getElement(ColliderComponent).bounds)) {
                      // TODO: refactor
                        if(!this._activeCollisions.has(element.id + comparant.id)) {
                            this._activeCollisions.set(element.id + comparant.id, {
                                entity: collider,
                                collider: comparant.getElement(ColliderComponent)
                            });
                            current.set(element.id + comparant.id, "new");
                        } else
                            current.set(element.id + comparant.id, "old");
                    }
                }
            }
        }

        // TODO: refactor
        current.forEach((coll, id) => {
            if(coll === 'new') {
                this._activeCollisions.get(id).entity.emitCollisionEnter(this._activeCollisions.get(id).collider);
            } else if(coll !== 'old') {
                this._activeCollisions.get(id).entity.emitCollisionExit(this._activeCollisions.get(id).collider);
                this._activeCollisions.delete(id);
            }
        });
    }

    resolveHashLayer(layer: string = 'default'): void {
        this._layeredGridMap.get(layer)!.clear();
        this._entityHandler.getEntities(this._layerMap.get(layer)!).forEach(entity => {
            this._layeredGridMap.get(layer)!.pushElement(entity.getElement(ColliderComponent));
        });
    }

    private static checkBoundsIntersection(boundsA: IBounds, boundsB: IBounds): boolean {
        return boundsA.x < boundsB.x + boundsB.w &&
               boundsA.y < boundsB.y + boundsB.h &&
               boundsA.x > boundsB.x - boundsA.w &&
               boundsA.y > boundsB.y - boundsA.w;
    }

    getLayer(layer: string): HashedGrid | undefined {
        return this._layeredGridMap.get(layer);
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
