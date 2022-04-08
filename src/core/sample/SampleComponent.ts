import { Component } from "../management/Component.asbtract";
import { Scene } from "../management/Scene.abstract";
import { Entity } from "../management/Entity.abstract";


export class SampleComponent extends Component {

    constructor(entity: Entity) {
        super(entity);
    }

    dispose(): void {
    }

    fixedUpdate(): void {
    }

    initialize(): void {

    }

    start(): void {
    }

    stop(): void {
    }

    update(): void {
    }

}
