import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { PhysicsHandler } from "../scene-scripts/PhysicsHandler";
import { Vector2 } from "../utils/Vector2";
import {IBounds} from "../interfaces/IBounds";
import { BoxCollider } from "../utils/collider/BoxCollider";
import { Collider } from "../utils/collider/Collider.abstract";
import { IVector2 } from "../interfaces/IVector2";


export class ColliderComponent extends ScratchComponent {

    private _collider: Collider = new BoxCollider();
	private _offset: Vector2;

    private readonly _hashCoords: Array<string>;

    private _isTrigger!: boolean;
    private _intersectionEnter!: string;
    private _intersectionExit!: string;

    constructor(entity: ScratchEntity) {
        super(entity);
        this._offset = new Vector2();

        this._hashCoords = new Array<string>();

        this.setTrigger(false);
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
        } else {
            this._intersectionEnter = 'onCollisionEnter';
            this._intersectionExit = 'onCollisionExit';
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

    isCollision(collider: ColliderComponent): boolean {
        return this._collider.checkCollision(this.position, collider.collider, collider.position);
    }

    emitCollisionEnter(collider: ColliderComponent): void {
        this.container.emit(collider._intersectionEnter, collider);
    }

    emitCollisionExit(collider: ColliderComponent): void {
        this.container.emit(collider._intersectionExit, collider);
    }

    override initialize() {
        this.container.scene.getElement(PhysicsHandler).pushCollider(this);

        this.container.addListener('onCollisionEnter');
        this.container.addListener('onCollisionExit');
        this.container.addListener('onTriggerEnter');
        this.container.addListener('onTriggerExit');
    }

    override dispose() {
        this.container.scene.getElement(PhysicsHandler).removeCollider(this);
    }

    private render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = '#0f0';
        ctx.beginPath();
        ctx.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.stroke();
        ctx.closePath();
    }

}
