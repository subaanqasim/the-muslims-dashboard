import React, { useEffect, useState } from "react"
import { Button, Paper, Text, Group, Tabs, Blockquote } from "@mantine/core"
import { Book, Folders } from "tabler-icons-react"

export function Reminders() {
    const [quranVerse, setQuranVerse] = useState({
        text: "",
        chapter: 0,
        verse: 0,
    })

    useEffect(() => {
        // const fetchVerse = async () => {
        //     const res = await fetch(
        //         `https://api.quran.com/api/v4/verses/random?language=en&words=false&translations=131`
        //     )
        //     const data = await res.json()
        //     setQuranVerse({
        //         text: data.verse.translations[0].text,
        //         verseKey: data.verse.verse_key,
        //     })
        // }
        const fetchVerse = async () => {
            const res = await fetch("../../../assets/quranEn.json")
            const data = await res.json()
            const randomVerse = await data.quran[
                Math.floor(Math.random() * 6236)
            ]
            setQuranVerse({
                text: randomVerse.text,
                chapter: randomVerse.chapter,
                verse: randomVerse.verse,
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
                <Tabs.Tab label="Qur'an" icon={<Book size={16} />}>
                    <Blockquote
                        cite={`– Surah ${quranVerse.chapter}, verse ${quranVerse.verse}`}
                        style={{ fontSize: "1rem", padding: "0" }}
                    >
                        <Text lineClamp={5}>{quranVerse.text}</Text>
                    </Blockquote>
                    <Group position="right" mt="xs">
                        <Button
                            variant="subtle"
                            size="sm"
                            component="a"
                            href={`https://quran.com/${quranVerse.chapter}/${quranVerse.verse}`}
                            rel="noopener noreferrer"
                        >
                            Read more
                        </Button>
                    </Group>
                </Tabs.Tab>

                <Tabs.Tab label="Hadith" icon={<Folders size={14} />}>
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
