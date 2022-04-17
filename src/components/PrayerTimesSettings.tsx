import { Divider, Drawer, Group, Select, Text } from "@mantine/core"
import React, { forwardRef } from "react"
import {
    useChangeCalcMethodPref,
    useChangeMadhabPref,
    useUserPrefs,
} from "../context/UserPrefContext"

const madhabData = [
    {
        label: "Shafi'i, Maliki & Hanbali",
        value: "Shafi",
        description: "Earlier Asr timing",
    },

    {
        label: "Hanafi",
        value: "Hanafi",
        description: "Later Asr timing",
    },
]

const calcMethodData = [
    {
        label: "Moonsighting Committee",
        value: "Moonsighting Committee",
        description:
            "Uses standard 18° angles for Fajr and Isha in addition to seasonal adjustment values. This method automatically applies the 1/7 approximation rule for locations above 55° latitude. Recommended for North America and the UK.",
    },

    {
        label: "Muslim World League",
        value: "Muslim World League",
        description:
            "Standard Fajr time with an angle of 18°. Earlier Isha time with an angle of 17°.",
    },
    {
        label: "North America",
        value: "North America",
        description:
            "Also known as the ISNA method. Can be used for North America, but the moonsightingCommittee method is preferable. Gives later Fajr times and early Isha times with angles of 15°.",
    },
    {
        label: "Egypt",
        value: "Egypt",
        description:
            "Egyptian General Authority of Survey. Early Fajr time using an angle 19.5° and a slightly earlier Isha time using an angle of 17.5°.",
    },
    {
        label: "Karachi",
        value: "Karachi",
        description:
            "University of Islamic Sciences, Karachi. A generally applicable method that uses standard Fajr and Isha angles of 18°.",
    },
    {
        label: "Umm al-Qura",
        value: "Umm al-Qura",
        description:
            "Umm al-Qura University, Makkah. Uses a fixed interval of 90 minutes from maghrib to calculate Isha. And a slightly earlier Fajr time with an angle of 18.5°. Note: you should add a +30 minute custom adjustment for Isha during Ramadan.",
    },
    {
        label: "Dubai",
        value: "Dubai",
        description:
            "Used in the UAE. Slightly earlier Fajr time and slightly later Isha time with angles of 18.2° for Fajr and Isha in addition to 3 minute offsets for sunrise, Dhuhr, Asr, and Maghrib.",
    },
    {
        label: "Qatar",
        value: "Qatar",
        description:
            "Same Isha interval as Umm al-Qura but with the standard Fajr time using an angle of 18°.",
    },
    {
        label: "Kuwait",
        value: "Kuwait",
        description:
            "Standard Fajr time with an angle of 18°. Slightly earlier Isha time with an angle of 17.5°.",
    },
    {
        label: "Singapore",
        value: "Singapore",
        description:
            "Used in Singapore, Malaysia, and Indonesia. Early Fajr time with an angle of 20° and standard Isha time with an angle of 18°.",
    },
    {
        label: "Turkey",
        value: "Turkey",
        description:
            "An approximation of the Diyanet method used in Turkey. This approximation is less accurate outside the region of Turkey.",
    },
    {
        label: "Tehran",
        value: "Tehran",
        description:
            "Institute of Geophysics, University of Tehran. Early Isha time with an angle of 14°. Slightly later Fajr time with an angle of 17.7°. Calculates Maghrib based on the sun reaching an angle of 4.5° below the horizon.",
    },
]

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string
    description: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
)

interface IProps {
    open: boolean
    setOpen: any
}

function PrayerTimesSettings({ open, setOpen }: IProps) {
    const userPrefs = useUserPrefs()
    const changeMadhab = useChangeMadhabPref()
    const changeCalcMethod = useChangeCalcMethodPref()

    return (
        <Drawer
            zIndex={1000}
            size="xl"
            padding="xl"
            opened={open}
            onClose={() => setOpen(false)}
        >
            <Text>Prayer Times Settings 🕕</Text>
            <Text size="xs" color="dimmed">
                Customise your prayer times calculation variables.
            </Text>
            <Divider
                mt="xl"
                mb="sm"
                label="Core settings"
                labelPosition="center"
            />

            {/* Select option for madhab */}
            <Select
                mb="xl"
                label="Madhab for Asr timing"
                description="Select your preferred school of thought for calculating the time of Asr"
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={madhabData}
                value={userPrefs.prayerTimes.madhab}
                onChange={changeMadhab}
                maxDropdownHeight={400}
                withinPortal={false}
            />

            {/* Select options for calculation method */}
            <Select
                mb="xl"
                label="Calculation method"
                description="Different methods for calculating prayer times. Ideally pick one most suited for your region, or used by your local mosque."
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={calcMethodData}
                value={userPrefs.prayerTimes.calcMethod}
                onChange={changeCalcMethod}
                maxDropdownHeight={400}
                withinPortal={false}
            />
            <Divider my="xl" label="Advanced settings" labelPosition="center" />
            <Text size="xs" color="dimmed">
                Coming soon insha'Allah.
            </Text>
        </Drawer>
    )
}

export default PrayerTimesSettings
