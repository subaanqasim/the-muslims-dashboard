import React, { useContext, useEffect, useState } from "react"
import { ActionIcon, Mark, Paper, Table, Text, Title } from "@mantine/core"
import { LocationContext } from "../context/LocationContext"
import { Refresh } from "tabler-icons-react"
import adhan, { CalculationParameters } from "adhan"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useUserPrefs } from "../context/UserPrefContext"

dayjs.extend(utc)

const calcMethodOptions = [
    {
        label: "Moonsighting Committee",
        param: adhan.CalculationMethod.MoonsightingCommittee(),
    },
    {
        label: "Muslim World League",
        param: adhan.CalculationMethod.MuslimWorldLeague(),
    },
    {
        label: "North America",
        param: adhan.CalculationMethod.NorthAmerica(),
    },
    {
        label: "Egypt",
        param: adhan.CalculationMethod.Egyptian(),
    },
    {
        label: "Karachi",
        param: adhan.CalculationMethod.Karachi(),
    },
    {
        label: "Moonsighting Committee",
        param: adhan.CalculationMethod.MoonsightingCommittee(),
    },
    {
        label: "Umm al-Qura",
        param: adhan.CalculationMethod.UmmAlQura(),
    },
    {
        label: "Dubai",
        param: adhan.CalculationMethod.Dubai(),
    },
    {
        label: "Qatar",
        param: adhan.CalculationMethod.Qatar(),
    },
    {
        label: "Kuwait",
        param: adhan.CalculationMethod.Kuwait(),
    },
    {
        label: "Singapore",
        param: adhan.CalculationMethod.Singapore(),
    },
    {
        label: "Turkey",
        param: adhan.CalculationMethod.Turkey(),
    },
    {
        label: "Tehran",
        param: adhan.CalculationMethod.Tehran(),
    },
]

function PrayerTimes() {
    const { location, refreshLocation } = useContext(LocationContext)
    const date = new Date()
    const userPrefs = useUserPrefs()
    const [currentPrayer, setCurrentPrayer] = useState("")
    const [nextPrayer, setNextPrayer] = useState("")
    const [timeToNextP, setTimeToNextP] = useState("")

    const coords = new adhan.Coordinates(location.latitude, location.longitude)

    const getCalcMethod = (optionInput: string): CalculationParameters => {
        for (const option of calcMethodOptions) {
            if (optionInput === option.label) {
                return option.param
            }
        }
        throw new Error(
            "Error calculating prayer times using this calculation method."
        )
    }

    const calcMethod = getCalcMethod(userPrefs.prayerTimes.calcMethod)
    const params = calcMethod
    params!.madhab =
        userPrefs.prayerTimes.madhab === "Shafi"
            ? adhan.Madhab.Shafi
            : adhan.Madhab.Hanafi
    const prayerTimes = new adhan.PrayerTimes(coords, date, params)
    const sunnahTimes = new adhan.SunnahTimes(prayerTimes)

    const todayPrayerTimes = [
        {
            prayer: "Fajr",
            time: prayerTimes.fajr,
            formattedTime: prayerTimes.fajr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
            }),
        },
        {
            prayer: "Sunrise",
            time: prayerTimes.sunrise,
            formattedTime: prayerTimes.sunrise.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
            }),
        },
        {
            prayer: "Dhuhr",
            time: prayerTimes.dhuhr,
            formattedTime: prayerTimes.dhuhr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
            }),
        },
        {
            prayer: "Asr",
            time: prayerTimes.asr,
            formattedTime: prayerTimes.asr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
            }),
        },
        {
            prayer: "Maghrib",
            time: prayerTimes.maghrib,
            formattedTime: prayerTimes.maghrib.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
            }),
        },
        {
            prayer: "Isha",
            time: prayerTimes.isha,
            formattedTime: prayerTimes.isha.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: userPrefs.hour12,
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
                    hour12: userPrefs.hour12,
                }
            ),
        },
    ]

    useEffect(() => {
        if (new Date().valueOf() - location.lastUpdated > 900000) {
            refreshLocation()
        }

        for (let i = 0; i < todayPrayerTimes.length; i++) {
            if (new Date() < todayPrayerTimes[i].time) {
                if (i === 0) {
                    setCurrentPrayer("Isha")
                    break
                }
                setCurrentPrayer(todayPrayerTimes[i - 1].prayer)
                break
            }
        }

        let nextPrayerTime = new Date()
        for (let i = 0; i < todayPrayerTimes.length; i++) {
            if (new Date() < todayPrayerTimes[i].time) {
                nextPrayerTime = todayPrayerTimes[i].time
                if (i === 0) {
                    setNextPrayer(todayPrayerTimes[i].prayer)
                    break
                }
                setNextPrayer(todayPrayerTimes[i].prayer)
                break
            }
        }
        updateRemainingTime(nextPrayerTime)
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
                // minWidth: "25rem",
            }}
        >
            <Title order={3}>{currentPrayer}</Title>
            <Text>
                <Mark color={userPrefs.colour} style={{ fontWeight: "600" }}>
                    {timeToNextP}
                </Mark>{" "}
                until <span style={{ fontWeight: "600" }}>{nextPrayer}</span>
            </Text>
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
                style={{
                    minWidth: "26em",
                    maxWidth: "35em",
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
                    style={{ marginLeft: "4px" }}
                >
                    <Refresh size="1rem" />
                </ActionIcon>
            </div>
        </Paper>
    )
}

export default PrayerTimes
