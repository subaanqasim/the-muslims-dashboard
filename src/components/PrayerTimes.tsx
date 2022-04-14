import React, { useContext, useEffect, useState } from "react"
import { ActionIcon, Paper, Table, Text, Title } from "@mantine/core"
import { LocationContext } from "../LocationContext"
import { Refresh } from "tabler-icons-react"
import adhan from "adhan"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function PrayerTimes() {
    const { location, refreshLocation } = useContext(LocationContext)
    const date = new Date()
    const [hour12, setHour12] = useState(false) //TODO: add button/menu option for user to be able to change time formatting
    const [currentPrayer, setCurrentPrayer] = useState("")
    const [nextPrayer, setNextPrayer] = useState("")
    const [timeToNextP, setTimeToNextP] = useState("")

    const coords = new adhan.Coordinates(location.latitude, location.longitude)
    const params = adhan.CalculationMethod.MoonsightingCommittee()
    const prayerTimes = new adhan.PrayerTimes(coords, date, params)
    const sunnahTimes = new adhan.SunnahTimes(prayerTimes)

    const todayPrayerTimes = [
        {
            prayer: "Fajr",
            time: prayerTimes.fajr,
            formattedTime: prayerTimes.fajr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Sunrise",
            time: prayerTimes.sunrise,
            formattedTime: prayerTimes.sunrise.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Dhuhr",
            time: prayerTimes.dhuhr,
            formattedTime: prayerTimes.dhuhr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Asr",
            time: prayerTimes.asr,
            formattedTime: prayerTimes.asr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Maghrib",
            time: prayerTimes.maghrib,
            formattedTime: prayerTimes.maghrib.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Isha",
            time: prayerTimes.isha,
            formattedTime: prayerTimes.isha.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: hour12,
            }),
        },
        {
            prayer: "Last 3rd",
            time: sunnahTimes.lastThirdOfTheNight,
            formattedTime: sunnahTimes.lastThirdOfTheNight.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: hour12,
                }
            ),
        },
    ]

    useEffect(() => {
        if (new Date().valueOf() - location.lastUpdated > 3600000) {
            refreshLocation()
        }

        for (let i = 0; i < todayPrayerTimes.length; i++) {
            if (new Date() < todayPrayerTimes[i].time) {
                setCurrentPrayer(todayPrayerTimes[i - 1].prayer)
                break
            }
        }
    }, [])

    useEffect(() => {
        let nextPrayerTime = new Date()
        for (let i = 0; i < todayPrayerTimes.length; i++) {
            if (new Date() < todayPrayerTimes[i].time) {
                nextPrayerTime = todayPrayerTimes[i].time
                setNextPrayer(todayPrayerTimes[i].prayer)
                break
            }
        }

        setInterval(() => {
            updateRemainingTime(nextPrayerTime)
        }, 1000)
    }, [])

    function updateRemainingTime(timeOfNextPrayer: any) {
        const timeRemaining = timeOfNextPrayer - new Date().valueOf()
        const formattedTimeRemaining = dayjs
            .utc(timeRemaining)
            .format("HH:mm:ss")
        setTimeToNextP(formattedTimeRemaining)
    }

    const rows = todayPrayerTimes.map((prayer) => (
        <tr key={prayer.prayer}>
            <td>{prayer.prayer}</td>
            <td style={{ textAlign: "right" }}>{prayer.formattedTime}</td>
        </tr>
    ))

    return (
        <Paper
            p="md"
            radius="md"
            shadow="md"
            withBorder
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "25rem",
            }}
        >
            <Title order={3}>{currentPrayer}</Title>
            <Text>{`${timeToNextP} until ${nextPrayer}`}</Text>
            <Text size="sm" color="gray">
                {date.toLocaleDateString("en-uk", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </Text>
            <Table
                highlightOnHover
                fontSize="sm"
                verticalSpacing="sm"
                // horizontalSpacing="xs"
                style={{
                    minWidth: "20em",
                    maxWidth: "24em",
                }}
            >
                <tbody>{rows}</tbody>
                <caption
                    style={{
                        fontSize: "0.75rem",
                    }}
                ></caption>
            </Table>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text size="xs">
                    Location: {location.city}, {location.state}
                </Text>
                <ActionIcon
                    color="gray" // TODO: adjust colour to match location text
                    variant="hover"
                    title="Refresh location"
                    onClick={() => refreshLocation()}
                    style={{ marginLeft: "4px" }} // TODO: CENTER ALIGN BUTTON WITH LOCATION TEXT
                >
                    <Refresh size="1rem" />
                </ActionIcon>
            </div>
        </Paper>
    )
}

export default PrayerTimes
