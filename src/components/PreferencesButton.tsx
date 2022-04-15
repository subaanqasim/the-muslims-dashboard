import {
    ActionIcon,
    createStyles,
    Group,
    Popover,
    Switch,
    Text,
    useMantineTheme,
    ColorPicker,
    Button,
} from "@mantine/core"
import React, { useState } from "react"
import { Adjustments, BrandInstagram, Mail } from "tabler-icons-react"
import {
    useChangeColourPref,
    useChangeHour12Pref,
    useUserPrefs,
} from "../context/UserPrefContext"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    body: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
    },

    item: {
        "& + &": {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        "& *": {
            cursor: "pointer",
        },
    },

    title: {
        lineHeight: 1,
    },
}))

function PreferencesButton() {
    const { classes } = useStyles()
    const [opened, setOpened] = useState(false)
    const theme = useMantineTheme()
    const userPrefs = useUserPrefs()
    const changeColour = useChangeColourPref()
    const changeHour12 = useChangeHour12Pref()

    return (
        <>
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                position="top"
                placement="start"
                withCloseButton
                title="Preferences"
                transition="pop-bottom-left"
                closeButtonLabel="Close preferences"
                spacing="md"
                classNames={{
                    body: classes.body,
                }}
                target={
                    <ActionIcon
                        onClick={() => setOpened((x) => !x)}
                        title="Preferences"
                        aria-label="Preferences"
                        variant="hover"
                        sx={(theme) => ({
                            "&:hover": {
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[6]
                                        : theme.colors.gray[2],
                            },
                        })}
                    >
                        <Adjustments size={19} />
                    </ActionIcon>
                }
            >
                <Group
                    position="apart"
                    className={classes.item}
                    noWrap
                    spacing="xl"
                >
                    <div>
                        <Text>12h time formatting</Text>
                        <Text size="xs" color="dimmed">
                            Choose between 12h or 24h time formatting
                        </Text>
                    </div>
                    <Switch
                        onLabel="ON"
                        offLabel="OFF"
                        checked={userPrefs.hour12}
                        onChange={(event) =>
                            changeHour12(event.currentTarget.checked)
                        }
                        className={classes.switch}
                        size="lg"
                    />
                </Group>
                <Group
                    position="apart"
                    className={classes.item}
                    noWrap
                    spacing="xl"
                >
                    <div>
                        <Text>Accent colour</Text>
                        <Text size="xs" color="dimmed">
                            Pick whatever you want!
                        </Text>
                    </div>
                    <div>
                        <ColorPicker
                            format="hex"
                            withPicker={false}
                            swatchesPerRow={5}
                            size="xs"
                            focusable
                            onChange={changeColour}
                            swatches={[
                                "#495057",
                                "#f03e3e",
                                "#d6336c",
                                "#ae3ec9",
                                "#7048e8",
                                "#4263eb",
                                "#1c7ed6", // note: returns #1c7fd6 on click
                                "#1098ad",
                                "#0ca678",
                                "#37b24d", // note: returns #37b34e on click
                                "#74b816",
                                "#f59f00",
                                "#f76707",
                            ]}
                        />
                    </div>
                </Group>
                <Group
                    position="apart"
                    className={classes.item}
                    noWrap
                    spacing="xl"
                >
                    <div>
                        <Text>Noticed a bug? 🐛</Text>
                        <Text
                            size="xs"
                            color="dimmed"
                            style={{ maxWidth: "40ch" }}
                        >
                            Please get in touch with details and how to
                            reproduce the issue.
                        </Text>
                    </div>
                    <ActionIcon
                        title="Instagram"
                        variant="light"
                        color={theme.primaryColor}
                        component="a"
                        href="https://instagram.com/subaanqasim"
                    >
                        <BrandInstagram style={{ strokeWidth: "1.25px" }} />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        title="Email"
                        color={theme.primaryColor}
                        component="a"
                        href="mailto:subaan.qasim@gmail.com"
                    >
                        <Mail style={{ strokeWidth: "1.25px" }} />
                    </ActionIcon>
                </Group>
            </Popover>
        </>
    )
}

export default PreferencesButton
