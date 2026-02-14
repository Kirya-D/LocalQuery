import assert from "node:assert/strict"
import { suite, test } from "node:test"
import { Session } from "../../src/model/session.js"

suite("constructor", () => {
    test("throws when empty title", () => {
        assert.throws(() => { new Session("", "") })
    })

    test("title", () => {
        const title = "Session Title"
        const newSession = new Session(title, "model")

        const expected = title
        const actual = newSession.title

        assert.strictEqual(actual, expected)
    })

    test("model", () => {
        const model = "Session Model"
        const newSession = new Session("filler title", model)

        const expected = model
        const actual = newSession.model

        assert.strictEqual(actual, expected)
    })
})