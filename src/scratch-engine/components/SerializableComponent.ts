import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { DataSerializer } from "../scene-scripts/DataSerializer";
import { SERIALIZED_EVENT } from "../interfaces/ISerializedData";


export class SerializableComponent extends ScratchComponent {

	protected readonly _dataSerializer: DataSerializer;

	constructor(entity: ScratchEntity) {
		super(entity);

		this._dataSerializer = this.container.scene.getElement(DataSerializer);
	}

	toJSON(): any {
		return {
			id: this.container.id,
			x: this.container.transform.position.x,
			y: this.container.transform.position.y,
		}
	}

	dispose(): void {
		this._dataSerializer.removeSerializable(this);
		this._dataSerializer.pushEvent({
			type: SERIALIZED_EVENT.REMOVE,
			id: this.container.id
		});
	}

	initialize(): void {
		this._dataSerializer.addSerializable(this);
		this._dataSerializer.pushEvent({
			type: SERIALIZED_EVENT.INSTANTIATE,
			id: this.container.id,
			name: this.container.constructor.name,
			data: this.toJSON()
		});
	}
}
