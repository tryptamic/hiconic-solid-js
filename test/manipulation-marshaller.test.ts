//import "../src/symbol-test"
import { describe, it, expect } from "vitest";
import { Resource } from "@dev.hiconic/gm_resource-model"
import * as mm from "@dev.hiconic/gm_manipulation-model"
import { reflection as refl, T } from "@dev.hiconic/tf.js_hc-js-api";
import * as me from "../src/hc/managed-entities";
import { ManipulationMarshaller } from "../src/hc/manipulation-marshaler";

describe("sum function", () => {
  it("creates, writes, reads an entity", () => {

    const m = new T.Map(refl.BOOLEAN, refl.INTEGER);

    const am = mm.AddManipulation.create();
    const items = am.itemsToAdd;
    items.set(5,5);

    const items2 = am.itemsToAdd;

    m.set(false, 0);
    m.set(true, 1);

    // console.log([...m]);

    for (const e of m) {
      console.log(e);
    }

    const r = Resource.create();
    r.name = "John";
    const v = r.name;
    expect(v).toBe("John");
  });
});

describe("managed entities", () => {
  it("manages an entity", async () => {

    const entities = me.openEntities("test");

    const resource = entities.create(Resource, { globalId: "abc"});
    resource.name = "test";
    resource.tags.add("tag1");

    const manipulations = entities.manipulationBuffer.getCommitManipulations();
    const addMan = manipulations[2] as mm.AddManipulation;

    const marshaler = new ManipulationMarshaller();
    const json = await marshaler.marshalToString(manipulations);

    console.log(json);
  
  });
});