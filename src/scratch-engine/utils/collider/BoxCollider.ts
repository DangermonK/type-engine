import { Collider } from "./Collider.abstract";
import { CircleCollider } from "./CircleCollider";
import { IVector2 } from "../../interfaces/IVector2";
import { Collision, CollisionLogic } from "../CollisionLogic";
import { LineCollider } from "./LineCollider";


export class BoxCollider extends Collider {

	constructor(width: number = 1, height: number = 1) {
		super();

		this.setBoxSize(1, 1);
	}

	setBoxSize(width: number, height: number): void {
		this.setBounds(0, 0, width, height);
	}

	checkCollision(position: IVector2, collider: Collider, colliderPosition: IVector2): boolean {
		switch(collider.constructor.name) {
			case BoxCollider.name:
				return CollisionLogic.checkBoxBoxCollision(
							colliderPosition.x, colliderPosition.y, (collider as BoxCollider).bounds.w,
							(collider as BoxCollider).bounds.h,
							position.x, position.y, this.bounds.w, this.bounds.h
						).isCollision;
			case CircleCollider.name:
				return CollisionLogic.checkBoxCircleCollision(
							position.x, position.y, this.bounds.w, this.bounds.h,
							colliderPosition.x, colliderPosition.y, (collider as CircleCollider).radius
						).isCollision;
			case LineCollider.name:
				return CollisionLogic.checkBoxLineCollision(
							position.x, position.y, this.bounds.w,this.bounds.h,
							colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as LineCollider).vector.x,
							colliderPosition.y + (collider as LineCollider).vector.y
						).isCollision;
			default:
				return false;
		}
	}

	render(ctx: CanvasRenderingContext2D, position: IVector2): void {
		ctx.strokeStyle = '#f00';
		ctx.beginPath();
		ctx.rect(position.x, position.y, this.bounds.w, this.bounds.h);
		ctx.stroke();
		ctx.closePath();
	}

}
