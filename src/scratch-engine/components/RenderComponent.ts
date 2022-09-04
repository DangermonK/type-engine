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

    private render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = '#00f';
        ctx.fillStyle = '#000';
        //ctx.fillText(this.container.constructor.name, this.container.transform.position.x, this.container.transform.position.y);
        ctx.beginPath();
        ctx.moveTo(this.container.transform.position.x - 5, this.container.transform.position.y);
        ctx.lineTo(this.container.transform.position.x + 5, this.container.transform.position.y);
        ctx.moveTo(this.container.transform.position.x, this.container.transform.position.y - 5);
        ctx.lineTo(this.container.transform.position.x, this.container.transform.position.y + 5);
        ctx.stroke();
        ctx.closePath();
    }

}
