import { Collider } from "./Collider.abstract";
import { CircleCollider } from "./CircleCollider";
import { IVector2 } from "../../interfaces/IVector2";
import { CollisionLogic } from "../CollisionLogic";
import { LineCollider } from "./LineCollider";
import { ICollisionInfo } from "../IHitInfo";


export class BoxCollider extends Collider {

	constructor(width: number = 1, height: number = 1) {
		super();

		this.setBoxSize(width, height);
	}

	setBoxSize(width: number, height: number): void {
		this.setBounds(0, 0, width, height);
	}

	checkCollision(position: IVector2, collider: Collider, colliderPosition: IVector2): ICollisionInfo {
		switch(collider.constructor.name) {
			case BoxCollider.name:
				return CollisionLogic.checkBoxBoxCollision(
							colliderPosition.x, colliderPosition.y, (collider as BoxCollider).bounds.w,
							(collider as BoxCollider).bounds.h,
							position.x, position.y, this.bounds.w, this.bounds.h
						);
			case CircleCollider.name:
				return CollisionLogic.checkBoxCircleCollision(
							position.x, position.y, this.bounds.w, this.bounds.h,
							colliderPosition.x, colliderPosition.y, (collider as CircleCollider).radius
						);
			case LineCollider.name:
				return CollisionLogic.checkBoxLineCollision(
							position.x, position.y, this.bounds.w,this.bounds.h,
							colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as LineCollider).vector.x,
							colliderPosition.y + (collider as LineCollider).vector.y
						);
			default:
				return { isCollision: false };
		}
	}

}
