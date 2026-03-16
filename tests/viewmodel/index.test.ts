import assert from "node:assert/strict"
import { beforeEach, suite, test } from "node:test"
import { IndexViewmodel } from "../../src/viewmodel/index.js"

let indexVM = new IndexViewmodel()

suite("sessionTitle", () => {
    beforeEach(() => indexVM = new IndexViewmodel())
    
    test("getter", () => {
        const sessionTitle = "title does not matter here"
        indexVM.createNewSession(sessionTitle)

        const actual = indexVM.sessionTitle
        const expected = `${sessionTitle} 1`

        assert.strictEqual(actual, expected)
    })

    test("getter throws when session is null", () => {
        assert.throws(() => { indexVM.sessionTitle })
    })

    test("setter", () => {
        indexVM.createNewSession("title does not matter here")
        const newTitle = "Expected title"
        indexVM.sessionTitle = newTitle

        const actual = indexVM.sessionTitle
        const expected = newTitle

        assert.strictEqual(actual, expected)
    })

    test("setter throws when title is empty", () => {
        indexVM.createNewSession("title does not matter here")
        assert.throws(() => { indexVM.sessionTitle = "" })
    })
})

suite("sessionModel", () => {
    beforeEach(() => indexVM = new IndexViewmodel())
    
    test("getter", () => {
        indexVM.createNewSession("title does not matter here")

        const actual = indexVM.sessionModel
        const expected = ""

        assert.strictEqual(actual, expected)
    })

    test("getter throws when session is null", () => {
        assert.throws(() => { indexVM.sessionModel})
    })

    test("setter", () => {
        indexVM.createNewSession("title does not matter here")
        const newModel = "Expected model"
        indexVM.sessionModel = newModel

        const actual = indexVM.sessionModel
        const expected = newModel

        assert.strictEqual(actual, expected)
    })

    test("setter throws when session is null", () => {
        assert.throws(() => { indexVM.sessionModel = ""})
    })
})

suite("openSession", () => {
    beforeEach(() => indexVM = new IndexViewmodel())
    
    test("when no sessions exist", () => {
        const actual = indexVM.openSession("nonexistant session")
        const expected = false

        assert.strictEqual(actual, expected)
    })

    test("when title matches only session", () => {
        const sessionTitle = indexVM.createNewSession("The only session")

        const actual = indexVM.openSession(sessionTitle)
        const expected = true

        assert.strictEqual(actual, expected)
    })

    test("when title matches no sessions", () => {
        const noMatchingSessionTitle = "this shouldn't be found"
        const indexedTitle = "# title"
        indexVM.createNewSession(indexedTitle)
        indexVM.createNewSession(indexedTitle)
        indexVM.createNewSession(indexedTitle)

        const actual = indexVM.openSession(noMatchingSessionTitle)
        const expected = false

        assert.strictEqual(actual, expected)
    })

    test("when title matches one of multiple sessions", () => {
        const indexedTitle = "# title"
        indexVM.createNewSession(indexedTitle)
        const foundSessionTitle = indexVM.createNewSession(indexedTitle)
        indexVM.createNewSession(indexedTitle)

        const actual = indexVM.openSession(foundSessionTitle)
        const expected = true

        assert.strictEqual(actual, expected)
    })
})

suite("createNewSession", () => {
    beforeEach(() => indexVM = new IndexViewmodel())
    
    test("getter", () => {
        indexVM.createNewSession("title does not matter here")

        const actual = indexVM.sessionModel
        const expected = ""

        assert.strictEqual(actual, expected)
    })
})

suite("getModelList", () => {
    beforeEach(() => indexVM = new IndexViewmodel())
    
    test("works without a session", () => {
        const actual = indexVM.getModelList()

        assert.notStrictEqual(actual, null)
    })

    test("expect valid return", () => {
        const actual = indexVM.getModelList()

        assert.notStrictEqual(actual, null)
    })
})