const SessionList = document.getElementById(window.constants.indexId.SessionList) as HTMLUListElement
const CreateSessionButton = document.getElementById(window.constants.indexId.CreateSession) as HTMLButtonElement
const CurrentSession = document.getElementById(window.constants.indexId.CurrentSession) as HTMLDivElement
const SessionTitleInput = document.getElementById(window.constants.indexId.SessionTitle) as HTMLInputElement

const sessionManager = window.model.sessionManager

function onSessionTitleInputChanged(associatedButton: HTMLLIElement) {
    try {
        sessionManager.changeSessionTitle(SessionTitleInput.value)
    } catch (err) {
        if (err instanceof Error) {
            associatedButton.textContent = sessionManager.sessionTitle()
            SessionTitleInput.value = sessionManager.sessionTitle()

            alert(err.message)
        }
    }
}

function openExistingSession(sessionButton: HTMLLIElement) {
    const success = sessionManager.selectNewSession(sessionButton.textContent)

    if (success) {
        SessionTitleInput.value = sessionManager.sessionTitle()
        SessionTitleInput.oninput = () => { sessionButton.textContent = SessionTitleInput.value }
        SessionTitleInput.onchange = () => { onSessionTitleInputChanged(sessionButton) }
    } else {
        SessionTitleInput.onchange = () => {}
    }
}

function createNewSession() {
    const newSessionTitle = sessionManager.createNewSession(SessionTitleInput.placeholder)
    const newSessionButton = document.createElement("li")

    newSessionButton.textContent = newSessionTitle
    SessionList.appendChild(newSessionButton)
    newSessionButton.onclick = () => { openExistingSession(newSessionButton) }

    openExistingSession(newSessionButton)
    SessionTitleInput.value = newSessionTitle
    CurrentSession.style.visibility = window.constants.visibility.Visible
}

CreateSessionButton.onclick = createNewSession