import { Text } from "@mantine/core"
import React from "react"

function HourlyWeather(props) {
    const {
        weather: { hourlyWeatherData },
    } = props

    const hourlyWeatherElements = hourlyWeatherData.map((item) => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {item.icon}
            <Text size="xs">{item.time}</Text>
            <Text size="xs" color="dimmed">
                {item.temp}ºC
            </Text>
        </div>
    ))

    return <>{hourlyWeatherElements}</>
}

export default HourlyWeather
