import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { Application, DisplayObject, IApplicationOptions } from "pixi.js";
import { ScratchScene } from "../core/ScratchScene.abstract";

export class PixiRenderer extends ScratchSceneScript {

	private readonly pixiContainer: Application;

	constructor(scene: ScratchScene, options: IApplicationOptions = { resizeTo: window }) {
		super(scene);

		this.pixiContainer = new Application(options);
	}

	addRenderElement(pixiObject: DisplayObject): void {
		this.pixiContainer.stage.addChild(pixiObject);
	}

	removeRenderElement(pixiObject: DisplayObject): void {
		this.pixiContainer.stage.removeChild(pixiObject);
	}

	setPosition(x: number, y: number): void {
		this.pixiContainer.stage.x = -x + this.pixiContainer.view.width * 0.5;
		this.pixiContainer.stage.y = -y + this.pixiContainer.view.height * 0.5;
	}

	dispose(): void {
		// @ts-ignore
		document.body.removeChild(this.pixiContainer.view);
	}

	initialize(): void {
		// @ts-ignore
		document.body.appendChild(this.pixiContainer.view);
	}

}
