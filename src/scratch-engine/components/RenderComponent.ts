import {ScratchComponent} from "../core/ScratchComponent.abstract";
import {ScratchEntity} from "../core/ScratchEntity.abstract";
import {GraphicsHandler} from "../scene-scripts/GraphicsHandler";
import { TransformComponent } from "./TransformComponent";


export class RenderComponent extends ScratchComponent {

    private readonly _renderer: GraphicsHandler;

    constructor(entity: ScratchEntity) {
        super(entity);

        this.container.requireType(TransformComponent);
        this._renderer = this.container.scene.requireType(GraphicsHandler);
    }

    dispose(): void {
        this._renderer.removeRenderEntity(this.container);
    }

    initialize(): void {
        this.container.addListener('render');

        this._renderer.addRenderEntity(this.container);
    }

}
