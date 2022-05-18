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

    start(): void {
        this._entityHandler.resolveStack();
        this._physicsHandler.resolveAllLayers();
    }

    stop(): void {
    }

    fixedUpdate(): void {
        this._entityHandler.resolveStack();
        // TODO: automate hashing on all layers
        this._physicsHandler.resolveAllLayers();

        this._physicsHandler.resolveAllCollisions();

    }

    update(): void {}

    dispose(): void {
    }

    initialize(): void {
        this._entityHandler.resolveStack();
    }

}
