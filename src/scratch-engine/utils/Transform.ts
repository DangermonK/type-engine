
import { Vector2 } from "../utils/Vector2";


export class Transform {

    public readonly position: Vector2;
    public rotation: number;
    public readonly size: Vector2;

    constructor() {
        this.position = new Vector2();
        this.rotation = 0;
        this.size = new Vector2(1, 1);
    }

    translate(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }

    rotate(angle: number): void {
        this.rotation += angle;
    }

    scale(x: number, y: number): void {
        this.size.x += x;
        this.size.y += y;
    }

}
