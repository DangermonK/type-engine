import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { DataSerializer } from "../scene-scripts/DataSerializer";


export abstract class SerializableComponent extends ScratchComponent {

	private readonly _dataSerializer: DataSerializer;

	protected constructor(entity: ScratchEntity) {
		super(entity);

		this._dataSerializer = this.container.scene.requireType(DataSerializer);
	}

	abstract publishData(): any;

	dispose(): void {
		this._dataSerializer.removeSerializable(this);
	}

	initialize(): void {
		this._dataSerializer.addSerializable(this);
	}
}
