import currentWeatherIcons from "../components/Weather/iconsCurrentWeather"

function getCurrentWeather(data) {
    let currentWeatherIcon = <></>
    for (const icon of currentWeatherIcons) {
        if (icon.id === data.current.weather[0].icon) {
            currentWeatherIcon = icon.icon
            break
        }
    }

    return {
        currentTemp: Math.round(data.current.temp),
        low: Math.round(data.daily[0].temp.min),
        high: Math.round(data.daily[0].temp.max),
        desc: data.current.weather[0].main,
        icon: currentWeatherIcon,
    }
}

export default getCurrentWeather
