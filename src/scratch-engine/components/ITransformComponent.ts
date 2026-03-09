

export interface ITransformComponent<Vector> {

    get position(): Vector;

    get rotation(): number;

    get scale(): Vector;

    set position(position: Vector);

    set rotation(value: number);

    set scale(scale: Vector);

    translate(x: number, y: number): void;

    rotate(angle: number): void;


}