namespace IndexView {

    const sessionList = document.getElementById(window.constants.index.SessionList) as HTMLUListElement
    const createSessionButton = document.getElementById(window.constants.index.CreateSession) as HTMLButtonElement
    const currentSession = document.getElementById(window.constants.index.CurrentSession) as HTMLDivElement
    const sessionTitleInput = document.getElementById(window.constants.index.SessionTitle) as HTMLInputElement
    const sessionModelSelect = document.getElementById(window.constants.index.SessionModel) as HTMLSelectElement

    const viewmodel = window.viewmodels.index
    console.log(viewmodel.getModelList)

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

        if (viewmodel.OpenSession(sessionTitle)) {
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

        updatedList.models.forEach(model => {
            const modelName = model.name
            const newOption = document.createElement("option")
            const wasPreviouslySelected = modelName == viewmodel.sessionModel

            newOption.textContent = modelName
            newOption.value = modelName
            newOption.selected = wasPreviouslySelected

            sessionModelSelect.appendChild(newOption)
        })
    }

    createSessionButton.onclick = createSessionButtonClicked

    sessionModelSelect.onfocus = refreshModelList
    sessionModelSelect.onblur = () => { viewmodel.sessionModel = sessionModelSelect.value }

}
