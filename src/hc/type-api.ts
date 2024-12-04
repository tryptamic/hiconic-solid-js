import { eval_, service, session, modelpath, remote, reason, reflection, util, manipulation, T, hc } from "@dev.hiconic/tf.js_hc-js-api";
import { GenericEntity } from "@dev.hiconic/gm_root-model";
import * as types from "@dev.hiconic/hc-js-base"


export interface TypeInfo<V, T extends reflection.GenericModelType> {
    type: T;
}

export const INTEGER: TypeInfo<number, reflection.IntegerType> = {
    type: reflection.INTEGER
}

export const BOOLEAN: TypeInfo<boolean, reflection.BooleanType> = {
    type: reflection.BOOLEAN
}

export const STRING: TypeInfo<string, reflection.StringType> = {
    type: reflection.STRING
}

export const DECIMAL: TypeInfo<T.Decimal, reflection.DecimalType> = {
    type: reflection.DECIMAL
}

export const DOUBLE: TypeInfo<T.Double, reflection.DoubleType> = {
    type: reflection.DOUBLE
}

export const FLOAT: TypeInfo<T.Float, reflection.FloatType> = {
    type: reflection.FLOAT
}

export const DATE: TypeInfo<Date, reflection.DateType> = {  
    type: reflection.DATE
}

export const OBJECT: TypeInfo<any, reflection.BaseType> = {
    type: reflection.OBJECT
}

export function ENTITY<E extends GenericEntity, T extends reflection.EntityType<E>>(type: T): TypeInfo<E, T> {
    return {
        type: type
    }
}

export function ENUM<E extends hc.Enum<E>, T extends reflection.EnumType<E>>(type: T): TypeInfo<E, T> {
    return {
        type: type
    }
}

interface Creator<V> {
    create(): V;
}

export function LIST<E>(type:TypeInfo<E,any>): TypeInfo<T.Array<E>, reflection.ListType> & Creator<T.Array<E>> {
    const listType = reflection.typeReflection().getListType(type.type);
    return {
        type: listType,
        create: function() {
            return new T.Array<E>();
        }
    }
}

export function SET<E>(type:TypeInfo<E,any>): TypeInfo<T.Set<E>, reflection.SetType> & Creator<T.Set<E>> {
    const setType = reflection.typeReflection().getSetType(type.type);
    return {
        type: setType,
        create: function() {
            return new T.Set<E>();
        }
    }
}

export function MAP<K,V>(keyType: TypeInfo<K,any>, valueType: TypeInfo<V,any>): TypeInfo<T.Map<K,V>, reflection.MapType> & Creator<T.Map<K,V>> {
    const mapType = reflection.typeReflection().getMapType(keyType.type, valueType.type);
    return {
        type: mapType,
        create: function() {
            return new T.Map<K, V>();
        }

    }
}

declare module "@dev.hiconic/hc-js-base" {
    namespace hc.reflection {
        interface BooleanType { S: "boolean"; }
        interface StringType { S: "string"; }
        interface IntegerType { S: "integer"; }
        interface LongType { S: "long"; }
        interface FloatType { S: "float"; }
        interface DoubleType { S: "double"; }
        interface DecimalType { S: "decimal"; }
        interface DateType { S: "date"; }
    }
}

// Define the type-to-type association
type VT<T extends reflection.GenericModelType> =
    T extends reflection.EntityType<infer E> ? E :
    T extends reflection.EnumType<infer E> ? E :
    T extends reflection.BooleanType ? boolean:
    T extends reflection.StringType ? string:
    T extends reflection.IntegerType ? types.integer:
    T extends reflection.LongType ? types.long:
    T extends reflection.FloatType ? types.float:
    T extends reflection.DoubleType ? types.double:
    T extends reflection.DecimalType ? types.decimal:
    T extends reflection.DateType ? types.date:
    T extends reflection.BaseType ? any:
    never;

function createMap<
    K extends reflection.GenericModelType = reflection.BaseType, 
    V extends reflection.GenericModelType = reflection.BaseType
    >
(k?: K, v?: V): T.Map<VT<K>, VT<V>> {
    return new T.Map<VT<K>, VT<V>>();
}

const mO = createMap(reflection.STRING);
mO.size;
    

const m = createMap(reflection.STRING, reflection.INTEGER);

const m1 = createMap(reflection.BOOLEAN, reflection.DECIMAL);

const t: reflection.GenericModelType = reflection.OBJECT;


m.set("1", 1);

new T.Double(5);

