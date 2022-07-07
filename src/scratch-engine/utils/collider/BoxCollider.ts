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
		return {
			[BoxCollider.name]: CollisionLogic.checkBoxBoxCollision(
				colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as BoxCollider).bounds.w,
				colliderPosition.x + (collider as BoxCollider).bounds.h,
				position.x, position.y, position.x + this.bounds.w,position.x + this.bounds.h
			).isCollision,
			[CircleCollider.name]: CollisionLogic.checkBoxCircleCollision(
				position.x, position.y, position.x + this.bounds.w,position.x + this.bounds.h,
				colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as CircleCollider).radius
			).isCollision,
			[LineCollider.name]: CollisionLogic.checkBoxLineCollision(
				position.x, position.y, position.x + this.bounds.w,position.x + this.bounds.h,
				colliderPosition.x, colliderPosition.y, colliderPosition.x + (collider as LineCollider).vector.x,
				colliderPosition.y + (collider as LineCollider).vector.y
			).isCollision
		}[collider.constructor.name];
	}

}
