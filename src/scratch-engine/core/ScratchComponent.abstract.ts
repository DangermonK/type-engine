import { ScratchEntity } from "./ScratchEntity.abstract";
import { Process } from "../../core/container/Process.abstract";


export abstract class ScratchComponent extends Process<ScratchEntity> {

    protected constructor(entity: ScratchEntity) {
        super(entity);
    }

}
