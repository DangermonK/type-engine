import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { CollisionHandler } from "../scene-scripts/CollisionHandler";
import { Vector2 } from "../utils/Vector2";
import { IBounds } from "../interfaces/IBounds";
import { BoxCollider } from "../utils/collider/BoxCollider";
import { Collider } from "../utils/collider/Collider.abstract";
import { IVector2 } from "../interfaces/IVector2";
import { TransformComponent } from "./TransformComponent";
import { ICollisionInfo } from "../utils/IHitInfo";
import { ICollision } from "../interfaces/ICollision";


export class ColliderComponent extends ScratchComponent {

    private _collider: Collider = new BoxCollider();
	private _offset: Vector2;

    private readonly _hashCoords: Array<string>;
    private readonly _collisionHandler: CollisionHandler;

    private _isTrigger!: boolean;
    private _intersectionEnter!: string;
    private _intersectionExit!: string;
    private _intersectionStay!: string;

    constructor(entity: ScratchEntity) {
        super(entity);
        this._offset = new Vector2();

        this._hashCoords = new Array<string>();

        this._collisionHandler = this.container.scene.requireType(CollisionHandler);

        this.setTrigger(false);

        this.container.requireType(TransformComponent);
    }

    setCollider(collider: Collider): void {
        this._collider = collider;
    }

    get collider(): Collider {
        return this._collider;
    }

    get position(): IVector2 {
        return {
            x: this.container.transform.position.x + this._offset.x,
            y: this.container.transform.position.y + this._offset.y
        }
    }

    get bounds(): IBounds {
        return {
            x: this.container.transform.position.x + this._offset.x + this._collider.bounds.x,
            y: this.container.transform.position.y + this._offset.y + this._collider.bounds.y,
            w: this._collider.bounds.w,
            h: this._collider.bounds.h
        }
    }

    setOffset(x: number, y: number): void {
        this._offset.x = x;
        this._offset.y = y;
    }

    setTrigger(trigger: boolean): void {
        this._isTrigger = trigger;

        if(trigger) {
            this._intersectionEnter = 'onTriggerEnter';
            this._intersectionExit = 'onTriggerExit';
            this._intersectionStay = 'onTriggerStay';
        } else {
            this._intersectionEnter = 'onCollisionEnter';
            this._intersectionExit = 'onCollisionExit';
            this._intersectionStay = 'onCollisionStay';
        }
    }

    get trigger(): boolean {
        return this._isTrigger;
    }

    clearHashCoords(): void {
        this._hashCoords.length = 0;
    }

    addHashCoords(coords: string): void {
        this._hashCoords.push(coords);
    }

    get hashCoords(): Array<string> {
        return this._hashCoords;
    }

    getHashCoords(): Array<any> {
        return this._hashCoords.map((hash) => {
            return hash.split(':').map((value) => {return parseInt(value)});
        });
    }

    isCollision(collider: ColliderComponent): ICollisionInfo {
        return this._collider.checkCollision(this.position, collider.collider, collider.position);
    }

    emitCollisionEnter(collision: ICollision): void {
        this.container.emit(collision.collider._intersectionEnter, collision);
    }

    emitCollisionStay(collision: ICollision): void {
        this.container.emit(collision.collider._intersectionStay, collision);
    }

    emitCollisionExit(collision: ICollision): void {
        this.container.emit(collision.collider._intersectionExit, collision);
    }

    override initialize() {
        this._collisionHandler.pushCollider(this);

        this.container.addListener('onCollisionEnter');
        this.container.addListener('onCollisionExit');
        this.container.addListener('onCollisionStay');
        this.container.addListener('onTriggerEnter');
        this.container.addListener('onTriggerExit');
        this.container.addListener('onTriggerStay');
    }

    override dispose() {
        this._collisionHandler.removeCollider(this);
    }

}
