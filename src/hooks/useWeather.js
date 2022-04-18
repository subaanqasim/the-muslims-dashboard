import { useState, useContext } from "react"
import { LocationContext } from "../context/LocationContext"
import getCurrentWeather from "../helpers/getCurrentWeather"
import getHourlyWeather from "../helpers/getHourlyWeather"
import { showNotification } from "@mantine/notifications"
import { CloudOff } from "tabler-icons-react"
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions"
import { fbFunctions } from "../firebase-config"

function useWeather() {
    const { location } = useContext(LocationContext)
    const [weather, setWeather] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    function gatherWeatherData(data) {
        const currentWeatherData = getCurrentWeather(data)
        const hourlyWeatherData = getHourlyWeather(data)
        setWeather({ currentWeatherData, hourlyWeatherData })
        setIsLoading(false)
    }

    async function refreshWeather() {
        setIsLoading(true)
        setIsError(false)
        // connectFunctionsEmulator(fbFunctions, "localhost", 5001)

        const fetchWeather = httpsCallable(fbFunctions, "fetchWeather")

        try {
            const data = await fetchWeather({
                lat: location.latitude,
                lon: location.longitude,
            })

            gatherWeatherData(data.data)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            weatherError(error)
        }
    }

    const weatherError = (error) => {
        setIsError(false)
        showNotification({
            autoClose: 8000,
            title: `Unable to refresh weather 🌩 (${error}).`,
            message:
                "Please try again later, or get in touch if this problem persists",
            color: "red",
            icon: <CloudOff />,
        })
    }

    return {
        weather,
        refreshWeather,
        isLoading,
        isError,
        weatherError,
    }
}

export default useWeather
