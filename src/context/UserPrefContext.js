import React, { createContext, useContext } from "react"
import { useLocalStorage } from "@mantine/hooks"

const UserPrefsContext = createContext(null)

const colourOptions = [
    { hex: "#495057", id: "gray" },
    { hex: "#f03e3e", id: "red" },
    { hex: "#d6336c", id: "pink" },
    { hex: "#ae3ec9", id: "grape" },
    { hex: "#7048e8", id: "violet" },
    { hex: "#4263eb", id: "indigo" },
    { hex: "#1c7fd6", id: "blue" },
    { hex: "#1098ad", id: "cyan" },
    { hex: "#0ca678", id: "teal" },
    { hex: "#37b34e", id: "green" },
    { hex: "#74b816", id: "lime" },
    { hex: "#f59f00", id: "yellow" },
    { hex: "#f76707", id: "orange" },
]

// Context provider
function UserPrefsContextProvider(props) {
    // user prefs state
    const [userPrefs, setUserPrefs] = useLocalStorage({
        key: "tmdPrefs",
        defaultValue: {
            colour: "cyan",
            hour12: false,
            activeRemindersTab: 1,
            prayerTimes: {
                madhab: "Shafi",
                calcMethod: "Moonsighting Committee",
            },
        },
    })

    // change colour pref function
    const changeColour = (colourHex) => {
        for (const colour of colourOptions) {
            if (colourHex === colour.hex) {
                setUserPrefs((prevPrefs) => ({
                    ...prevPrefs,
                    colour: colour.id,
                }))
                break
            }
        }
    }

    // change time format pref function
    const changeHour12 = (bool) => {
        setUserPrefs((prevPrefs) => ({ ...prevPrefs, hour12: bool }))
    }

    // change reminders tab option
    const changeRemTab = (tabNum) => {
        setUserPrefs((prevPrefs) => ({
            ...prevPrefs,
            activeRemindersTab: tabNum,
        }))
    }

    // change prayerTimes madhab
    const changeMadhab = (option) => {
        setUserPrefs((prevPrefs) => ({
            ...prevPrefs,
            prayerTimes: {
                ...prevPrefs.prayerTimes,
                madhab: option,
            },
        }))
    }

    // change prayerTimes madhab
    const changeCalcMethod = (option) => {
        setUserPrefs((prevPrefs) => ({
            ...prevPrefs,
            prayerTimes: {
                ...prevPrefs.prayerTimes,
                calcMethod: option,
            },
        }))
    }

    return (
        <UserPrefsContext.Provider
            value={{
                userPrefs,
                changeColour,
                changeHour12,
                changeRemTab,
                changeMadhab,
                changeCalcMethod,
            }}
        >
            {props.children}
        </UserPrefsContext.Provider>
    )
}

// hook to access userPrefs state
const useUserPrefs = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useUserPrefs must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.userPrefs
    }
}

// hook to change colour pref
const useChangeColourPref = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useChangeColourPref must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.changeColour
    }
}

// hook to change time format pref
const useChangeHour12Pref = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useChangeHour12Pref must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.changeHour12
    }
}

// hook to change current tab pref
const useChangeRemTabPref = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useChangeRemTabPref must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.changeRemTab
    }
}

// hook to change madhab pref
const useChangeMadhabPref = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useChangeMadhabPref must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.changeMadhab
    }
}

// hook to change calc method pref
const useChangeCalcMethodPref = () => {
    const context = useContext(UserPrefsContext)

    if (context === undefined || context === null) {
        throw new Error(
            "useChangeCalcMethodPref must be used inside UserPrefsContextProvider"
        )
    } else {
        return context.changeCalcMethod
    }
}

export {
    UserPrefsContextProvider,
    useUserPrefs,
    useChangeColourPref,
    useChangeHour12Pref,
    useChangeRemTabPref,
    useChangeMadhabPref,
    useChangeCalcMethodPref,
}
