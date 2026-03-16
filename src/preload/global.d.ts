import { constantsAPI, viewmodelsAPI } from "./preload"

declare global {
    interface Window {
        "constants": typeof constantsAPI
        "viewmodels": typeof viewmodelsAPI
    }
}