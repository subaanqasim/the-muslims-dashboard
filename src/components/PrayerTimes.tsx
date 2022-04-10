import React, { useContext } from "react"
import { Text } from "@mantine/core"
import { LocationContext } from "../LocationContext"

function PrayerTimes() {
    const { location, refreshLocation } = useContext(LocationContext)

    console.log(location)
    return (
        <>
            <Text>PrayerTimes</Text>
            <button onClick={() => refreshLocation()}>refresh</button>
        </>
    )
}

export default PrayerTimes
