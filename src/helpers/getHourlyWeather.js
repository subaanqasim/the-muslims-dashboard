import hourlyWeatherIcons from "../components/Weather/iconsHourlyWeather"

function getHourlyWeather(data) {
    let hourlyWeatherIcon = <></>

    return data.hourly.slice(1, 5).map((item) => {
        for (const icon of hourlyWeatherIcons) {
            if (icon.id === item.weather[0].icon) {
                hourlyWeatherIcon = icon.icon
                break
            }
        }

        return {
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            temp: Math.round(item.temp),
            icon: hourlyWeatherIcon,
        }
    })
}

export default getHourlyWeather
