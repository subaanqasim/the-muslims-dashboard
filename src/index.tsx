import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { LocationContextProvider } from "./context/LocationContext"
import { UserPrefsContextProvider } from "./context/UserPrefContext"

ReactDOM.render(
    <React.StrictMode>
        <LocationContextProvider>
            <UserPrefsContextProvider>
                <App />
            </UserPrefsContextProvider>
        </LocationContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
