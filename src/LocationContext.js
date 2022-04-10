import React, { createContext } from "react"
import { useLocalStorage } from "@mantine/hooks"
const LocationContext = createContext()

function LocationContextProvider(props) {
    const [location, setLocation] = useLocalStorage({
        key: "location",
        defaultValue: {
            latitude: 51.5072,
            longitude: 0.1276,
        },
    })

    function refreshLocation() {
        const success = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        }
        const error = () =>
            alert(
                "Unable to find location :( - Make sure you grant location permissions!"
            )

        navigator.geolocation.getCurrentPosition(success, error)
    }

    return (
        <LocationContext.Provider value={{ location, refreshLocation }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export { LocationContextProvider, LocationContext }
