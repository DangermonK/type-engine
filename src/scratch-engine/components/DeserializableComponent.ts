import { ScratchComponent } from "../core/ScratchComponent.abstract";
import { ScratchEntity } from "../core/ScratchEntity.abstract";
import { DataSerializer } from "../scene-scripts/DataSerializer";


export abstract class DeserializableComponent extends ScratchComponent {

	private readonly _dataSerializer: DataSerializer;

	protected constructor(entity: ScratchEntity) {
		super(entity);

		this._dataSerializer = this.container.scene.requireType(DataSerializer);
	}

	abstract receiveData(data: any): void;

	dispose(): void {
		this._dataSerializer.removeDeserializable(this);
	}

	initialize(): void {
		this._dataSerializer.addDeserializable(this);
	}

}
