import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { PhysicsHandler } from "../scene-scripts/PhysicsHandler";
import { Vector2 } from "../utils/Vector2";


export class ColliderComponent extends ScratchComponent {

    private readonly _boundsOffset: Vector2;
    private readonly _bounds: Vector2;

    private readonly _hashCoords: Array<string>;

    constructor(entity: ScratchEntity) {
        super(entity);

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
            x: this.container.transform.position.x + this._boundsOffset.x,
            y: this.container.transform.position.y + this._boundsOffset.y,
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

    override initialize() {
        super.initialize();

        this.container.scene.getElement(PhysicsHandler).pushCollider(this);
    }

    override dispose() {
        super.dispose();
    }

}
