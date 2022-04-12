function getCurrentWeather(data) {
    return {
        currentTemp: Math.round(data.current.temp),
        low: Math.round(data.daily[0].temp.min),
        high: Math.round(data.daily[0].temp.max),
        desc: data.current.weather[0].main,
        icon: data.current.weather[0].icon,
    }
}

export default getCurrentWeather
