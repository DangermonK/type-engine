import { Scene } from "../management/Scene.abstract";
import { EntityFactory } from "./EntityFactory";
import { SampleEntity } from "./SampleEntity";
import { EntityHandler } from "./EntityHandler";

export class SampleScene extends Scene {

    private readonly _entityFactory: EntityFactory;
    private readonly _entityHandler: EntityHandler;

    constructor() {
        super();

        this._entityFactory = this.requireType(EntityFactory);
        this._entityHandler = this.requireType(EntityHandler);
    }

    bla() {}

    initialize() {
        super.initialize();
        this._entityFactory.instantiate(SampleEntity);
        this._entityFactory.instantiate(SampleEntity);
    }

    fixedUpdate(): void {
        this._entityHandler.fixedUpdate();
    }

    start(): void {
        this._entityHandler.start();
    }

    stop(): void {
        this._entityHandler.stop();
    }

    update(): void {
        this._entityHandler.update();
    }


}
