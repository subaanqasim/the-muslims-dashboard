import {
    ColorScheme,
    ColorSchemeProvider,
    Container,
    Group,
    MantineProvider,
    MantineThemeOverride,
    Paper,
    Stack,
} from "@mantine/core"
import { useHotkeys, useLocalStorage, useMediaQuery } from "@mantine/hooks"
import React from "react"
import "./App.css"
import ToggleThemeButton from "./components/ToggleThemeButton"
import PrayerTimes from "./components/PrayerTimes"
import { NotificationsProvider } from "@mantine/notifications"
import WeatherWidget from "./components/Weather/WeatherWidget"
import { Reminders } from "./components/Reminders"

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

    useHotkeys([["mod+J", () => toggleColorScheme()]])

    const myTheme: MantineThemeOverride = {
        colorScheme: colorScheme,
        primaryColor: "yellow",
        fontFamily:
            "Inter, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        headings: {
            fontFamily:
                "Inter, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        },
    }

    const smallScreen = useMediaQuery("(max-width: 1090px)")

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider theme={myTheme}>
                <NotificationsProvider position="bottom-right">
                    <Paper
                        p={0}
                        radius={0}
                        sx={(theme) => ({
                            minHeight: "100vh",
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[9]
                                    : theme.colors.gray[0],
                        })}
                    >
                        <Stack
                            spacing="lg"
                            p="1.5rem"
                            justify="space-between"
                            style={{
                                minHeight: "100vh",
                            }}
                        >
                            <Group
                                position="apart"
                                direction={smallScreen ? "column" : "row"}
                                align={smallScreen ? "center" : "flex-start"}
                            >
                                <Reminders />
                                <WeatherWidget />
                            </Group>
                            <Container>
                                <PrayerTimes />
                            </Container>
                            <Group mt="auto">
                                <ToggleThemeButton />
                            </Group>
                        </Stack>
                    </Paper>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
