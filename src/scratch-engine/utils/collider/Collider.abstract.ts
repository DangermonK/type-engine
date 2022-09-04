import { Vector2 } from "../Vector2";
import { IBounds } from "../../interfaces/IBounds";
import { IVector2 } from "../../interfaces/IVector2";
import { ICollisionInfo } from "../IHitInfo";


export abstract class Collider {

	private _bounds: Vector2;
	private _boundsOffset: Vector2;

	protected constructor() {
		this._bounds = new Vector2(1, 1);
		this._boundsOffset = new Vector2(0, 0);
	}

	protected setBounds(x: number, y: number, w: number, h: number): void {
		this._bounds.x = w;
		this._bounds.y = h;
		this._boundsOffset.x = x;
		this._boundsOffset.y = y;
	}

	get bounds(): IBounds {
		return {
			x: this._boundsOffset.x,
			y: this._boundsOffset.y,
			w: this._bounds.x,
			h: this._bounds.y
		}
	}

	abstract checkCollision(position: IVector2, collider: Collider, colliderPosition: IVector2): ICollisionInfo;

	abstract render(ctx: CanvasRenderingContext2D, position: IVector2): void;

}
