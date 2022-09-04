import {ColliderComponent} from "../components/ColliderComponent";
import { IHitInfo } from "../utils/IHitInfo";

export interface IActiveCollision {
    sourceCollider: ColliderComponent,
    collision: ICollision
}

export interface ICollision {
    collider: ColliderComponent,
    hitInfo?: IHitInfo
}
