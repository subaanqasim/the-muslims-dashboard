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

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

    // TODO: figure out shortcut for windows/mac
    useHotkeys([["ctrl+J", () => toggleColorScheme]])

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
                <Paper
                    p={0}
                    radius={0}
                    sx={{
                        minHeight: "100vh",
                    }}
                >
                    <Grid
                        gutter={0}
                        justify="center"
                        style={{ minHeight: "100vh", padding: "1rem" }}
                        align="stretch"
                    >
                        <Grid.Col
                            span={4}
                            style={{
                                border: "solid 1px red",
                                // minHeight: "20vh",
                            }}
                        >
                            Quran Quotes
                        </Grid.Col>
                        <Grid.Col
                            span={4}
                            style={{
                                border: "solid 1px red",
                                display: "flex",
                                justifyContent: "center",
                                // minHeight: "20vh",
                            }}
                        >
                            <ToggleThemeButton />
                        </Grid.Col>
                        <Grid.Col
                            span={4}
                            style={{
                                border: "solid 1px red",
                                display: "flex",
                                justifyContent: "flex-end",
                                // minHeight: "20vh",
                            }}
                        >
                            Weather
                        </Grid.Col>
                        <Grid.Col
                            span={12}
                            style={{
                                border: "solid 1px red",
                                minHeight: "50vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <PrayerTimes />
                        </Grid.Col>
                        <Grid.Col
                            span={4}
                            style={{
                                border: "solid 1px red",
                                // minHeight: "10vh",
                            }}
                        >
                            options/settings
                        </Grid.Col>
                        <Grid.Col
                            span={4}
                            offset={4}
                            style={{
                                border: "solid 1px red",
                                // minHeight: "10vh",
                            }}
                        >
                            to-do
                        </Grid.Col>
                    </Grid>
                </Paper>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
