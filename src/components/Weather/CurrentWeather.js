import { createStyles, Text, ThemeIcon, Title } from "@mantine/core"
import React from "react"
import { Cloud } from "tabler-icons-react"

const ICON_SIZE = 60
const useStyles = createStyles((theme) => ({
    icon: {
        position: "absolute",
        top: -ICON_SIZE / 3,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },
    description: {
        textTransform: "uppercase",
        marginBottom: "1.5em",
    },
}))

function CurrentWeather(props) {
    const {
        weather: { currentWeatherData },
    } = props
    const { classes } = useStyles()

    return (
        <>
            <ThemeIcon
                className={classes.icon}
                size={ICON_SIZE}
                radius={ICON_SIZE}
            >
                <Cloud size={34} />
            </ThemeIcon>
            <Text
                className={classes.description}
                color="dimmed"
                align="center"
                size="sm"
            >
                {currentWeatherData.desc}
            </Text>
            <Title order={1} align="center" className={classes.title}>
                {currentWeatherData.currentTemp}ºC
            </Title>
            <Text color="dimmed" align="center" size="sm">
                H: {currentWeatherData.high}º L: {currentWeatherData.low}º
            </Text>
        </>
    )
}

export default CurrentWeather
