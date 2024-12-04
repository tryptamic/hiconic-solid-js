import * as tM from "@dev.hiconic/gm_test-model";
import * as rM from "@dev.hiconic/gm_root-model";
import {session} from "@dev.hiconic/tf.js_hc-js-api";
import * as eS from "./hc/entity-signals";
import { createSignal, onCleanup, JSX } from "solid-js";
import { createEffect } from "solid-js";

const mSession = new session.BasicManagedGmSession();




const person = mSession.createEntity(tM.Person).globalWithRandomUuid();

person.firstName = "John";
person.lastName = "Doe";

interface InputFieldProps<E extends rM.GenericEntity, V> {
  signal: eS.EntityPropertySignal<E, V>,
  type?: V extends string
    ? "text" | "password" | "email" // For string inputs
    : V extends number
    ? "number" // For number inputs
    : V extends Date
    ? "date" // For date inputs
    : never; // Narrowed down to only acceptable types based on `V`
}

function InputElement<E extends rM.GenericEntity, V>(props: InputFieldProps<E, V>) {
  let inputRef: HTMLInputElement | undefined;
  const component = <input ref={inputRef}/>;

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
  

const PageTwo = () => {
  const scope = new eS.ReactivityScope(mSession);

  onCleanup(() => scope.close());

  const firstName1 = scope.signal(person).property("firstName");
  const lastName1 = scope.signal(person).property("lastName");

  const firstName2 = scope.signal(person).property("firstName");
  const lastName2 = scope.signal(person).property("lastName");

  return(
    <div>
      <h1>Page Two</h1>
      <p>This is the second page.</p>

      <label>First Name</label>
      <InputElement signal={firstName1} />
      <label>Last Name</label>
      <InputElement signal={lastName1} />
      <label>First Name (second)</label>
      <InputElement signal={firstName2} />
      <label>Last Name (second)</label>
      <InputElement signal={lastName2} />
    </div>
  );
}
  
  export default PageTwo;
  