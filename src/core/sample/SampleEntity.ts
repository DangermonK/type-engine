import { Entity } from "../management/Entity.abstract";
import { SampleScene } from "./SampleScene";
import { SampleComponent } from "./SampleComponent";

export class SampleEntity extends Entity {

    constructor(id: string, scene: SampleScene) {
        super(id, scene);
        this.requireType(SampleComponent);
    }

    initialize() {
        super.initialize();

    }

    dispose() {
        super.dispose();
    }

    start() {
        super.start();
    }

    update() {
        super.update();
    }

}
