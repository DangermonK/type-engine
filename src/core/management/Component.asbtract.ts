import { Process } from "../container/Process.abstract";
import { Entity } from "./Entity.abstract";
import { Scene } from "./Scene.abstract";

export abstract class Component<Type extends Scene> extends Process<Entity<Type>> {

    protected constructor(entity: Entity<Type>) {
        super(entity);
    }

}
