import { ICollisionInfo, IHitInfo } from "./IHitInfo";

export class CollisionLogic {

    private static dotProduct(x1: number, y1: number, x2: number, y2: number): number {
        return x1 * x2 + y1 * y2;
    }

    private static getDistance(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static checkCircleCircleCollision(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): ICollisionInfo {
        const distance = this.getDistance(x1, y1, x2, y2);
        return { isCollision: (distance < (r1 + r2)) };
    }

    static checkCircleLineCollision(x1: number, y1: number, r: number, x2: number, y2: number, x3: number, y3: number): ICollisionInfo {
        if (this.checkCircleCircleCollision(x1, y1, r, x2, y2, 0).isCollision ||
            this.checkCircleCircleCollision(x1, y1, r, x3, y3, 0).isCollision) {
            return { isCollision: true };
        }

        const lineLength = this.getDistance(x2, y2, x3, y3);
        const cx = x1 - x2;
        const cy = y1 - y2;

        const dx = x3 - x2;
        const dy = y3 - y2;
        const dot = this.dotProduct(dx, dy, cx, cy) / (lineLength * lineLength);

        const px = x2 + dx * dot;
        const py = y2 + dy * dot;

        return {
            isCollision: (dot > 0 && dot < 1 && this.getDistance(px, py, x1, y1) < r),
        };
    }

    static checkBoxBoxCollision(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): ICollisionInfo {
        return {
            isCollision: x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2,
        };
    }

    static checkBoxCircleCollision(x1: number, y1: number, w: number, h: number, x2: number, y2: number, r: number): ICollisionInfo {
        let xTest = x2;
        let yTest = y2;

        if (x2 < x1) {xTest = x1; }
        else if (x2 > x1 + w) {xTest = x1 + w; }

        if (y2 < y1) {yTest = y1; }
        else if (y2 > y1 + h) {yTest = y1 + h; }

        const distance = this.getDistance(x2, y2, xTest, yTest);

        return {
            isCollision: distance < r,
            hitInfo: {
                x: xTest,
                y: yTest,
            },
        };
    }

    static checkLineLineCollision(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): ICollisionInfo {
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        return {
            isCollision: uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1,
            hitInfo: {
                x: x1 + (uA * (x2 - x1)),
                y: y1 + (uA * (y2 - y1)),
            },
        };
    }

    static checkBoxLineCollision(x1: number, y1: number, w: number, h: number, x2: number, y2: number, x3: number, y3: number): ICollisionInfo {
        const top = this.checkLineLineCollision(x1, y1, x1 + w, y1, x2, y2, x3, y3);
        const left = this.checkLineLineCollision(x1, y1, x1, y1 + h, x2, y2, x3, y3);
        const right = this.checkLineLineCollision(x1 + w, y1, x1 + w, y1 + h, x2, y2, x3, y3);
        const bottom = this.checkLineLineCollision(x1, y1 + h, x1 + w, y1 + h, x2, y2, x3, y3);

        return top.isCollision ? top : right.isCollision ? right : bottom.isCollision ? bottom : left.isCollision ? left : { isCollision: false };
    }

}
