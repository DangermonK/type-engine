
import { Scene } from "./Scene.abstract";
import { Processor } from "../container/Processor";
import { Component } from "./Component.asbtract";

export abstract class Entity extends Processor<Component>  {

    private readonly _scene!: Scene;

    private readonly _id!: string;

    protected constructor(id: string, scene: Scene) {
        super();
        this._scene = scene;
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    get scene(): Scene {
        return this._scene;
    }

}
