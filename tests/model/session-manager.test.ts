import assert from "node:assert/strict"
import { beforeEach, suite, test } from "node:test"
import { SessionManager } from "../../src/model/session-manager.js"

const sessionName = "default session name"
let sessionManager = new SessionManager()

suite("getSessionTitle", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test(() => {
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(newSession)

        const actual = sessionManager.getSessionTitle()
        const expected = newSession

        assert.strictEqual(actual, expected)
    })
})

suite("setSessionTitle", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("current session undefined", () => {
        const actual = sessionManager.setSessionTitle("title does not matter here")
        const expected = undefined

        assert.strictEqual(actual, expected)
    })

    test("throws when session title already in-use", () => {
        const sessionOneName = sessionManager.createNewSession(sessionName)
        const sessionTwoName = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(sessionTwoName)

        assert.throws(() => { const actual = sessionManager.setSessionTitle(sessionOneName) })
    })

    test("successful title change", () => {
        const definedTitle = "New Title"
        const sessionOneName = sessionManager.createNewSession(sessionName)
        const sessionTwoName = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(sessionTwoName)
        sessionManager.setSessionTitle(definedTitle)

        const actual = sessionManager.getSessionTitle()
        const expected = definedTitle

        assert.strictEqual(actual, expected)
    })
})

suite("SessionModel", () => {
    beforeEach(() => sessionManager = new SessionManager())
    
    test("getter", () => {
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(newSession)

        const actual = sessionManager.getSessionModel()
        const expected = ""

        assert.strictEqual(actual, expected)
    })

    test("setter", () => {
        const newModel = "Fresh Model"
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.selectNewSession(newSession)
        sessionManager.setSessionModel(newModel)

        const actual = sessionManager.getSessionModel()
        const expected = newModel

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