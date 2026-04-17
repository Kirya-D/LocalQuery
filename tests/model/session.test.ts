import assert from "node:assert/strict"
import { beforeEach, suite, test } from "node:test"
import { Session } from "../../src/model/session.js"

suite("constructor", () => {
    test("valid title", () => {
        const title = "Session Title"
        const model = "Session Model"
        const newSession = new Session(title, model)

        const expected = title
        const actual = newSession.title

        assert.strictEqual(actual, expected)
    })

    test("throws when empty title", () => {
        const title = ""
        const model = "Session Model"
        assert.throws(() => { new Session(title, model) })
    })

    test("throws when empty title with spaces", () => {
        const title = "   "
        const model = "Session Model"
        assert.throws(() => { new Session(title, model) })
    })

    test("valid model", () => {
        const model = "Session Model"
        const newSession = new Session("filler title", model)

        const expected = model
        const actual = newSession.model

        assert.strictEqual(actual, expected)
    })
})

let session = new Session("Title")
suite("addMessageExchange", () => {
    beforeEach(() => session = new Session("Title"))

    test("When empty message history", () => {
        const onlyRequest = "User Request"
        const onlyResponse = "Model Response"
        session.addMessageExchange(onlyRequest, onlyResponse)

        const expected = 1
        const actual = session.messageHistory.length

        assert.strictEqual(actual, expected)
    })
})