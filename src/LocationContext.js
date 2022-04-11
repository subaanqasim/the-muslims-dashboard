import React, { createContext } from "react"
import { useLocalStorage } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { MapPinOff } from "tabler-icons-react"
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
        const error = () => {
            showNotification({
                autoClose: 5000,
                title: "Couldn't find your location 😥",
                message:
                    "Please allow location permissions to ensure your location and prayer times are accurate.",
                color: "red",
                icon: <MapPinOff />,
            })
        }

        navigator.geolocation.getCurrentPosition(success, error)
    }

    return (
        <LocationContext.Provider value={{ location, refreshLocation }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export { LocationContextProvider, LocationContext }
