
import { EntityFactory } from "../scene-scripts/EntityFactory";
import { EntityHandler } from "../scene-scripts/EntityHandler";
import { IRunnable } from "../../core/container/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";
import { PhysicsHandler } from "../scene-scripts/PhysicsHandler";
import { IScratchSceneSettings } from "./IScratchSceneSettings";
import { Processor } from "../../core/container/Processor";

export abstract class ScratchScene extends Processor<ScratchSceneScript> implements IRunnable {

    private readonly _entityFactory: EntityFactory;
    private readonly _entityHandler: EntityHandler;
    private readonly _physicsHandler: PhysicsHandler;

    private readonly _settings: IScratchSceneSettings;

    protected constructor(settings: IScratchSceneSettings) {
        super();

        this._settings = settings;

        this._entityFactory = this.requireType(EntityFactory);
        this._entityHandler = this.requireType(EntityHandler);
        this._physicsHandler = this.requireType(PhysicsHandler);
    }

    get settings(): IScratchSceneSettings {
        return this._settings;
    }

}
