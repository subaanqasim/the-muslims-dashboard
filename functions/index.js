const fetch = require("node-fetch")
const functions = require("firebase-functions")

exports.fetchWeather = functions
    .region("europe-west2")
    .https.onCall(async (data) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,alerts&units=metric&appid=${process.env.OWM_API_KEY}`
        )

        if (res.status >= 400 && res.status < 600) {
            throw new functions.https.HttpsError(
                "unavailable",
                `Unable to fetch weather. ${res.status}`
            )
        }

        const weatherData = await res.json()
        return weatherData
    })
