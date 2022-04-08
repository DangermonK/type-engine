import { Component } from "../management/Component.asbtract";
import { Scene } from "../management/Scene.abstract";
import { Entity } from "../management/Entity.abstract";
import { SampleScene } from "./SampleScene";


export class SampleComponent extends Component<SampleScene> {

    constructor(entity: Entity<SampleScene>) {
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
