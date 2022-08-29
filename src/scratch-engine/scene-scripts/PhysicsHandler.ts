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
        const entities = this._entityHandler.getEntities(this._layerMap.get(layer)!);
        const compareLayers = this.container.settings.collisionRules.get(layer) || [];

        for(const entity of entities) {
            const collider = entity.getElement(ColliderComponent);
            for(const compareLayer of compareLayers) {
                const compareEntities = this._entityHandler.getEntities(
                        this._layeredGridMap.get(compareLayer)!.getElementsFromHashes(collider.hashCoords));
                for(const compareEntity of compareEntities) {
                    // TODO: improve irrelevant checks
                    if(entity.id === compareEntity.id)
                        continue;

                    const collisionId = entity.id + compareEntity.id;
                    if(this._activeCollisions.has(collisionId))
                        continue;

                    if(PhysicsHandler.checkBoundsIntersection(collider.bounds, compareEntity.getElement(ColliderComponent).bounds)
                        && collider.isCollision(compareEntity.getElement(ColliderComponent))) {
                        this._activeCollisions.set(collisionId, {
                            entityCollider: collider,
                            checkedCollider: compareEntity.getElement(ColliderComponent)
                        });
                        this._enteredCollisions.add(collisionId);
                    }
                }
            }
        }
    }

    // resolves collisions from exited hash coords
    // FIXME: dont iterate through all collisions (maybe solve collisions via ColliderComponent)
    private resolveUncheckedCollisions(): void {
        for(const uncheckedCollision of this._activeCollisions.keys()) {
            const value = this._activeCollisions.get(uncheckedCollision)!;
            if (!value.entityCollider.isCollision(value.checkedCollider)) {
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
               boundsA.y > boundsB.y - boundsA.h;
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
