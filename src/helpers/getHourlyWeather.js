function getHourlyWeather(data) {
    return data.hourly.slice(1, 5).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        temp: Math.round(item.temp),
        icon: item.weather[0].icon,
    }))
}

export default getHourlyWeather
