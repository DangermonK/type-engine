import { ColliderComponent } from "../components/ColliderComponent";


export class HashedGrid {

    private readonly _hashedGrid: Map<string, Array<string>>;

    private readonly _cellSize: number;

    constructor(cellSize: number) {

        this._cellSize = cellSize;

        this._hashedGrid = new Map<string, Array<string>>();

    }

    clear(): void {
        this._hashedGrid.clear();
    }

    private pushHash(hash: string, id: string): void {
        if(!this._hashedGrid.has(hash))
            this._hashedGrid.set(hash, new Array<string>());

        this._hashedGrid.get(hash)?.push(id);
    }

    private getCorners(collider: ColliderComponent): any {
        return {
            xMin: Math.floor(collider.bounds.x / this._cellSize),
            yMin: Math.floor(collider.bounds.y / this._cellSize),
            xMax: Math.floor((collider.bounds.x + collider.bounds.w) / this._cellSize),
            yMax: Math.floor((collider.bounds.y + collider.bounds.h) / this._cellSize)
        }
    }

    private buildHash(x: number, y: number): string {
      return x + ":" + y;
    }

    pushElement(collider: ColliderComponent): void {
        collider.clearHashCoords();
        const corners = this.getCorners(collider);

        for(let i = corners.yMin; i <= corners.yMax; i++) {
            for (let j = corners.xMin; j <= corners.xMax; j++) {
                const hash = this.buildHash(j, i);
                collider.addHashCoords(hash);
                this.pushHash(hash, collider.container.id);
            }
        }
    }

    getElementsFromHashes(hashes: Array<string>): Array<string> {
        let arr: Array<string> = new Array<string>();
        for (const hash of hashes) {
            arr = arr.concat(this._hashedGrid.get(hash) || []);
        }

        return [...new Set(arr)];
    }

    getElementsFromAt(x: number, y: number): Array<string> {
        const hash = this.buildHash(x, y);

        return this._hashedGrid.get(hash) || [];
    }

    getElementsFromBounds(collider: ColliderComponent): Array<string> {
        const corners = this.getCorners(collider);

        let arr: Array<string> = new Array<string>();
        for(let i = corners.yMin; i <= corners.yMax; i++) {
            for (let j = corners.xMin; j <= corners.xMax; j++) {
                const hash = this.buildHash(j, i);
                arr = arr.concat(this._hashedGrid.get(hash) || []);
            }
        }
        return [...new Set(arr)];
    }

}
