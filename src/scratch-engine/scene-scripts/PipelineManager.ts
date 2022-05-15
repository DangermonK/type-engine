import {ScratchSceneScript} from "../core/ScratchSceneScript.abstract";
import {ScratchScene} from "../core/ScratchScene.abstract";
import {EntityHandler} from "./EntityHandler";
import {PhysicsHandler} from "./PhysicsHandler";


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
        this._entityHandler.getEntitiesOfLayer('default').forEach(entity => entity.start());

        this._physicsHandler.resolveHashLayer('static');
        this._physicsHandler.resolveHashLayer('nother');
    }

    stop(): void {
    }

    fixedUpdate(): void {
        this._entityHandler.resolveStack();
        this._physicsHandler.resolveHashLayer('default');
        this._physicsHandler.resolveHashLayer('nother');

        this._physicsHandler.resolveCollisionsOnLayer('default');
    }

    update(): void {}

    dispose(): void {
    }

    initialize(): void {
    }

}
