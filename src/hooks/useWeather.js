import { useState, useContext } from "react"
import { LocationContext } from "../LocationContext"
import getCurrentWeather from "../helpers/getCurrentWeather"
import getHourlyWeather from "../helpers/getHourlyWeather"
import { showNotification } from "@mantine/notifications"
import { CloudOff } from "tabler-icons-react"

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

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            )

            if (res.status >= 400 && res.status < 600) {
                throw new Error(res.status)
            }
            const data = await res.json()
            gatherWeatherData(data)
        } catch (errorCode) {
            setIsError(true)
            setIsLoading(false)
            weatherError(errorCode)
        }
    }

    const weatherError = (errorCode) => {
        setIsError(false)
        showNotification({
            autoClose: 8000,
            title: `Unable to refresh weather 🌩 (${errorCode}).`,
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
