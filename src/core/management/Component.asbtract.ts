import { Process } from "../container/Process.abstract";
import { Entity } from "./Entity.abstract";

export abstract class Component extends Process<Entity> {

    protected constructor(entity: Entity) {
        super(entity);
        
    }

}
