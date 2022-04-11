import React, { useContext, useEffect, useState } from "react"
import { ActionIcon, Table, Text, Title } from "@mantine/core"
import { LocationContext } from "../LocationContext"
import { Refresh } from "tabler-icons-react"
import adhan from "adhan"

function PrayerTimes() {
    const { location, refreshLocation } = useContext(LocationContext)
    const date = new Date()
    const [hour12, setHour12] = useState(false) //TODO: add button/menu option for user to be able to change time formatting
    const [currentPrayer, setCurrentPrayer] = useState("")

    const coords = new adhan.Coordinates(location.latitude, location.longitude)
    const params = adhan.CalculationMethod.MoonsightingCommittee()
    const prayerTimes = new adhan.PrayerTimes(coords, date, params)
    const sunnahTimes = new adhan.SunnahTimes(prayerTimes)

    useEffect(() => {
        const times = todayPrayerTimes.map((prayer) => ({
            prayer: prayer.prayer,
            time: prayer.time,
        }))

        for (let i = 0; i < times.length; i++) {
            if (new Date() < times[i].time) {
                setCurrentPrayer(times[i - 1].prayer)
                break
            }
        }
    }, [])

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

    const rows = todayPrayerTimes.map((prayer) => (
        <tr key={prayer.prayer}>
            <td>{prayer.prayer}</td>
            <td style={{ textAlign: "right" }}>{prayer.formattedTime}</td>
        </tr>
    ))

    return (
        <>
            <Title style={{ display: "block" }} order={3}>
                {currentPrayer}
            </Title>
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
                captionSide="bottom"
                verticalSpacing="sm"
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
                >
                    Location: {location.city}, {location.state}
                    <ActionIcon
                        color="gray" // TODO: adjust colour to match location text
                        variant="hover"
                        title="Refresh location"
                        onClick={() => refreshLocation()}
                        style={{ marginLeft: "4px", display: "inline-block" }} // TODO: CENTER ALIGN BUTTON WITH LOCATION TEXT
                    >
                        <Refresh size="1rem" />
                    </ActionIcon>
                </caption>
            </Table>
        </>
    )
}

export default PrayerTimes
