import { ScratchComponent } from "../core/ScratchComponent.abstract";
import {Container, DisplayObject} from "pixi.js";
import { PixiRenderer } from "../scene-scripts/PixiRenderer";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import {ITransformComponent, IVector2Like} from "./ITransformComponent";

export class PixiComponent extends ScratchComponent implements ITransformComponent {

	protected pixiObject!: DisplayObject;

	private readonly pixiRenderer: PixiRenderer;

	constructor(entity: ScratchEntity, pixiObject: DisplayObject = new Container()) {
		super(entity);

		this.pixiRenderer = this.container.scene.requireType(PixiRenderer);
		this.pixiObject = pixiObject;
		this.pixiRenderer.addRenderElement(this.pixiObject);
	}

	setDisplayObject(pixiObject: DisplayObject): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
		this.pixiObject = pixiObject;
		this.pixiRenderer.addRenderElement(this.pixiObject);
	}

	dispose(): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
	}

	initialize(): void {
	}

	get position(): IVector2Like {
		return this.pixiObject.position;
	}

	rotate(angle: number): void {
		this.pixiObject.rotation += angle;
	}

	get rotation(): number {
		return this.pixiObject.rotation;
	}

	scale(scale: IVector2Like): void {
		this.pixiObject.scale.x *= scale.x;
		this.pixiObject.scale.y *= scale.y;
	}

	get size(): IVector2Like {
		return this.pixiObject.scale;
	}

	translate(x: number, y: number): void {
		this.pixiObject.position.x += x;
		this.pixiObject.position.y += y;
	}

}
