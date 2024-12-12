import * as eS from "./entity-signals";
import { GenericEntity } from "@dev.hiconic/gm_root-model";
import { createEffect } from "solid-js";

export interface InputFieldProps<E extends GenericEntity, V> {
  id?: string,
  signal: eS.EntityPropertySignal<E, V>,
  type?: V extends string
  ? "text" | "password" | "email" // For string inputs
  : V extends number
  ? "number" // For number inputs
  : V extends Date
  ? "date" // For date inputs
  : never; // Narrowed down to only acceptable types based on `V`
}

export function InputElement<E extends GenericEntity, V>(props: InputFieldProps<E, V>) {
  let inputRef: HTMLInputElement | undefined;
  const component = <input ref={inputRef} />;

  inputRef!.id = props.id!;

  const signal = props.signal;
  // Effect to sync the signal with `inputRef.valueAsDate`

  switch (props.signal.property.getType().getTypeCode().toString()) {
    case "dateType": {
      const castSig = signal as any as eS.EntityPropertySignal<E, Date>;
      inputRef!.type = "date";
      createEffect(() => {
        inputRef!.valueAsDate = castSig.getter();
      })
      inputRef!.onchange = (event) => {
        const v = inputRef!.valueAsDate;
        castSig.setter(v!);
      };
      break;
    }
    case "stringType": {
      const castSig = signal as any as eS.EntityPropertySignal<E, string>;
      inputRef!.type = "text";
      createEffect(() => {
        inputRef!.value = castSig.getter();
      })
      inputRef!.onchange = (event) => {
        const v = inputRef!.value;
        castSig.setter(v!);
      };
      break;
    }
    case "integerType": {
      const castSig = signal as any as eS.EntityPropertySignal<E, number>;
      inputRef!.type = "number";
      createEffect(() => {
        inputRef!.valueAsNumber = castSig.getter();
      })
      inputRef!.onchange = (event) => {
        const v = inputRef!.valueAsNumber;
        castSig.setter(v!);
      };
      break;
    }
  }

  return component;
}
