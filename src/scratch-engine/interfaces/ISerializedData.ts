import { SerializableComponent } from "../components/SerializableComponent";

export enum SERIALIZED_EVENT {

	INSTANTIATE,
	REMOVE,
	CHANGE

}

export interface ISerializedEvent {

	type: SERIALIZED_EVENT

}

export interface IInstantiateEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.INSTANTIATE,
	id: string,
	name: string,
	data: SerializableComponent

}

export interface IRemoveEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.REMOVE,
	id: string

}

export interface IChangeEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.CHANGE,
	id: string,
	data: SerializableComponent

}

export type eventType = IInstantiateEvent | IRemoveEvent | IChangeEvent;


export interface ISerializedData {
	data: Array<SerializableComponent>,
	events: Array<eventType>
}
