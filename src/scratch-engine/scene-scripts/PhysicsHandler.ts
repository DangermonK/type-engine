import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { EntityHandler } from "./EntityHandler";


export class PhysicsHandler extends ScratchSceneScript implements IRunnable {

    private readonly _entityHandler: EntityHandler;

    constructor(scene: ScratchScene) {
        super(scene);
        this._entityHandler = this.container.requireType(EntityHandler);
    }

    fixedUpdate(): void {
    }

    start(): void {
    }

    stop(): void {
    }

    update(): void {
    }

    dispose(): void {
    }

    initialize(): void {
    }

}
