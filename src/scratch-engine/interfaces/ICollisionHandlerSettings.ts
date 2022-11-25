import { Layer } from "../enums/Layer.enum";


export interface ICollisionHandlerSettings {

	hashGridCellSize: number;
	collisionRules: Map<Layer, Array<Layer>>;

}

export const defaultCollisionHandlerSettings: ICollisionHandlerSettings = {
	hashGridCellSize: 50,
	collisionRules: new Map<Layer, Array<Layer>>([
		[Layer.DEFAULT, [Layer.STATIC]]
	])
}
