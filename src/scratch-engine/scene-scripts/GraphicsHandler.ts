import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {RenderComponent} from "../components/RenderComponent";
import {ScratchEntity} from "../core/ScratchEntity.abstract";


export class GraphicsHandler extends ScratchSceneScript {

    private _ctx?: CanvasRenderingContext2D;

    private readonly _renderedEntities: Array<string>;
    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityHandler = this.container.requireType(EntityHandler);
        this._renderedEntities = new Array<string>();
    }

    addRenderEntity(entity: ScratchEntity): void {
        if(entity.hasListener('render')) {
            this._renderedEntities.push(entity.id);
        }
    }

    removeRenderEntity(entity: ScratchEntity): void {
        const index = this._renderedEntities.indexOf(entity.id);
        if(index !== -1)
            this._renderedEntities.splice(index, 1);
    }

    setCanvasRenderingContext(ctx: CanvasRenderingContext2D): void {
        this._ctx = ctx;

        this.update = () => {
            this._ctx!.clearRect(0, 0, this._ctx!.canvas.width, this._ctx!.canvas.height);

            for(const entity of this._entityHandler.getEntities(this._renderedEntities.values())) {
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
