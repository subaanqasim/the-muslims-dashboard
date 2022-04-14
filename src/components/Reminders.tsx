import React, { useEffect, useState } from "react"
import { Button, Paper, Text, Group, Tabs, Blockquote } from "@mantine/core"
import { MessageCircle, Photo } from "tabler-icons-react"

export function Reminders() {
    const [quranVerse, setQuranVerse] = useState({
        text: "",
        verseKey: "",
    })

    useEffect(() => {
        const fetchVerse = async () => {
            const res = await fetch(
                `https://api.quran.com/api/v4/verses/random?language=en&words=false&translations=131`
            )
            const data = await res.json()

            setQuranVerse({
                text: data.verse.translations[0].text,
                verseKey: data.verse.verse_key,
            })
        }
        fetchVerse()
    }, [])

    return (
        <Paper
            withBorder
            p="md"
            radius="md"
            shadow="md"
            style={{ maxWidth: "700px", minWidth: "500px" }}
        >
            <Tabs grow>
                <Tabs.Tab label="Qur'an" icon={<Photo size={14} />}>
                    <Blockquote
                        cite={`– ${quranVerse.verseKey}`}
                        style={{ fontSize: "1rem", padding: "0" }}
                    >
                        <Text lineClamp={5}>{quranVerse.text}</Text>
                    </Blockquote>
                    <Group position="right" mt="xs">
                        <Button
                            variant="subtle"
                            size="sm"
                            component="a"
                            href={`https://quran.com/${quranVerse.verseKey.replace(
                                ":",
                                "/"
                            )}`}
                            rel="noopener noreferrer"
                        >
                            Read more
                        </Button>
                    </Group>
                </Tabs.Tab>

                <Tabs.Tab label="Hadith" icon={<MessageCircle size={14} />}>
                    <Text size="lg" weight={600} mb="sm">
                        Coming Soon insha'Allah
                    </Text>
                    <Blockquote
                        cite=":("
                        style={{ fontSize: "1rem", padding: "0" }}
                    >
                        <Text
                            lineClamp={5}
                        >{`Waiting on some API keys...`}</Text>
                    </Blockquote>
                    {/* <Group position="right" mt="xs">
                        <Button
                            variant="subtle"
                            size="sm"
                            component="a"
                            href={"#"}
                            rel="noopener noreferrer"
                        >
                            Read more
                        </Button>
                    </Group> */}
                </Tabs.Tab>
            </Tabs>
        </Paper>
    )
}
