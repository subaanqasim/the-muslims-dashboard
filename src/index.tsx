import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { LocationContextProvider } from "./LocationContext"

ReactDOM.render(
    <React.StrictMode>
        <LocationContextProvider>
            <App />
        </LocationContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
