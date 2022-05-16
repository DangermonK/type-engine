
import { EntityFactory } from "../scene-scripts/EntityFactory";
import { EntityHandler } from "../scene-scripts/EntityHandler";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";
import { PhysicsHandler } from "../scene-scripts/PhysicsHandler";
import { Processor } from "../../core/container/Processor";
import {PipelineManager} from "../scene-scripts/PipelineManager";
import {IScratchSceneSettings} from "../interfaces/IScratchSceneSettings";

export abstract class ScratchScene extends Processor<ScratchSceneScript> implements IRunnable {

    private readonly _entityFactory: EntityFactory;
    private readonly _entityHandler: EntityHandler;
    private readonly _physicsHandler: PhysicsHandler;
    private readonly _pipelineManager: PipelineManager;

    private readonly _settings: IScratchSceneSettings;

    protected constructor(settings: IScratchSceneSettings) {
        super();

        this._settings = settings;

        this._entityFactory = this.requireType(EntityFactory);
        this._entityHandler = this.requireType(EntityHandler);
        this._physicsHandler = this.requireType(PhysicsHandler);
        this._pipelineManager = this.requireType(PipelineManager);
    }

    get settings(): IScratchSceneSettings {
        return this._settings;
    }

}
