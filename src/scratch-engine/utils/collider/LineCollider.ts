import { Collider } from "./Collider.abstract";
import { IVector2 } from "../../interfaces/IVector2";
import { BoxCollider } from "./BoxCollider";
import { CircleCollider } from "./CircleCollider";
import { CollisionLogic } from "../CollisionLogic";
import { Vector2 } from "../Vector2";
import { ICollisionInfo } from "../IHitInfo";


export class LineCollider extends Collider {

	private readonly _vector: Vector2;

	constructor(x: number = 1, y: number = 1) {
		super();

		this._vector = new Vector2();
		this.setVector(x, y);
	}

	setVector(x: number, y: number): void {
		this._vector.x = x;
		this._vector.y = y;
		this.setBounds(Math.min(0, x), Math.min(0, y), Math.abs(x), Math.abs(y));
	}

	get vector(): IVector2 {
		return this._vector;
	}

	checkCollision(position: IVector2, collider: Collider, colliderPosition: IVector2): ICollisionInfo {
		switch(collider.constructor.name) {
			case BoxCollider.name:
				return CollisionLogic.checkBoxLineCollision(
							colliderPosition.x, colliderPosition.y, (collider as BoxCollider).bounds.w,
							(collider as BoxCollider).bounds.h,
							position.x, position.y, position.x + this.vector.x, position.y + this.vector.y
						);
			case CircleCollider.name:
				return CollisionLogic.checkCircleLineCollision(
							colliderPosition.x, colliderPosition.y, (collider as CircleCollider).radius,
							position.x, position.y, position.x + this.vector.x, position.y + this.vector.y
						);
			case LineCollider.name:
				return CollisionLogic.checkLineLineCollision(
							position.x, position.y, position.x + this.vector.x, position.y + this.vector.y,
							colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as LineCollider).vector.x,
							colliderPosition.y + (collider as LineCollider).vector.y
						);
			default:
				return { isCollision: false };
		}
	}

}
