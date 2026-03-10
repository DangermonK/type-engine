
import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { Vector2 } from "../utils/Vector2";
import {ITransformComponent} from "./ITransformComponent";


export class TransformComponent extends ScratchComponent implements ITransformComponent {

    private readonly _position: Vector2;
    private _rotation: number;
    private readonly _size: Vector2;

    constructor(entity: ScratchEntity) {
        super(entity);
        this._position = new Vector2();
        this._rotation = 0;
        this._size = new Vector2(1, 1);
    }

    get position(): { x: number; y: number; } {
        return this._position;
    }

    set position(position: { x: number; y: number; }) {
        this._position.set(position.x, position.y);
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(rotation: number) {
        this._rotation = rotation;
    }

    get size(): { x: number; y: number; } {
        return this._size;
    }

    set size(size: { x: number; y: number; }) {
        this._size.set(size.x, size.y);
    }

    scale(scale: { x: number; y: number; }) {
        this.size.x *= scale.x;
        this.size.y *= scale.y;
    }

    translate(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }

    rotate(angle: number): void {
        this.rotation += angle;
    }

    initialize(): void {
    }

    dispose(): void {
    }

}
