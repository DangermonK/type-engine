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

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    lerp(target: Vector2, time: number): void {
        const diffx = this.x - target.x;
        const diffy = this.y - target.y;
        this.set(this.x + diffx * time, this.y + diffy * time);
    }

    negated(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

}
