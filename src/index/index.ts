namespace IndexView {
    const sessionList = document.getElementById(window.constants.indexIds.SessionList) as HTMLUListElement
    const createSessionButton = document.getElementById(window.constants.indexIds.CreateSession) as HTMLButtonElement
    const currentSession = document.getElementById(window.constants.indexIds.CurrentSession) as HTMLDivElement
    const sessionTitleInput = document.getElementById(window.constants.indexIds.SessionTitle) as HTMLInputElement
    const sessionModelSelect = document.getElementById(window.constants.indexIds.SessionModel) as HTMLSelectElement
    const sessionChatDiv = document.getElementById(window.constants.indexIds.SessionChat) as HTMLDivElement
    const queryTextArea = document.getElementById(window.constants.indexIds.SessionQuery) as HTMLTextAreaElement
    const querySubmitButton = document.getElementById(window.constants.indexIds.QuerySubmit) as HTMLButtonElement

    type MessageSenderType = typeof window.constants.messageSender[keyof typeof window.constants.messageSender]
    const viewmodel = window.viewmodels.index

    createSessionButton.onclick = createSessionButtonClicked
    querySubmitButton.onclick = sendQuery

    sessionModelSelect.onfocus = refreshModelList
    sessionModelSelect.onchange = updateSelectedModel

    function createSessionButtonClicked() {
        const newSessionTitle = viewmodel.createNewSession(sessionTitleInput.placeholder)
        const newSessionListButton = document.createElement("li")

        newSessionListButton.textContent = newSessionTitle
        newSessionListButton.onclick = () => { sessionButtonClicked(newSessionListButton) }

        sessionList.appendChild(newSessionListButton)

        sessionButtonClicked(newSessionListButton)
    }

    function sessionButtonClicked(sessionButton: HTMLLIElement) {
        const sessionTitle = sessionButton.textContent

        if (viewmodel.openSession(sessionTitle)) {
            updateDisplayedSessionInformation()

            sessionTitleInput.oninput = () => { sessionButton.textContent = sessionTitleInput.value }
            sessionTitleInput.onchange = () => {
                sessionButton.textContent = sessionTitleInput.value
                viewmodel.setSessionTitle(sessionTitleInput.value)
            }

            currentSession.style.visibility = window.constants.visibility.Visible
        } else {
            sessionTitleInput.onchange = () => {}
        }
    }

    function updateDisplayedSessionInformation() {
        const sessionModel = viewmodel.getSessionModel()
        sessionTitleInput.value = viewmodel.getSessionTitle()

        for (let i = 1; i < sessionModelSelect.options.length; i++) {
            const option = sessionModelSelect[i] as HTMLOptionElement
            option.selected = option.value == sessionModel
        }
    }

    async function sendQuery() {
        const query = queryTextArea.value
        showMessage(query, window.constants.messageSender.User)
        queryTextArea.value = ""

        const queryResult = await viewmodel.sendQuery(query)
        showMessage(queryResult, window.constants.messageSender.Model)
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

    async function refreshModelList() {
        const updatedList = await viewmodel.getModelList()

        while (sessionModelSelect.options.length > 1) {
            sessionModelSelect.remove(1)
        }

        updatedList.forEach(model => {
            const modelName = model.name
            const newOption = document.createElement("option")
            const wasPreviouslySelected = modelName == viewmodel.getSessionModel()

            newOption.textContent = modelName
            newOption.value = modelName
            newOption.selected = wasPreviouslySelected

            sessionModelSelect.appendChild(newOption)
        })
    }

    function updateSelectedModel() {
        viewmodel.setSessionModel(sessionModelSelect.value)
    }
}