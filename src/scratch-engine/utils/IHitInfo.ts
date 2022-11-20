import { Vector2 } from "./Vector2";

export interface ICollisionInfo {

    isCollision: boolean,
    hitInfo?: IHitInfo

}

export interface IHitInfo {

    x: number,
    y: number,
    normal: Vector2

}
