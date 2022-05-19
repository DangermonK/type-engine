import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {RenderComponent} from "../components/RenderComponent";
import {ScratchEntity} from "../core/ScratchEntity.abstract";


export class GraphicsHandler extends ScratchSceneScript {

    private _ctx?: CanvasRenderingContext2D;

    private readonly _renderedEntities: Set<string>;
    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityHandler = this.container.requireType(EntityHandler);
        this._renderedEntities = new Set<string>();
    }

    addRenderEntity(entity: ScratchEntity): void {
        if(entity.hasListener('render')) {
            this._renderedEntities.add(entity.id);
        }
    }

    removeRenderEntity(entity: ScratchEntity): void {
        this._renderedEntities.delete(entity.id);
    }

    setCanvasRenderingContext(ctx: CanvasRenderingContext2D): void {
        this._ctx = ctx;

        this.update = () => {
            this._ctx!.clearRect(0, 0, this._ctx!.canvas.width, this._ctx!.canvas.height);

            for(const entity of this._entityHandler.getEntities(this._renderedEntities)) {
                entity.emit('render', this._ctx);
            }
        };
    }

    update(): void {}

    dispose(): void {
    }

    initialize(): void {
    }

}
