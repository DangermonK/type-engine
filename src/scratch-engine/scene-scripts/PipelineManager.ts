import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {PhysicsHandler} from "./PhysicsHandler";
import {Layer} from "../enums/Layer.enum";


export class PipelineManager extends ScratchSceneScript {

    private readonly _entityHandler: EntityHandler;
    private readonly _physicsHandler: PhysicsHandler;

    constructor(scene: ScratchScene) {
        super(scene);

        this._entityHandler = this.container.requireType(EntityHandler);
        this._physicsHandler = this.container.requireType(PhysicsHandler);
    }

    // TODO: resolve layers via settings
    start(): void {
        this._entityHandler.resolveStack();
        this._entityHandler.getEntitiesOfLayer(Layer.DEFAULT).forEach(entity => entity.start());

        this._physicsHandler.resolveHashLayer(Layer.STATIC);
    }

    stop(): void {
    }

    fixedUpdate(): void {
        this._entityHandler.resolveStack();
        this._physicsHandler.resolveHashLayer(Layer.DEFAULT);

        this._physicsHandler.resolveCollisionsOnLayer(Layer.DEFAULT);
    }

    update(): void {}

    dispose(): void {
    }

    initialize(): void {
    }

}
