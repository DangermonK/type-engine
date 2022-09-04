import {Layer} from "../enums/Layer.enum";

export interface IScratchSceneSettings {

    hashGridCellSize: number;

    collisionRules: Map<Layer, Layer[]>;

}
