
import { EntityFactory } from "../scene-scripts/EntityFactory";
import { EntityHandler } from "../scene-scripts/EntityHandler";
import { IRunnable } from "../../core/interfaces/IRunnable";
import { ScratchSceneScript } from "./ScratchSceneScript.abstract";
import { CollisionHandler } from "../scene-scripts/CollisionHandler";
import { Processor } from "../../core/container/Processor";
import { IScratchSceneSettings } from "../interfaces/IScratchSceneSettings";

export abstract class ScratchScene extends Processor<ScratchSceneScript> implements IRunnable {

    private readonly _entityFactory: EntityFactory;
    private readonly _entityHandler: EntityHandler;
    private readonly _collisionHandler: CollisionHandler;

    private readonly _settings: IScratchSceneSettings;

    protected constructor(settings: IScratchSceneSettings) {
        super();

        this._settings = settings;

        this._entityFactory = this.requireType(EntityFactory);
        this._entityHandler = this.requireType(EntityHandler);
        this._collisionHandler = this.requireType(CollisionHandler);
    }

    get settings(): IScratchSceneSettings {
        return this._settings;
    }

}
