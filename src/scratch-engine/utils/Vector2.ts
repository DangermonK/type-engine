import { IVector2 } from "../interfaces/IVector2";


export class Vector2 implements IVector2 {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }

    dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    add(vec: Vector2): void {
        this.x += vec.x;
        this.y += vec.y;
    }

    subtract(vec: Vector2): void {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    normalize(): void {
        const magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    normalized(): Vector2 {
        const magnitude = this.magnitude();
        return new Vector2(
            this.x / magnitude,
            this.y / magnitude
        );
    }

    stretch(length: number) {
        this.normalize();
        this.x *= length;
        this.y *= length;
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    lerp(target: Vector2, time: number): void {
        const diffx = target.x - this.x;
        const diffy = target.y - this.y;
        this.set(this.x + diffx * time, this.y + diffy * time);
    }

    negated(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    normal(): Vector2 {
        return new Vector2(this.y, -this.x);
    }

}
