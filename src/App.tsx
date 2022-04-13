import {
    ColorScheme,
    ColorSchemeProvider,
    Grid,
    MantineProvider,
    MantineThemeOverride,
    Paper,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import React from "react"
import "./App.css"
import ToggleThemeButton from "./components/ToggleThemeButton"
import PrayerTimes from "./components/PrayerTimes"
import { NotificationsProvider } from "@mantine/notifications"
import WeatherWidget from "./components/Weather/WeatherWidget"

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
                        <Grid
                            gutter={0}
                            justify="center"
                            style={{ minHeight: "100vh", padding: "1rem" }}
                            align="stretch"
                        >
                            <Grid.Col span={4}>{/* Quran Quotes */}</Grid.Col>
                            <Grid.Col
                                span={4}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ToggleThemeButton />
                            </Grid.Col>
                            <Grid.Col
                                span={4}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                }}
                            >
                                <WeatherWidget />
                            </Grid.Col>
                            <Grid.Col
                                span={12}
                                style={{
                                    minHeight: "50vh",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <PrayerTimes />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                {/* options/settings */}
                            </Grid.Col>
                            <Grid.Col span={4} offset={4}>
                                {/* to-do */}
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
