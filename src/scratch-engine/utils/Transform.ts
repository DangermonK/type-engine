
import { Vector2 } from "../utils/Vector2";


export class Transform {

    public readonly position: Vector2;
    public rotation: number;
    public readonly size: Vector2;

    private readonly _boundsOffset: Vector2;
    private readonly _bounds: Vector2;

    private readonly _hashCoords: Array<string>;

    constructor() {
        this.position = new Vector2();
        this.rotation = 0;
        this.size = new Vector2(1, 1);

        this._boundsOffset = new Vector2();
        this._bounds = new Vector2(1, 1);

        this._hashCoords = new Array<string>();
    }

    setBounds(x: number, y: number, w: number, h: number): void {
        this._bounds.x = w;
        this._bounds.y = h;
        this._boundsOffset.x = x;
        this._boundsOffset.y = y;
    }

    get bounds(): any {
        return {
            x: this.position.x + this._boundsOffset.x,
            y: this.position.y + this._boundsOffset.y,
            w: this._bounds.x,
            h: this._bounds.y
        }
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
