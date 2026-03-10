import {ScratchComponent} from "../core/ScratchComponent.abstract";
import {ScratchEntity} from "../core/ScratchEntity.abstract";
import {GraphicsHandler} from "../scene-scripts/GraphicsHandler";

export class RenderComponent extends ScratchComponent {

    private readonly _renderer: GraphicsHandler;

    constructor(entity: ScratchEntity) {
        super(entity);

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
