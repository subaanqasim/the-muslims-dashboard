import React, { useContext, useEffect } from "react"
import {
    createStyles,
    Group,
    Badge,
    Paper,
    ActionIcon,
    LoadingOverlay,
} from "@mantine/core"
import { Refresh } from "tabler-icons-react"
import { LocationContext } from "../../LocationContext"
import useWeather from "../../hooks/useWeather"
import CurrentWeather from "./CurrentWeather"
import HourlyWeather from "./HourlyWeather"

const ICON_SIZE = 60
const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl + ICON_SIZE / 3,
        minWidth: "20em",
    },
    title: {
        fontFamily: theme.fontFamily,
        lineHeight: 1,
    },
}))

function WeatherWidget() {
    const { classes } = useStyles()
    const { location, refreshLocation } = useContext(LocationContext)
    const { weather, refreshWeather, isLoading } = useWeather()

    useEffect(() => {
        refreshWeather()
    }, [location])

    const refreshButton = (
        <ActionIcon
            size="xs"
            radius="sm"
            variant="hover"
            onClick={() => refreshWeather()}
            title="Refresh weather"
            color="orange"
        >
            <Refresh size={12} />
        </ActionIcon>
    )

    return (
        <Paper
            radius="md"
            shadow="md"
            withBorder
            className={classes.card}
            mt={ICON_SIZE / 3}
        >
            <LoadingOverlay visible={isLoading} />
            {weather && <CurrentWeather weather={weather} />}

            {weather && (
                <Group position="apart" my="1em">
                    <HourlyWeather weather={weather} />
                </Group>
            )}

            <Group position="apart" mt="md">
                <Badge
                    size="md"
                    radius="sm"
                    variant="light"
                    sx={{ paddingRight: 3 }}
                    rightSection={refreshButton}
                >
                    {location.city}
                </Badge>
                <Badge size="md" radius="sm" variant="outline">
                    {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </Badge>
            </Group>
        </Paper>
    )
}

export default WeatherWidget
