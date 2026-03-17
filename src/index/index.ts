namespace IndexView {

    const sessionList = document.getElementById(window.constants.indexIds.SessionList) as HTMLUListElement
    const createSessionButton = document.getElementById(window.constants.indexIds.CreateSession) as HTMLButtonElement
    const currentSession = document.getElementById(window.constants.indexIds.CurrentSession) as HTMLDivElement
    const sessionTitleInput = document.getElementById(window.constants.indexIds.SessionTitle) as HTMLInputElement
    const sessionModelSelect = document.getElementById(window.constants.indexIds.SessionModel) as HTMLSelectElement
    const sessionChatDiv = document.getElementById(window.constants.indexIds.SessionChat) as HTMLDivElement
    const queryTextArea = document.getElementById(window.constants.indexIds.SessionQuery) as HTMLTextAreaElement
    const querySubmitButton = document.getElementById(window.constants.indexIds.QuerySubmit) as HTMLButtonElement

    const viewmodel = window.viewmodels.index
    type MessageSenderType = typeof window.constants.messageSender[keyof typeof window.constants.messageSender]

    function createSessionButtonClicked() {
        const newSessionTitle = viewmodel.createNewSession(sessionTitleInput.placeholder)
        const newSessionButton = document.createElement("li")

        newSessionButton.textContent = newSessionTitle
        newSessionButton.onclick = () => { sessionButtonClicked }
        sessionTitleInput.value = newSessionTitle

        sessionList.appendChild(newSessionButton)
        currentSession.style.visibility = window.constants.visibility.Visible
    }

    function sessionButtonClicked(sessionButton: HTMLButtonElement) {
        const sessionTitle = sessionButton.value

        if (viewmodel.openSession(sessionTitle)) {
            sessionTitleInput.value = this._sessionManager.getSessionTitle()
            sessionModelSelect.value = this._sessionManager.getSessionModel()
            sessionTitleInput.oninput = () => { sessionButton.value = sessionTitleInput.value }
            sessionTitleInput.onchange = () => {
                sessionButton.value = sessionTitleInput.value
                viewmodel.sessionTitle = sessionTitleInput.value
            }
        } else {
            sessionTitleInput.onchange = () => {}
        }
    }

    async function refreshModelList() {
        const updatedList = await viewmodel.getModelList();

        while (sessionModelSelect.options.length > 1) {
            sessionModelSelect.remove(1);
        }

        updatedList.forEach(model => {
            const modelName = model.name
            const newOption = document.createElement("option")
            const wasPreviouslySelected = modelName == viewmodel.sessionModel

            newOption.textContent = modelName
            newOption.value = modelName
            newOption.selected = wasPreviouslySelected

            sessionModelSelect.appendChild(newOption)
        })
    }

    function showMessage(message: string, sender: MessageSenderType) {
        let messageId = ""

        switch (sender) {
            case window.constants.messageSender.User:
                messageId = window.constants.indexIds.UserMessage
                break
            case window.constants.messageSender.Model:
                messageId = window.constants.indexIds.ModelMessage
                break
            default:
                return
        }

        const messageDiv = document.createElement("div")
        messageDiv.id = messageId
        messageDiv.innerHTML = message

        sessionChatDiv.appendChild(messageDiv)
    }

    async function sendQuery() {
        const query = queryTextArea.value
        showMessage(query, window.constants.messageSender.User)
        queryTextArea.value = ""
    }

    createSessionButton.onclick = createSessionButtonClicked
    querySubmitButton.onclick = sendQuery

    sessionModelSelect.onfocus = refreshModelList
    sessionModelSelect.onblur = () => { viewmodel.sessionModel = sessionModelSelect.value }
}