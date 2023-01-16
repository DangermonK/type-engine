import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { DisplayObject } from "pixi.js";
import { PixiRenderer } from "../scene-scripts/PixiRenderer";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class PixiComponent extends ScratchComponent {

	protected readonly pixiObject: DisplayObject;

	private readonly pixiRenderer: PixiRenderer;

	constructor(entity: ScratchEntity, pixiObject: DisplayObject) {
		super(entity);

		this.pixiObject = pixiObject;
		this.pixiRenderer = this.container.scene.requireType(PixiRenderer);
	}

	dispose(): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
	}

	initialize(): void {
		this.pixiObject.scale = this.container.transform.size;
		this.pixiObject.position = this.container.transform.position;
		this.pixiObject.rotation = this.container.transform.rotation;
		this.pixiRenderer.addRenderElement(this.pixiObject);
	}

}
