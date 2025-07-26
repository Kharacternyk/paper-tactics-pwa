import {useState} from "react"
import {BadgeAlert} from "./badge-alert"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import OpponentIcon from "@mui/icons-material/ConnectWithoutContact"
import IdIcon from "@mui/icons-material/Fingerprint"

export const GameFooter = ({game, gamePreferences}) => {
    const isBot = gamePreferences.isAgainstBot
    const [region, city] = fixTimeZone(game.opponent.viewData.timeZone)?.split(
        "/"
    ) ?? [null, null]
    const [botName, setBotName] = useState(
        botNames[Math.floor(Math.random() * botNames.length)]
    )
    const os = game.opponent.viewData.os

    let opponent = `Mr. ${botName}`
    if (!isBot) {
        if (region && city) {
            if (!os) {
                opponent = `Someone in the ${city} (${region}) time zone`
            } else {
                opponent = `Someone on ${os} in the ${city} (${region}) time zone`
            }
        } else {
            opponent = `Someone in the world`
        }
    }

    return (
        <>
            <BadgeAlert
                subtitle="Your opponent"
                color="secondary"
                progress={100}
                icon={
                    isBot ? (
                        <RobotIcon color="secondary" />
                    ) : (
                        <OpponentIcon color="secondary" />
                    )
                }
            >
                {opponent}
            </BadgeAlert>
            <BadgeAlert
                subtitle="Game ID"
                color="primary"
                progress={100}
                icon={<IdIcon color="primary" />}
            >
                {breakId(game.id)}
            </BadgeAlert>
        </>
    )
}

const fixTimeZone = timeZone =>
    timeZone?.replace("Kiev", "Kyiv")?.replace("_", " ")

const breakId = id =>
    [
        [0, 8],
        [8, 16],
        [16, 24],
        [24, 32],
    ]
        .map(([x, y]) => id.slice(x, y))
        .join(" ")
        .toUpperCase()

const botNames = [
    "Paperbot",
    "Pickle",
    "Pinky",
    "Pretzel",
    "Peppermint",
    "Tacticus",
    "Teapot",
    "Trench",
    "Tulip",
    "Thinker",
]
