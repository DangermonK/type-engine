import { Layer } from "../enums/Layer.enum";


export interface IScratchEntityOptions {

    layer: Layer,

}

export const defaultScratchEntityOptions: IScratchEntityOptions = {
    layer: Layer.DEFAULT
}
