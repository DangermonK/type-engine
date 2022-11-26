import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { ColliderComponent } from "./ColliderComponent";
import { CircleCollider } from "../utils/collider/CircleCollider";
import { LineCollider } from "../utils/collider/LineCollider";
import { TransformComponent } from "./TransformComponent";
import { RenderComponent } from "./RenderComponent";


export class DebugRenderComponent extends ScratchComponent {

  private readonly _debugScripts: Array<(ctx: CanvasRenderingContext2D) => void>;
  private readonly _debugSettings: Set<string>;

  constructor(entity: ScratchEntity, settings: Array<typeof ScratchComponent> = [TransformComponent]) {
    super(entity);

    this._debugSettings = new Set<string>(settings.map(element => element.name));
    this._debugScripts = new Array<() => void>();

    this.container.requireType(RenderComponent);
  }

  dispose(): void {

  }

  initialize(): void {
    for (const script of this.container.scripts) {
        if(!this._debugSettings.has(script.constructor.name))
          continue;

        switch (script.constructor.name) {
          case ColliderComponent.name:
            const component = script as ColliderComponent;
            this._debugScripts.push((ctx) => {
              ctx.strokeStyle = '#0f0';
              ctx.beginPath();
              ctx.rect(component.bounds.x, component.bounds.y, component.bounds.w, component.bounds.h);
              ctx.stroke();
              ctx.closePath();
            });
            switch (component.collider.constructor.name) {
              case CircleCollider.name:
                const circle = component.collider as CircleCollider;
                this._debugScripts.push((ctx) => {
                  ctx.strokeStyle = '#f00';
                  ctx.beginPath();
                  ctx.arc(component.position.x, component.position.y, circle.radius, 0, 2 * Math.PI);
                  ctx.stroke();
                  ctx.closePath();
                });
                break;
              case LineCollider.name:
                const line = component.collider as LineCollider;
                this._debugScripts.push((ctx) => {
                  ctx.strokeStyle = '#f00';
                  ctx.beginPath();
                  ctx.moveTo(component.position.x, component.position.y);
                  ctx.lineTo(component.position.x + line.vector.x, component.position.y + line.vector.y);
                  ctx.stroke();
                  ctx.closePath();
                });
                break;
            }
            break;
          case TransformComponent.name:
            this._debugScripts.push((ctx) => {
              ctx.strokeStyle = '#00f';
              ctx.fillStyle = '#fff';
              ctx.fillText(this.container.constructor.name, this.container.transform.position.x, this.container.transform.position.y);
              ctx.beginPath();
              ctx.moveTo(this.container.transform.position.x - 5, this.container.transform.position.y);
              ctx.lineTo(this.container.transform.position.x + 5, this.container.transform.position.y);
              ctx.moveTo(this.container.transform.position.x, this.container.transform.position.y - 5);
              ctx.lineTo(this.container.transform.position.x, this.container.transform.position.y + 5);
              ctx.stroke();
              ctx.closePath();
            });
            break;
        }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const script of this._debugScripts) {
      script(ctx);
    }
  }

}
