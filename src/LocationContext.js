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
            city: "London",
            state: "England",
        },
    })

    function refreshLocation() {
        const success = async (position) => {
            const { latitude, longitude } = position.coords
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=3&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            )
            const data = await res.json()
            setLocation({
                latitude: latitude,
                longitude: longitude,
                city: data[0].name,
                state: data[0].state,
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
