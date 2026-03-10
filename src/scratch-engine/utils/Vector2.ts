import { IVector2 } from "../interfaces/IVector2";


export class Vector2 implements IVector2 {

    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    get x(): number { return this._x; }
    get y(): number { return this._y; }

    set x(value: number) { this._x = value; }
    set y(value: number) { this._y = value; }

    set(x: number, y: number): void {
      this._x = x;
      this._y = y;
    }

    dot(vector: Vector2): number {
        return this._x * vector.x + this._y * vector.y;
    }

    add(vec: Vector2): void {
        this._x += vec.x;
        this._y += vec.y;
    }

    subtract(vec: Vector2): void {
        this._x -= vec.x;
        this._y -= vec.y;
    }

    normalize(): void {
        const magnitude = this.magnitude();
        if(magnitude == 0)
            this.set(0, 0);

        this._x /= magnitude;
        this._y /= magnitude;
    }

    normalized(): Vector2 {
        const magnitude = this.magnitude();
        if(magnitude == 0)
            return new Vector2();

        return new Vector2(
            this._x / magnitude,
            this._y / magnitude
        );
    }

    stretch(length: number) {
        this.normalize();
        this._x *= length;
        this._y *= length;
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    lerp(target: Vector2, time: number): void {
        const diffx = target.x - this._x;
        const diffy = target.y - this._y;
        this.set(this._x + diffx * time, this._y + diffy * time);
    }

    negated(): Vector2 {
        return new Vector2(-this._x, -this._y);
    }

    normal(): Vector2 {
        return new Vector2(this._y, -this._x);
    }

}
