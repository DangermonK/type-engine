
import { Scene } from "./Scene.abstract";
import { Processor } from "../container/Processor";
import { Component } from "./Component.asbtract";

export abstract class Entity<Type extends Scene> extends Processor<Component<Type>>  {

    private readonly _scene!: Type;

    private readonly _id!: string;

    protected constructor(id: string, scene: Type) {
        super();
        this._scene = scene;
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    get scene(): Type {
        return this._scene;
    }

}
