import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {HashedGrid} from "../utils/HashedGrid";
import {ColliderComponent} from "../components/ColliderComponent";
import {IBounds} from "../interfaces/IBounds";
import {Layer} from "../enums/Layer.enum";
import {ICollision} from "../interfaces/ICollision";
import {ScratchEntity} from "../core/ScratchEntity.abstract";

export class PhysicsHandler extends ScratchSceneScript {

    private readonly _entityHandler: EntityHandler;

    private readonly _layerMap: Map<Layer, Set<string>>;
    private readonly _layeredGridMap: Map<Layer, HashedGrid>;

    private readonly _activeCollisions: Map<string, ICollision>;
    private readonly _enteredCollisions: Set<string>;
    private readonly _exitedCollisions: Set<string>;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);

        this._layerMap = new Map<Layer, Set<string>>();
        this._layeredGridMap = new Map<Layer, HashedGrid>();

        this._activeCollisions = new Map<string, ICollision>();
        this._enteredCollisions = new Set<string>();
        this._exitedCollisions = new Set<string>();
    }

    pushCollider(collider: ColliderComponent): void {
        if(!this._layerMap.has(collider.container.options.layer))
            this._layerMap.set(collider.container.options.layer, new Set<string>());
        this._layerMap.get(collider.container.options.layer)!.add(collider.container.id);

        if(!this._layeredGridMap.has(collider.container.options.layer))
            this._layeredGridMap.set(collider.container.options.layer, new HashedGrid(this.container.settings.hashGridCellSize));

        this._layeredGridMap.get(collider.container.options.layer)!.pushElement(collider);
    }

    removeCollider(collider: ColliderComponent): void {
        this._layerMap.get(collider.container.options.layer)!.delete(collider.container.id);
        this._layeredGridMap.get(collider.container.options.layer)!.removeElement(collider);
    }

    // TODO: optimize to only resolving moved entities
    resolveAllLayers(): void {
        for(const layer of this._layeredGridMap.keys()) {
            this.resolveHashLayer(layer);
        }
    }

    resolveHashLayer(layer: Layer = Layer.DEFAULT): void {
        this._layeredGridMap.get(layer)!.clear();
        for(const entity of this._entityHandler.getEntities(this._layerMap.get(layer)!)) {
            this._layeredGridMap.get(layer)!.pushElement(entity.getElement(ColliderComponent));
        }
    }

    resolveAllCollisions(): void {
        for(const layer of this.container.settings.collisionRules.keys()) {
            this.resolveCollisionsOnLayer(layer);
        }

        this.resolveUncheckedCollisions();
        this.emitCurrentCollisions();
    }

    // TODO: optimize same layer collisions
    // TODO: optimize collision checks for none moving objects
    private resolveCollisionsOnLayer(layer: Layer = Layer.DEFAULT): void {
        const elements = this._entityHandler.getEntities(this._layerMap.get(layer)!);
        const compareLayers = this.container.settings.collisionRules.get(layer) || [];

        for(const element of elements) {
            const collider = element.getElement(ColliderComponent);
            for(const compareLayer of compareLayers) {
                const compareColliders = this._entityHandler.getEntities(
                        this._layeredGridMap.get(compareLayer)!.getElementsFromHashes(collider.hashCoords));
                for(const compareCollider of compareColliders) {
                    // TODO: improve irrelevant checks
                    if(element.id === compareCollider.id)
                        continue;

                    const collisionId = element.id + compareCollider.id;
                    if(this._activeCollisions.has(collisionId))
                        continue;

                    // TODO: implement collision detection for all shapes
                    if(PhysicsHandler.checkBoundsIntersection(collider.bounds, compareCollider.getElement(ColliderComponent).bounds)) {
                        this._activeCollisions.set(collisionId, {
                            entityCollider: collider,
                            checkedCollider: compareCollider.getElement(ColliderComponent)
                        });
                        this._enteredCollisions.add(collisionId);
                    }
                }
            }
        }
    }

    // FIXME: dont iterate through all collisions (maybe solve collisions via ColliderComponent)
    private resolveUncheckedCollisions(): void {
        for(const uncheckedCollision of this._activeCollisions.keys()) {
            const value = this._activeCollisions.get(uncheckedCollision)!;
            if (!PhysicsHandler.checkBoundsIntersection(
                value.entityCollider.bounds,
                value.checkedCollider.bounds)) {
                this._exitedCollisions.add(uncheckedCollision);
            }
        }
    }

    private emitCurrentCollisions(): void {
        for(const collisionId of this._enteredCollisions) {
            const collision = this._activeCollisions.get(collisionId)!;
            collision.entityCollider.emitCollisionEnter(collision.checkedCollider);
        }

        for(const collisionId of this._exitedCollisions) {
            const collision = this._activeCollisions.get(collisionId)!;
            collision.entityCollider.emitCollisionExit(collision.checkedCollider);
            this._activeCollisions.delete(collisionId);
        }

        this._enteredCollisions.clear();
        this._exitedCollisions.clear();
    }

    private static checkBoundsIntersection(boundsA: IBounds, boundsB: IBounds): boolean {
        return boundsA.x < boundsB.x + boundsB.w &&
               boundsA.y < boundsB.y + boundsB.h &&
               boundsA.x > boundsB.x - boundsA.w &&
               boundsA.y > boundsB.y - boundsA.w;
    }

    getEntitiesOfLayer(layer: Layer = Layer.DEFAULT): Array<ScratchEntity> {
        return this._entityHandler.getEntities(this._layerMap.get(layer)!);
    }

    private start(): void {
    }

    private fixedUpdate(): void {
        this.resolveHashLayer();

        this.resolveAllCollisions();
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
