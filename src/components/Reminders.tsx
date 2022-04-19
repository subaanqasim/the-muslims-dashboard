import React, { useEffect, useState } from "react"
import {
    Button,
    Paper,
    Text,
    Group,
    Tabs,
    Blockquote,
    Spoiler,
} from "@mantine/core"
import { Book, Folders } from "tabler-icons-react"
import parse from "html-react-parser"
import { useChangeRemTabPref, useUserPrefs } from "../context/UserPrefContext"
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions"
import { fbFunctions } from "../firebase-config"

export function Reminders() {
    const userPrefs = useUserPrefs()
    const changeTab = useChangeRemTabPref()
    const [quranVerse, setQuranVerse] = useState({
        text: "",
        chapter: 0,
        verse: 0,
    })

    interface Hadith {
        title: string | undefined
        text: string | undefined
        source: string | undefined
        book: number | undefined
        chapter: number | undefined
    }
    interface RandHadith {
        data: {
            chapter_title: string | undefined
            text: string | undefined
            chapter: number | undefined
        }
    }
    const [hadith, setHadith] = useState<Hadith>({
        title: "",
        text: "",
        source: "Sahih al-Bukhari",
        book: 0,
        chapter: 0,
    })

    useEffect(() => {
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

        const fetchRandHadith = async () => {
            // connectFunctionsEmulator(fbFunctions, "localhost", 5001)
            const fetchHadith = httpsCallable(fbFunctions, "fetchHadith")

            const rand97 = Math.floor(Math.random() * 97)

            const res = (await fetchHadith({
                randNum: rand97,
            })) as RandHadith

            setHadith({
                title: res.data.chapter_title,
                text: res.data.text,
                source: "Sahih al-Bukhari",
                book: rand97,
                chapter: res.data.chapter,
            })
        }
        fetchRandHadith()
    }, [])

    return (
        <Paper
            withBorder
            p="md"
            radius="md"
            shadow="md"
            style={{ maxWidth: "700px", minWidth: "500px" }}
        >
            <Tabs
                grow
                active={userPrefs.activeRemindersTab}
                onTabChange={changeTab}
            >
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
                        {hadith.title}
                    </Text>
                    <Blockquote
                        cite={`– ${hadith.source}: book ${hadith.book}, chapter ${hadith.chapter}`}
                        style={{ fontSize: "1rem", padding: "0" }}
                    >
                        <Spoiler
                            showLabel="Show more"
                            hideLabel="Hide"
                            maxHeight={100}
                        >
                            <Text>{parse(hadith.text!)}</Text>
                        </Spoiler>
                    </Blockquote>
                    {/* <Group position="right" mt="xs">
                        <Button
                            variant="subtle"
                            size="sm"
                            component="a"
                            href={`https://sunnah.com/bukhari/${hadith.book}/${hadith.chapter}`}
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
