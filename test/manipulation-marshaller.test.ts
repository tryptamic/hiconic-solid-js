//import "../src/symbol-test"
import { describe, it, expect } from "vitest";
import { Resource } from "@dev.hiconic/gm_resource-model"
import { reflection as refl, T } from "@dev.hiconic/tf.js_hc-js-api";


function sum(a: number, b: number) {
  return a + b;
}

describe("sum function", () => {
  it("creates, writes, reads an entity", () => {

    const m = new T.Map(refl.BOOLEAN, refl.INTEGER);

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