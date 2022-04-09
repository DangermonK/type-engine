


export class Vector2 {

    public x: number;
    public y: number;

    constructor(x = 0, y= 0) {
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

    negated(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

}
