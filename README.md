# The Muslim's Dashboard
> A new-tab chrome extension that provides everything a Muslim needs at a glance.

Perfectly up-to-date prayer times. Current and hourly weather forecast. Random Quran verses and Hadith on each new-tab. And many more features coming soon insha'Allah.

I've always hated having to go to my phone and use 3-4 apps, or navigate 3-4 websites whenever I want to check these details. Especially considering I spend most of my time at my laptop. So I put all the info in one place, at the shortcut of `ctrl/cmd + T`, with a clean UI, pleasurable UX and enriched with customisability.

Best of all, it's privacy-focused. No personal data is collected and all of your preferences are stored locally on your computer. All the code is here for you to snoop around with and make sure for yourself.

Look out for it on the Chrome Web Store soon.


## Testing and running locally
If you want to test out the extension so far, the best way is to run it locally.

### Clone/download the `local-build` branch of this repo. 
The only different thing about  `local-build` is that the 3rd party API calls are called from the front-end (and exposing API keys) rather than the APIs via Firebase Cloud Functions.

Then use `npm install` CLI command to install the necessary dependencies.

### Generate and use your own API keys
The external APIs used are by [OpenWeather](https://openweathermap.org/) for weather forecast data, and [M3O](https://m3o.com/) for Hadith. (Quran is stored locally.)

You can sign up to both of those platforms and generate your own API keys for free (both have extremely generous free usage limits).

Then in the root directory, create a `.env` folder and inside paste the following:
```
REACT_APP_WEATHER_API_KEY=XXX-YOUR-API-KEY-XXX

REACT_APP_M3O_API_TOKEN=XXX-YOUR-API-KEY-XXX
```
Where you replace the text after the `=` with the keys you generated, respectively.

### Running, compiling and building
The extension was made using Create React App which injects JavaScript into the HTML when the app is built. Due to security reasons, Chrome doesn't allow extensions to have JavaScript in HTML. This is easily navigated by adding one more line to your `.env` file:
```
INLINE_RUNTIME_CHUNK=false

```
Finally, you can use `npm start` to run the app on localhost and easily test out and make changes to the code in real-time.

If you want to use it as a proper extension, then use `npm run build` to create the bundled extension - this will create a `build` folder in the root directory.

In Chrome, head over to `chrome://extensions`, then ensure `developer mode` on the right is enabled.
Then, click `load unpacked` in the top left, and select the `build` folder that was created.

That's it! 😁
Make changes and run tests to your heart's desire. Do let me know if you have any feedback, recommendations, or noticed any bugs. 
