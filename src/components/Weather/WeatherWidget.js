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
import { LocationContext } from "../../context/LocationContext"
import useWeather from "../../hooks/useWeather"
import CurrentWeather from "./CurrentWeather"
import HourlyWeather from "./HourlyWeather"
import { useUserPrefs } from "../../context/UserPrefContext"

const ICON_SIZE = 60
const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.md,
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
    const userPrefs = useUserPrefs()

    useEffect(() => {
        refreshWeather()
    }, [location])

    const refreshButton = (
        <ActionIcon
            size="xs"
            radius="sm"
            variant="hover"
            onClick={() => {
                refreshLocation()
                refreshWeather()
            }}
            title="Refresh weather"
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
            // mt={ICON_SIZE / 5}
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
                        hour12: userPrefs.hour12,
                    })}
                </Badge>
            </Group>
        </Paper>
    )
}

export default WeatherWidget
