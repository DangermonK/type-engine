import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { EntityHandler } from "./EntityHandler";
import { HashedGrid } from "../utils/HashedGrid";
import { ColliderComponent } from "../components/ColliderComponent";
import { IBounds } from "../interfaces/IBounds";
import { Layer } from "../enums/Layer.enum";
import { IActiveCollision, ICollision } from "../interfaces/ICollision";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { defaultCollisionHandlerSettings, ICollisionHandlerSettings } from "../interfaces/ICollisionHandlerSettings";
import { IVector2 } from "../interfaces/IVector2";
import { DDALine, DDARay } from "@dangermonk/dda-ray";
import { Vector2 } from "../utils/Vector2";
import { LineCollider } from "../utils/collider/LineCollider";
import { ICollisionInfo } from "../utils/IHitInfo";

export class CollisionHandler extends ScratchSceneScript {

    private readonly _settings: ICollisionHandlerSettings;

    private readonly _entityHandler: EntityHandler;

    private readonly _layerMap: Map<Layer, Set<string>>;
    private readonly _layeredGridMap: Map<Layer, HashedGrid>;

    private readonly _activeCollisions: Map<string, IActiveCollision>;
    private readonly _enteredCollisions: Set<string>;
    private readonly _exitedCollisions: Set<string>;
    private readonly _stayedCollisions: Set<string>;

    constructor(scene: ScratchScene, settings: ICollisionHandlerSettings = defaultCollisionHandlerSettings) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);

        this._settings = settings;

        this._layerMap = new Map<Layer, Set<string>>();
        this._layeredGridMap = new Map<Layer, HashedGrid>();

        settings.collisionRules.forEach((targets, source) => {
            [...targets, source].forEach(layer => {
                 this._layerMap.set(layer, new Set<string>());
                 this._layeredGridMap.set(layer, new HashedGrid(settings.hashGridCellSize));
            });
        })

        this._activeCollisions = new Map<string, IActiveCollision>();
        this._enteredCollisions = new Set<string>();
        this._exitedCollisions = new Set<string>();
        this._stayedCollisions = new Set<string>();
    }

    pushCollider(collider: ColliderComponent): void {
        if(!this._layerMap.has(collider.container.options.layer))
            this._layerMap.set(collider.container.options.layer, new Set<string>());
        this._layerMap.get(collider.container.options.layer)!.add(collider.container.id);

        if(!this._layeredGridMap.has(collider.container.options.layer))
            this._layeredGridMap.set(collider.container.options.layer, new HashedGrid(this._settings.hashGridCellSize));

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
        for(const layer of this._settings.collisionRules.keys()) {
            this.resolveCollisionsOnLayer(layer);
        }

        this.resolveUncheckedCollisions();
        this.emitCurrentCollisions();
    }

    raycastHit(origin: Vector2, target: Vector2, layer: Set<Layer>): ICollision | null {
        // todo: refactor / optimize and add mutliple methods for ray/linecasting
        let lastPosition: IVector2 = new Vector2(origin.x / this._settings.hashGridCellSize, origin.y / this._settings.hashGridCellSize);

        const raycast = new DDALine(lastPosition, {
            x: target.x / this._settings.hashGridCellSize,
            y: target.y / this._settings.hashGridCellSize
        });

        let nextPosition = {
            pos: lastPosition,
            cell: new Vector2() as IVector2,
            stop: false
        };

        const collisions: Array<ICollision> = new Array<ICollision>();
        const collider = new LineCollider();

        do {
            nextPosition = raycast.next();
            collider.setVector((nextPosition.pos.x - lastPosition.x)*this._settings.hashGridCellSize, (nextPosition.pos.y - lastPosition.y)*this._settings.hashGridCellSize)

            collisions.length = 0;
            const elements = [];
            for(let l of layer) {
                elements.push(...this._layeredGridMap.get(l)!.getElementsFromCoordinates(nextPosition.cell.x, nextPosition.cell.y));
            }

            const entities = this._entityHandler.getEntities(new Set<string>(elements));

            for(let e of entities) {
                const entityCollider = e.getElement(ColliderComponent);
                const collisionInfo: ICollisionInfo = entityCollider.collider.checkCollision(e.transform.position, collider, new Vector2(lastPosition.x * this._settings.hashGridCellSize, lastPosition.y * this._settings.hashGridCellSize));

                if(collisionInfo.isCollision)
                    collisions.push({
                        collider: entityCollider,
                        hitInfo: collisionInfo.hitInfo
                    });
            }

            if(collisions.length > 0) {
                break;
            }

        } while (!nextPosition.stop)

        if(collisions.length < 1) {
            return null;
        }

        let dist = Infinity;
        let shortest = 0;
        let counter = 0;
        for(const collision of collisions) {
            const diff = {
                x: lastPosition.x*this._settings.hashGridCellSize - collision.hitInfo!.x,
                y: lastPosition.y*this._settings.hashGridCellSize - collision.hitInfo!.y,
            };
            const absDist = Math.sqrt(diff.x*diff.x + diff.y*diff.y);
            if(absDist < dist) {
                shortest = counter;
                dist = absDist;
            }
            counter++;
        }

        return collisions[shortest];

    }

    // TODO: optimize same layer collisions
    // TODO: optimize collision checks for none moving objects
    private resolveCollisionsOnLayer(layer: Layer = Layer.DEFAULT): void {
        const entities = this._entityHandler.getEntities(this._layerMap.get(layer)!);
        const compareLayers = this._settings.collisionRules.get(layer) || [];

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

                    if(!CollisionHandler.checkBoundsIntersection(collider.bounds, compareEntity.getElement(ColliderComponent).bounds))
                        continue;

                    const collision = collider.isCollision(compareEntity.getElement(ColliderComponent));
                    if(!collision.isCollision)
                        continue;

                    this._activeCollisions.set(collisionId, {
                        sourceCollider: collider,
                        collision: {
                            collider: compareEntity.getElement(ColliderComponent),
                            hitInfo: collision.hitInfo
                        }
                    });
                    this._enteredCollisions.add(collisionId);
                }
            }
        }
    }

    // resolves collisions from exited hash coords
    // FIXME: dont iterate through all collisions (maybe solve collisions via ColliderComponent)
    private resolveUncheckedCollisions(): void {
        for(const uncheckedCollision of this._activeCollisions.keys()) {
            const value = this._activeCollisions.get(uncheckedCollision)!;
            const collision = value.sourceCollider.isCollision(value.collision.collider);
            if (!collision.isCollision) {
                this._exitedCollisions.add(uncheckedCollision);
            } else {
                this._stayedCollisions.add(uncheckedCollision);
                this._activeCollisions.get(uncheckedCollision)!.collision.hitInfo = collision.hitInfo;
            }
        }
    }

    private emitCurrentCollisions(): void {
        for(const collisionId of this._enteredCollisions) {
            const collision = this._activeCollisions.get(collisionId)!;
            collision.sourceCollider.emitCollisionEnter(collision.collision);
        }

        for(const collisionId of this._stayedCollisions) {
            const collision = this._activeCollisions.get(collisionId)!;
            collision.sourceCollider.emitCollisionStay(collision.collision);
        }

        for(const collisionId of this._exitedCollisions) {
            const collision = this._activeCollisions.get(collisionId)!;
            collision.sourceCollider.emitCollisionExit(collision.collision);
            this._activeCollisions.delete(collisionId);
        }

        this._enteredCollisions.clear();
        this._stayedCollisions.clear();
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
