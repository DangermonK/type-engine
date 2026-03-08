import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {ScratchEntity} from "../core/ScratchEntity.abstract";


export class GraphicsHandler extends ScratchSceneScript {

    private readonly _ctx: CanvasRenderingContext2D;

    private readonly _renderedEntities: Set<string>;
    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityHandler = this.container.requireType(EntityHandler);
        this._renderedEntities = new Set<string>();

        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", (event) => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        })

        this._ctx = canvas.getContext("2d")!;

        document.body.appendChild(canvas);
    }

    addRenderEntity(entity: ScratchEntity): void {
        if(entity.hasListener('render')) {
            this._renderedEntities.add(entity.id);
        }
    }

    removeRenderEntity(entity: ScratchEntity): void {
        this._renderedEntities.delete(entity.id);
    }

    update(): void {
        this._ctx.clearRect(0, 0, this._ctx!.canvas.width, this._ctx!.canvas.height);

        for(const entity of this._entityHandler.getEntities(this._renderedEntities)) {
            entity.emit('render', this._ctx);
        }
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
