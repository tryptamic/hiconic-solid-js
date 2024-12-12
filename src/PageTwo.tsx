import * as tM from "@dev.hiconic/gm_test-model";
import {session} from "@dev.hiconic/tf.js_hc-js-api";
import * as eS from "./hc/entity-signals";
import { createSignal, onCleanup, JSX } from "solid-js";
import { createEffect } from "solid-js";
import { InputElement } from "./hc/ux-components"
import "./PageTwo.css"
import * as me from "./hc/managed-entities"

const entities = me.openEntities("test");

// const mSession = new session.BasicManagedGmSession();
const mSession = entities.session;

const person = entities.create(tM.Person);

person.firstName = "John";
person.lastName = "Doe";

const PageTwo = () => {
  const scope = new eS.ReactivityScope(mSession);

  onCleanup(() => scope.close());

  const firstName1 = scope.signal(person).property("firstName");
  const lastName1 = scope.signal(person).property("lastName");

  const firstName2 = scope.signal(person).property("firstName");
  const lastName2 = scope.signal(person).property("lastName");
  
  const age = scope.signal(person).property("age");

  return(
    <div>
      <h1>Page Two</h1>
      <p>This is the second page.</p>

      <h1>Occurence 1</h1>
      
      <input value={firstName1.getter()} onchange={e => {firstName1.setter(e.target.value)}}/>

      <button onclick={e => {entities.commit()}}>sign and save</button>

      <div class="form-grid">
        <label for="name1">First Name</label>
        <InputElement id="name1" signal={firstName1} />

        <label for="value1">Last Name</label>
        <InputElement id="value1" signal={lastName1} />
        
        <label for="name2">First Name</label>
        <InputElement id="name2" signal={firstName2} />

        <label for="value2">Last Name</label>
        <InputElement id="value2" signal={lastName2} />

      </div>
    </div>
  );
}
  
export default PageTwo;
  