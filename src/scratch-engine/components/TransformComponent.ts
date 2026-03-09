
import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { Vector2 } from "../utils/Vector2";
import {ITransformComponent} from "./ITransformComponent";

export class TransformComponent extends ScratchComponent implements ITransformComponent<Vector2> {

    private readonly _position: Vector2;
    private _rotation: number;
    private readonly _size: Vector2;

    constructor(entity: ScratchEntity) {
        super(entity);
        this._position = new Vector2();
        this._rotation = 0;
        this._size = new Vector2(1, 1);
    }

    get position(): Vector2 {
        return this._position;
    }
    set position(position: Vector2) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
    get rotation(): number {
        return this._rotation;
    }
    set rotation(value: number) {
        this._rotation = value;
    }

    translate(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }

    rotate(angle: number): void {
        this.rotation += angle;
    }
    get scale(): Vector2 {
        return this._size;
    }

    initialize(): void {
    }

    dispose(): void {
    }


}
