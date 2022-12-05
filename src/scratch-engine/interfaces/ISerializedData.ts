import { SerializableComponent } from "../components/SerializableComponent";
import { ScratchEntity } from "../core/ScratchEntity.abstract";

export enum SERIALIZED_EVENT {

	INSTANTIATE,
	REMOVE,
	CHANGE

}

export interface IScratchEntity {

	id: string

}

export interface ISerializedEvent {

	type: SERIALIZED_EVENT

}

export interface IInstantiateEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.INSTANTIATE,
	id: string,
	name: string,
	data: IScratchEntity

}

export interface IRemoveEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.REMOVE,
	id: string

}

export interface IChangeEvent extends ISerializedEvent {

	type: SERIALIZED_EVENT.CHANGE,
	id: string,
	data: IScratchEntity

}

export type eventType = IInstantiateEvent | IRemoveEvent | IChangeEvent;


export interface ISerializedData {
	data: Array<SerializableComponent>,
	events: Array<eventType>
}
