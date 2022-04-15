import React from "react"
import {
    ActionIcon,
    Kbd,
    ThemeIcon,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core"
import { Sun, MoonStars } from "tabler-icons-react"
// import { useOs } from "@mantine/hooks"

function ToggleThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const dark = colorScheme === "dark"
    // const os = useOs()

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
            {/* <div>
                <Kbd>{os === "macos" ? "⌘" : "Ctrl"}</Kbd> + <Kbd>J</Kbd>
            </div> */}
        </div>
    )
}

export default ToggleThemeButton
