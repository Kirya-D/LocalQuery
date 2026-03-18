import assert from "node:assert/strict"
import { beforeEach, suite, test } from "node:test"
import { SessionManager } from "../../src/model/session-manager.js"

const sessionName = "default session name"
let sessionManager = new SessionManager()

suite("sessionTitle", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("current session undefined", () => {
        assert.throws(() => { sessionManager.setSessionTitle("title does not matter here") })
    })

    test("throws when session title is empty"), () => {
        const currentSession = sessionManager.createNewSession("wtv")
        sessionManager.switchToSession(currentSession)
        assert.throws(() => { sessionManager.setSessionTitle("") })
    }

    test("throws when session title already in-use", () => {
        const sessionOneName = sessionManager.createNewSession(sessionName)
        const sessionTwoName = sessionManager.createNewSession(sessionName)
        sessionManager.switchToSession(sessionTwoName)

        assert.throws(() => { const actual = sessionManager.setSessionTitle(sessionOneName) })
    })

    test("successful title change", () => {
        const definedTitle = "New Title"
        const sessionOneName = sessionManager.createNewSession(sessionName)
        sessionManager.switchToSession(sessionOneName)
        sessionManager.setSessionTitle(definedTitle)

        const actual = sessionManager.getSessionTitle()
        const expected = definedTitle

        assert.strictEqual(actual, expected)
    })
})

suite("sessionModel", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("getter works when session is not null", () => {
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.switchToSession(newSession)

        const actual = sessionManager.getSessionModel()
        const expected = "Select a model"

        assert.strictEqual(actual, expected)
    })

    test("getter throws when session is null", () => {
        assert.throws(() => { sessionManager.getSessionModel() })
    })

    test("setter works when session is not null", () => {
        const newModel = "Fresh Model"
        const newSession = sessionManager.createNewSession(sessionName)
        sessionManager.switchToSession(newSession)
        sessionManager.setSessionModel(newModel)

        const actual = sessionManager.getSessionModel()
        const expected = newModel

        assert.strictEqual(actual, expected)
    })

    test("setter throws when session is null", () => {
        assert.throws(() => { sessionManager.setSessionModel("title does not matter here") })
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

    test("when first indexed title matches existing title", () => {
        const indexedPlaceholder = "Placeholder"
        const initialSessionName = sessionManager.createNewSession(indexedPlaceholder)
        sessionManager.switchToSession(initialSessionName)
        sessionManager.setSessionTitle(`${indexedPlaceholder} 2`)
        const newSessionName = sessionManager.createNewSession(indexedPlaceholder)

        const expected = `${indexedPlaceholder} 3`
        const actual = newSessionName

        assert.strictEqual(actual, expected)
    })

    test("when first indexed title matches existing title", () => {
        const indexedPlaceholder = "Placeholder"
        const initialSessionName = sessionManager.createNewSession(indexedPlaceholder)
        sessionManager.switchToSession(initialSessionName)
        sessionManager.setSessionTitle(`${indexedPlaceholder} 2`)
        const newSessionName = sessionManager.createNewSession(indexedPlaceholder)

        const expected = `${indexedPlaceholder} 3`
        const actual = newSessionName

        assert.strictEqual(actual, expected)
    })

    test("when indexed title matches multiple existing titles", () => {
        const indexedPlaceholder = "Placeholder"
        const initialSession1Name = sessionManager.createNewSession(indexedPlaceholder)
        const initialSession2Name = sessionManager.createNewSession(indexedPlaceholder)
        const initialSession3Name = sessionManager.createNewSession(indexedPlaceholder)
        sessionManager.switchToSession(initialSession3Name)
        sessionManager.setSessionTitle(`${indexedPlaceholder} 5`)
        sessionManager.switchToSession(initialSession2Name)
        sessionManager.setSessionTitle(`${indexedPlaceholder} 4`)
        sessionManager.switchToSession(initialSession1Name)
        sessionManager.setSessionTitle(`${indexedPlaceholder} 3`)

        const newSessionName = sessionManager.createNewSession(indexedPlaceholder)

        const expected = `${indexedPlaceholder} 6`
        const actual = newSessionName

        assert.strictEqual(actual, expected)
    })

})

suite("selectNewSession", () => {
    beforeEach(() => sessionManager = new SessionManager())

    test("no session with name", () => {
        const actual = sessionManager.switchToSession("nonexistant-name")
        const expected = false

        assert.strictEqual(actual, expected)
    })

    test("session with name exists", () => {
        const newSessionName = sessionManager.createNewSession(sessionName)
        const actual = sessionManager.switchToSession(newSessionName)
        const expected = true

        assert.strictEqual(actual, expected)
    })
})