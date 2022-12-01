import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { eventType, ISerializedData } from "../interfaces/ISerializedData";
import { SerializableComponent } from "../components/SerializableComponent";


export class DataSerializer extends ScratchSceneScript {

	private readonly _serializables: Set<SerializableComponent>;
	private readonly _events: Set<eventType>;

	constructor(scene: ScratchScene) {
		super(scene);

		this._serializables = new Set<SerializableComponent>();
		this._events = new Set<eventType>();
	}

	addSerializable(serializable: SerializableComponent): void {
		this._serializables.add(serializable);
	}

	removeSerializable(serializable: SerializableComponent): void {
		this._serializables.delete(serializable);
	}

	pushEvent(event: eventType): void {
		this._events.add(event);
	}

	private serialize(): ISerializedData {
		return {
			data: [...this._serializables],
			events: [...this._events]
		};
	}

	get serializedData(): ISerializedData {
		const data: ISerializedData = this.serialize();
		this._events.clear();
		return data;
	}

	dispose(): void {
	}

	initialize(): void {
	}

}
