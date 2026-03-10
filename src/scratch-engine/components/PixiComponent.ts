import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { DisplayObject } from "pixi.js";
import { PixiRenderer } from "../scene-scripts/PixiRenderer";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export class PixiComponent extends ScratchComponent {

	protected pixiObject!: DisplayObject;

	private readonly pixiRenderer: PixiRenderer;

	constructor(entity: ScratchEntity, pixiObject: DisplayObject) {
		super(entity);

		this.pixiRenderer = this.container.scene.requireType(PixiRenderer);
		this.setDisplayObject(pixiObject)
	}

	setDisplayObject(pixiObject: DisplayObject): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
		this.pixiObject = pixiObject;
		this.overrideTransform();
		this.pixiRenderer.addRenderElement(this.pixiObject);
	}

	dispose(): void {
		this.pixiRenderer.removeRenderElement(this.pixiObject);
	}

	overrideTransform() {
		this.pixiObject.position = this.container.transform.position;
		this.pixiObject.rotation = this.container.transform.rotation;
		this.pixiObject.scale = this.container.transform.size;

		Object.defineProperties(this.container.transform.position, {
			_x: {
				get: () => this.pixiObject.position.x,
				set: (val) => this.pixiObject.position.x = val,
			},
			_y: {
				get: () => this.pixiObject.position.y,
				set: (val) => this.pixiObject.position.y = val,
			},
		})

		Object.defineProperties(this.container.transform.size, {
			_x: {
				get: () => this.pixiObject.scale.x,
				set: (val) => this.pixiObject.scale.x = val,
			},
			_y: {
				get: () => this.pixiObject.scale.y,
				set: (val) => this.pixiObject.scale.y = val,
			},
		})

		Object.defineProperty(this.container.transform, "rotation", {
			get: () => this.pixiObject.rotation,
			set: (val) => this.pixiObject.rotation = val,
		})
	}

	initialize(): void {
	}

}
