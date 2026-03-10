

export interface ITransformComponent {

    get position(): { x: number, y: number };

    set position(position: { x: number, y: number });

    get rotation(): number;

    set rotation(rotation: number);

    get size(): { x: number, y: number };

    set size(size: { x: number, y: number });

    scale(scale: { x: number, y: number }): void;

    translate(x: number, y: number): void;

    rotate(angle: number): void;

}