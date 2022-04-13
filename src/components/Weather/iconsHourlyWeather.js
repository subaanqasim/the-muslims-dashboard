import {
    Cloud,
    CloudRain,
    CloudSnow,
    CloudStorm,
    Mist,
    MoonStars,
    Snowflake,
    Sun,
} from "tabler-icons-react"

const iconSize = "1.5rem"
const iconStyles = {
    margin: "0.25em 0em",
    strokeWidth: "1.25",
}

const hourlyWeatherIcons = [
    {
        id: "11d",
        icon: <CloudStorm size={iconSize} style={iconStyles} />,
    },
    {
        id: "09d",
        icon: <CloudSnow size={iconSize} style={iconStyles} />,
    },
    {
        id: "10d",
        icon: <CloudRain size={iconSize} style={iconStyles} />,
    },
    {
        id: "13d",
        icon: <Snowflake size={iconSize} style={iconStyles} />,
    },
    {
        id: "50d",
        icon: <Mist size={iconSize} style={iconStyles} />,
    },
    {
        id: "01d",
        icon: <Sun size={iconSize} style={iconStyles} />,
    },
    {
        id: "01n",
        icon: <MoonStars size={iconSize} style={iconStyles} />,
    },
    {
        id: "02d",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
    {
        id: "02n",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
    {
        id: "03d",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
    {
        id: "03n",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
    {
        id: "04d",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
    {
        id: "04n",
        icon: <Cloud size={iconSize} style={iconStyles} />,
    },
]

export default hourlyWeatherIcons
