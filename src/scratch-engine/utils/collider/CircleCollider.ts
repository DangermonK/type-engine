import { Collider } from "./Collider.abstract";
import { BoxCollider } from "./BoxCollider";
import { IVector2 } from "../../interfaces/IVector2";
import { CollisionLogic } from "../CollisionLogic";
import { LineCollider } from "./LineCollider";


export class CircleCollider extends Collider {

	private _radius!: number;

	constructor(radius: number = 1) {
		super();

		this.setRadius(radius);
	}

	setRadius(radius: number): void {
		this._radius = radius;
		this.setBounds(-radius, -radius, radius*2, radius*2);
	}

	get radius(): number {
		return this._radius;
	}

	checkCollision(position: IVector2, collider: Collider, colliderPosition: IVector2): boolean {
		switch (collider.constructor.name) {
			case BoxCollider.name:
				return CollisionLogic.checkBoxCircleCollision(
							colliderPosition.x, colliderPosition.y, (collider as BoxCollider).bounds.w,
							(collider as BoxCollider).bounds.h,
							position.x, position.y, this.radius
						).isCollision;
			case CircleCollider.name:
				return CollisionLogic.checkCircleCircleCollision(
							position.x, position.y, this.radius,
							colliderPosition.x, colliderPosition.y, (collider as CircleCollider).radius
						).isCollision;
			case LineCollider.name:
				return CollisionLogic.checkCircleLineCollision(
							position.x, position.y, this.radius,
							colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as LineCollider).vector.x,
							colliderPosition.y + (collider as LineCollider).vector.y
						).isCollision;
			default:
				return false;
		}

	}

	render(ctx: CanvasRenderingContext2D, position: IVector2): void {
		ctx.beginPath();
		ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}

}
