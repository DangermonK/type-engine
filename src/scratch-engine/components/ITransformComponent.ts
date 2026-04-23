export interface IVector2Like {
    x: number;
    y: number;
}

export interface ITransformComponent {
    get position(): IVector2Like;
    set position(position: IVector2Like);

    get rotation(): number;
    set rotation(rotation: number);

    get size(): IVector2Like;
    set size(size: IVector2Like);

    scale(scale: IVector2Like): void;
    translate(x: number, y: number): void;
    rotate(angle: number): void;
}