import { ScratchComponent } from "../core/ScratchComponent.abstract";
import {DisplayObject, IPointData} from "pixi.js";
import { PixiRenderer } from "../scene-scripts/PixiRenderer";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import {ITransformComponent} from "./ITransformComponent";

export class PixiComponent extends ScratchComponent implements ITransformComponent<IPointData> {

	protected pixiObject: DisplayObject;

	private readonly pixiRenderer: PixiRenderer;

	constructor(entity: ScratchEntity, pixiObject: DisplayObject) {
		super(entity);

		this.pixiObject = pixiObject;
		this.pixiRenderer = this.container.scene.requireType(PixiRenderer);
	}

	setDisplayObject(pixiObject: DisplayObject): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
		this.pixiObject = pixiObject;
		this.initialize();
	}

	dispose(): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
	}

	initialize(): void {
		this.pixiRenderer.addRenderElement(this.pixiObject);
	}

	get position(): { x: number; y: number } {
		return this.pixiObject.position;
	}

	set position(position: { x: number; y: number }) {
		this.pixiObject.position.x = position.x;
		this.pixiObject.position.y = position.y;
	}

	rotate(angle: number): void {
		this.pixiObject.rotation += angle;
	}

	get rotation(): number {
		return this.pixiObject.rotation;
	}

	set rotation(angle: number) {
		this.pixiObject.rotation = angle;
	}

	translate(x: number, y: number): void {
		this.pixiObject.position.x += x;
		this.pixiObject.position.y += y;
	}

	get scale(): { x: number; y: number } {
		return this.pixiObject.scale;
	}

	set scale(scale: { x: number; y: number }) {
		this.pixiObject.scale.x = scale.x;
		this.pixiObject.scale.y = scale.y;
	}

}
