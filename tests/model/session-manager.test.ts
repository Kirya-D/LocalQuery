import assert from "node:assert/strict"
import { beforeEach, suite, test } from "node:test"
import { SessionManager } from "../../src/model/session-manager.js"

const sessionName = "default session name"
let sessionManager = new SessionManager()

suite("sessionTitle", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test(() => {
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(newSession)

        const actual = sessionManager.sessionTitle()
        const expected = newSession

        assert.strictEqual(actual, expected)
    })
})

suite("sessionModel", () => {
    beforeEach(() => sessionManager = new SessionManager())
    
    test(() => {
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(newSession)

        const actual = sessionManager.sessionModel()
        const expected = ""

        assert.strictEqual(actual, expected)
    })
})

suite("createNewSession", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("zero existing sessions", () => {
        const expected = `${sessionName} 1`
        const actual = sessionManager.createNewSession(sessionName)

        assert.strictEqual(actual, expected)
    })

    test("one existing session", () => {
        sessionManager.createNewSession(sessionName)

        const expected = `${sessionName} 2`
        const actual = sessionManager.createNewSession(sessionName)

        assert.strictEqual(actual, expected)
    })

    test("more than one existing sessions", () => {
        sessionManager.createNewSession(sessionName)
        sessionManager.createNewSession(sessionName)

        const expected = `${sessionName} 3`
        const actual = sessionManager.createNewSession(sessionName)

        assert.strictEqual(actual, expected)
    })

})

suite("selectNewSession", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("no session with name", () => {
        const actual = sessionManager.selectNewSession("nonexistant-name")
        const expected = false

        assert.strictEqual(actual, expected)
    })

    test("session with name exists", () => {
        const newSessionName = sessionManager.createNewSession(sessionName)
        const actual = sessionManager.selectNewSession(newSessionName)
        const expected = true

        assert.strictEqual(actual, expected)
    })
})

suite("changeSessionTitle", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("current session undefined", () => {
        const actual = sessionManager.changeSessionTitle("title does not matter here")
        const expected = undefined

        assert.strictEqual(actual, expected)
    })

    test("throws when session title already in-use", () => {
        const sessionOneName = sessionManager.createNewSession(sessionName)
        const sessionTwoName = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(sessionTwoName)

        assert.throws(() => { const actual = sessionManager.changeSessionTitle(sessionOneName) })
    })

    test("successful title change", () => {
        const definedTitle = "New Title"
        const sessionOneName = sessionManager.createNewSession(sessionName)
        const sessionTwoName = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(sessionTwoName)
        sessionManager.changeSessionTitle(definedTitle)

        const actual = sessionManager.sessionTitle()
        const expected = definedTitle

        assert.strictEqual(actual, expected)
    })
})