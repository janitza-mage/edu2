import {__testables} from "./state";

test("get set score tree", () => {
    expect(__testables.getScoreTree()).toStrictEqual({});
    __testables.setScoreTree(null as any);
    expect(__testables.getScoreTree()).toStrictEqual({});
    __testables.setScoreTree({});
    expect(__testables.getScoreTree()).toStrictEqual({});
    __testables.setScoreTree({foo: 123});
    expect(__testables.getScoreTree()).toStrictEqual({foo: 123});
    __testables.setScoreTree({bar: {baz: 456}});
    expect(__testables.getScoreTree()).toStrictEqual({bar: {baz: 456}});
});

test("getScoreSubNodeBySubPath", () => {
    const scoreTree = {
        foo: 123,
        bar: {
            baz: 456
        },
    };
    __testables.setScoreTree(scoreTree);
    expect(__testables.getScoreNodeByPath([])).toStrictEqual(scoreTree);
    expect(__testables.getScoreNodeByPath(["x"])).toBeNull();
    expect(__testables.getScoreNodeByPath(["foo"])).toStrictEqual(123);
    expect(__testables.getScoreNodeByPath(["foo", "x"])).toBeNull();
    expect(__testables.getScoreNodeByPath(["bar"])).toStrictEqual({baz: 456});
    expect(__testables.getScoreNodeByPath(["bar", "x"])).toBeNull();
    expect(__testables.getScoreNodeByPath(["bar", "baz"])).toStrictEqual(456);
    expect(__testables.getScoreNodeByPath(["bar", "baz", "x"])).toBeNull();
});

test("getInitializedSubtree", () => {
    expect(__testables.getInitializedSubtree([], 123)).toStrictEqual(123);
    expect(__testables.getInitializedSubtree(["x"], 123)).toStrictEqual({x: 123});
    expect(__testables.getInitializedSubtree(["x", "y"], 123)).toStrictEqual({x: {y: 123}});
});

test("withScoreUpdated", () => {
    expect(__testables.withScoreUpdated(null, [], 123)).toStrictEqual(123);
    expect(__testables.withScoreUpdated(456, [], 123)).toStrictEqual(456);
    expect(__testables.withScoreUpdated(456, [], 789)).toStrictEqual(789);
    expect(__testables.withScoreUpdated({}, [], 123)).toStrictEqual(123);
    expect(__testables.withScoreUpdated({x: 456}, [], 123)).toStrictEqual(123);
    expect(__testables.withScoreUpdated({x: 456}, [], 789)).toStrictEqual(789);

    expect(__testables.withScoreUpdated(null, ["y"], 123)).toStrictEqual({y: 123});
    expect(__testables.withScoreUpdated(456, ["y"], 123)).toStrictEqual({y: 123});
    expect(__testables.withScoreUpdated(456, ["y"], 789)).toStrictEqual({y: 789});
    expect(__testables.withScoreUpdated({}, ["y"], 123)).toStrictEqual({y: 123});
    expect(__testables.withScoreUpdated({x: 456}, ["y"], 123)).toStrictEqual({x: 456, y: 123});
    expect(__testables.withScoreUpdated({x: 456}, ["y"], 789)).toStrictEqual({x: 456, y: 789});
    expect(__testables.withScoreUpdated({y: 456}, ["y"], 123)).toStrictEqual({y: 456});
    expect(__testables.withScoreUpdated({y: 456}, ["y"], 789)).toStrictEqual({y: 789});

    expect(__testables.withScoreUpdated(null, ["y", "z"], 123)).toStrictEqual({y: {z: 123}});
    expect(__testables.withScoreUpdated(456, ["y", "z"], 123)).toStrictEqual({y: {z: 123}});
    expect(__testables.withScoreUpdated(456, ["y", "z"], 789)).toStrictEqual({y: {z: 789}});
    expect(__testables.withScoreUpdated({}, ["y", "z"], 123)).toStrictEqual({y: {z: 123}});
    expect(__testables.withScoreUpdated({x: 456}, ["y", "z"], 123)).toStrictEqual({x: 456, y: {z: 123}});
    expect(__testables.withScoreUpdated({x: 456}, ["y", "z"], 789)).toStrictEqual({x: 456, y: {z: 789}});
    expect(__testables.withScoreUpdated({x: 456}, ["y", "x"], 123)).toStrictEqual({x: 456, y: {x: 123}});
    expect(__testables.withScoreUpdated({x: 456}, ["y", "x"], 789)).toStrictEqual({x: 456, y: {x: 789}});
    expect(__testables.withScoreUpdated({y: 456}, ["y", "x"], 123)).toStrictEqual({y: {x: 123}});
    expect(__testables.withScoreUpdated({y: 456}, ["y", "x"], 789)).toStrictEqual({y: {x: 789}});

    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, [], 123)).toStrictEqual(123);
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, [], 789)).toStrictEqual(789);
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["a"], 123)).toStrictEqual({a: 333, b: {c: 555, d: 777}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["a"], 789)).toStrictEqual({a: 789, b: {c: 555, d: 777}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["a", "x"], 123)).toStrictEqual({a: {x: 123}, b: {c: 555, d: 777}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["a", "x"], 789)).toStrictEqual({a: {x: 789}, b: {c: 555, d: 777}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b"], 123)).toStrictEqual({a: 333, b: 123});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b"], 789)).toStrictEqual({a: 333, b: 789});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b", "x"], 123)).toStrictEqual({a: 333, b: {c: 555, d: 777, x: 123}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b", "x"], 789)).toStrictEqual({a: 333, b: {c: 555, d: 777, x: 789}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b", "c"], 123)).toStrictEqual({a: 333, b: {c: 555, d: 777}});
    expect(__testables.withScoreUpdated({a: 333, b: {c: 555, d: 777}}, ["b", "c"], 789)).toStrictEqual({a: 333, b: {c: 789, d: 777}});
});
