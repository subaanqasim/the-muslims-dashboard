import React from "react"
import {
    ActionIcon,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core"
import { Sun, MoonStars } from "tabler-icons-react"

function ToggleThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const dark = colorScheme === "dark"

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <ActionIcon
                variant="hover"
                color={dark ? theme.primaryColor : "gray"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                sx={(theme) => ({
                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[2],
                    },
                })}
            >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
        </div>
    )
}

export default ToggleThemeButton
