import assert from "node:assert/strict"
import { suite, test } from "node:test"
import { MessageExchange } from "../../src/model/message-exchange"

const sessionName = "default session name"
let messageExchange = new MessageExchange("", "")

suite("constructor", () => {
    test("valid constructor", () => {
        const userQuery = "User's query"
        const modelResponse = "Model's response"
        messageExchange = new MessageExchange(userQuery, modelResponse)

        const actualQuery = messageExchange.query
        const expectedQuery = userQuery
        const actualResponse = messageExchange.response
        const expectedResponse = modelResponse

        assert.strictEqual(actualQuery, expectedQuery)
        assert.strictEqual(actualResponse, expectedResponse)
    })
})