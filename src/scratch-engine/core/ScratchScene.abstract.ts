
import { EntityFactory } from "../scene-scripts/EntityFactory";
import { EntityHandler } from "../scene-scripts/EntityHandler";
import { Container } from "../../core/container/Container";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";


export abstract class ScratchScene extends Container<ScratchSceneScript> implements IRunnable {

    private readonly _entityFactory: EntityFactory;
    private readonly _entityHandler: EntityHandler;

    protected constructor() {
        super();

        this._entityFactory = this.requireType(EntityFactory);
        this._entityHandler = this.requireType(EntityHandler);

    }

    fixedUpdate(): void {
    }

    start(): void {
    }

    stop(): void {
    }

    update(): void {
    }

}
