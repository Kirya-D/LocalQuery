const sessionList = document.getElementById(window.constants.indexId.SessionList) as HTMLUListElement
const createSessionButton = document.getElementById(window.constants.indexId.CreateSession) as HTMLButtonElement
const currentSession = document.getElementById(window.constants.indexId.CurrentSession) as HTMLDivElement
const sessionTitleInput = document.getElementById(window.constants.indexId.SessionTitle) as HTMLInputElement
const sessionSelect = document.getElementById(window.constants.indexId.SessionModel) as HTMLSelectElement

const sessionManager = window.model.sessionManager

function onSessionTitleInputChanged(associatedButton: HTMLLIElement) {
    try {
        sessionManager.setSessionTitle(sessionTitleInput.value)
    } catch (err) {
        if (err instanceof Error) {
            associatedButton.textContent = sessionManager.getSessionTitle()
            sessionTitleInput.value = sessionManager.getSessionTitle()

            alert(err.message)
        }
    }
}

function openExistingSession(sessionButton: HTMLLIElement) {
    const success = sessionManager.selectNewSession(sessionButton.textContent)

    if (success) {
        sessionTitleInput.value = sessionManager.getSessionTitle()
        sessionTitleInput.oninput = () => { sessionButton.textContent = sessionTitleInput.value }
        sessionTitleInput.onchange = () => { onSessionTitleInputChanged(sessionButton) }
    } else {
        sessionTitleInput.onchange = () => {}
    }
}

function createNewSession() {
    const newSessionTitle = sessionManager.createNewSession(sessionTitleInput.placeholder)
    const newSessionButton = document.createElement("li")

    newSessionButton.textContent = newSessionTitle
    sessionList.appendChild(newSessionButton)
    newSessionButton.onclick = () => { openExistingSession(newSessionButton) }

    openExistingSession(newSessionButton)
    sessionTitleInput.value = newSessionTitle
    currentSession.style.visibility = window.constants.visibility.Visible
}

createSessionButton.onclick = createNewSession

async function refreshModelList() {
    const updatedList = await window.ollama.list()

    while (sessionSelect.options.length > 1) {
        sessionSelect.remove(1);
    }

    updatedList.models.forEach(model => {
        const modelName = model.name
        const newOption = document.createElement("option")

        newOption.textContent = modelName
        newOption.value = modelName

        sessionSelect.appendChild(newOption)
    });
}

sessionSelect.onfocus = refreshModelList