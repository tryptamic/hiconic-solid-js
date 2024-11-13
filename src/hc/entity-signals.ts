import * as mM from "@dev.hiconic/gm_manipulation-model";
import * as rM from "@dev.hiconic/gm_root-model";
import { Accessor, createEffect, createSignal, Setter, Signal } from "solid-js";
import { manipulation, reflection, session } from "./hiconic-api";

type NonFunctionKeys<T> = Exclude<{
  [K in keyof T]: K extends string? (T[K] extends Function ? never : K) : never;
}[keyof T], never>;


export interface EntityPropertySignal<E extends rM.GenericEntity, V> {
  getter: Accessor<V>;
  setter: Setter<V>;
  entity: E;
  property: reflection.Property;
}

interface EntitySignalBuilder<E extends rM.GenericEntity> {
  property<K extends NonFunctionKeys<E>>(property: reflection.Property | K): EntityPropertySignal<E, E[K]>;
}

export class ReactivityScope {
  private session: session.ManagedGmSession;
  private signals = Array<() => void>();
  
  constructor(session: session.ManagedGmSession) {
    this.session = session;
  }

  close() {
    this.signals.forEach(s => s());
  } 

  signal<E extends rM.GenericEntity>(entity: E): EntitySignalBuilder<E> {
    return {
      property: <K extends NonFunctionKeys<E>>(property: reflection.Property | K) => this.newPropertySignal(entity, property)
    };
  } 

  newPropertySignal<E extends rM.GenericEntity, V>(entity: E, property: reflection.Property | string): EntityPropertySignal<E, V> {
    const refProp = typeof property == "string" ? 
      entity.EntityType().getProperty(property as string) : 
      property as reflection.Property;
      
    const signal = createSignal<V>(refProp.get(entity));
    const [value, setValue] = signal;

    let blockReactivity = true;

    try {
      createEffect(() => {
        const v = value();
        if (blockReactivity) return;
        refProp.set(entity, v);
      });
    } finally {
      blockReactivity = false;
    }

    const listener: manipulation.ManipulationListener = {
      onMan: m => {
        const cvm = m as mM.ChangeValueManipulation;
        const v: Exclude<V, Function> = cvm.newValue;
        blockReactivity = true;
        try {
          setValue(v);
        } finally {
          blockReactivity = false;
        }
      }
    };

    const listeners = this.session.listeners().entityProperty(entity, refProp.getName());
    listeners.add(listener);

    this.signals.push(() => {
      listeners.remove(listener);
    });

    return {
      getter: value,
      setter: setValue,
      entity: entity,
      property: refProp,
    };
  }
}

