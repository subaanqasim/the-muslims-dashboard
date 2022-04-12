import { Text } from "@mantine/core"
import React from "react"
import { CloudRain } from "tabler-icons-react"

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
            <CloudRain size="1.5rem" style={{ margin: "0.25em 0em" }} />
            <Text size="xs">{item.time}</Text>
            <Text size="xs" color="dimmed">
                {item.temp}ºC
            </Text>
        </div>
    ))

    return <>{hourlyWeatherElements}</>
}

export default HourlyWeather
