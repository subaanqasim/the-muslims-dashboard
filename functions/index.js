import fetch from "node-fetch"
import { region, https } from "firebase-functions"
import { Client } from "m3o"

export const fetchWeather = region("europe-west2").https.onCall(
    async (data) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,alerts&units=metric&appid=${process.env.OWM_API_KEY}`
        )

        if (res.status >= 400 && res.status < 600) {
            throw new https.HttpsError(
                "unavailable",
                `Unable to fetch weather. ${res.status}`
            )
        }

        const weatherData = await res.json()
        return weatherData
    }
)

const getHadith = new Client(process.env.M3O_API_KEY).sunnah

export const fetchHadith = region("europe-west2").https.onCall(async (data) => {
    const res = await getHadith.hadiths({
        collection: "bukhari",
        limit: 300,
        book: data.randNum,
    })

    const index = Math.floor(Math.random() * res.hadiths.length)

    const selected = res.hadiths[index]
    return selected
})
