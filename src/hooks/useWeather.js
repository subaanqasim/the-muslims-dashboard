import { useState, useContext } from "react"
import { LocationContext } from "../LocationContext"
import getCurrentWeather from "../helpers/getCurrentWeather"
import getHourlyWeather from "../helpers/getHourlyWeather"

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
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        const data = await res.json()

        gatherWeatherData(data)
    }
    console.log(weather)

    return {
        weather,
        refreshWeather,
        isLoading,
        isError,
    }
}

export default useWeather
