import { ScratchSceneScript } from "../core/ScratchSceneScript.abstract";
import { ScratchScene } from "../core/ScratchScene.abstract";
import { ISerializedData } from "../interfaces/ISerializedData";
import { DeserializableComponent } from "../components/DeserializableComponent";
import { SerializableComponent } from "../components/SerializableComponent";


export class DataSerializer extends ScratchSceneScript {

	private readonly _serializables: Map<string, SerializableComponent>;
	private readonly _deserializables: Map<string, DeserializableComponent>;

	private readonly _serializedData: ISerializedData;

	constructor(scene: ScratchScene) {
		super(scene);

		this._serializedData = {  entities: [], removals: [], instantiations: [] };

		this._serializables = new Map<string, SerializableComponent>();
		this._deserializables = new Map<string, DeserializableComponent>();
	}

	addDeserializable(deserializable: DeserializableComponent): void {
		this._deserializables.set(deserializable.container.id, deserializable);
	}

	removeDeserializable(deserializable: DeserializableComponent): void {
		this._deserializables.delete(deserializable.container.id);
	}

	addSerializable(serializable: SerializableComponent): void {
		// add event for instantiation
		this._serializables.set(serializable.container.id, serializable);
	}

	removeSerializable(serializable: SerializableComponent): void {
		// add event for removal
		this._serializables.delete(serializable.container.id);
	}

	serialize(): any {
		return {}
	}

	deserialize(data: ISerializedData): void {
		for(const entity of data.instantiations) {

		}
		for(const deserializable of data.entities) {
			this._deserializables.get(deserializable.id)!.receiveData(deserializable);
		}
		for(const entity of data.removals) {

		}
	}

	dispose(): void {
	}

	initialize(): void {
	}

}
