import React, { useContext } from "react"
import {
    createStyles,
    ThemeIcon,
    Text,
    Group,
    Badge,
    Paper,
    Title,
    ActionIcon,
} from "@mantine/core"
import { Cloud, CloudRain, Refresh, X } from "tabler-icons-react"
import { LocationContext } from "../LocationContext"

const ICON_SIZE = 60

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl + ICON_SIZE / 3,
        minWidth: "20em",
    },

    icon: {
        position: "absolute",
        top: -ICON_SIZE / 3,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },

    title: {
        fontFamily: theme.fontFamily,
        lineHeight: 1,
    },

    description: {
        textTransform: "uppercase",
        marginBottom: "1.5em",
    },
}))

function Weather() {
    const { classes } = useStyles()
    const { location, refreshLocation } = useContext(LocationContext)

    const refreshButton = (
        <ActionIcon
            size="xs"
            radius="sm"
            variant="hover"
            onClick={() => refreshLocation()}
            title="Refresh location"
            color="orange"
        >
            <Refresh size={12} />
        </ActionIcon>
    )

    const hourlyWeather = (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CloudRain
                size="1.5rem"
                style={{ alignSelf: "center", margin: "0.25em 0em" }}
            />
            <Text size="xs">10PM</Text>
            <Text size="xs" color="dimmed">
                10ºC
            </Text>
        </div>
    )

    return (
        <Paper
            radius="md"
            shadow="md"
            withBorder
            className={classes.card}
            mt={ICON_SIZE / 3}
        >
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
                cloudy
            </Text>

            <Title order={1} align="center" className={classes.title}>
                20ºC
            </Title>
            <Text color="dimmed" align="center" size="sm">
                H: 21º L: 10º
            </Text>

            <Group position="apart" my="1em">
                {/* {hourlyForecast} */}
            </Group>

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

export default Weather
