import {BadgeAlert} from "./badge-alert"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import OpponentIcon from "@mui/icons-material/ConnectWithoutContact"
import IdIcon from "@mui/icons-material/Fingerprint"
import {match, T} from "babel-plugin-proposal-pattern-matching/match"

export const GameFooter = ({game, gamePreferences}) => {
    const isBot = gamePreferences.is_against_bot
    const [region, city] = fixTimeZone(game.opponent.viewData.timeZone)?.split(
        "/"
    ) ?? [null, null]
    const os = game.opponent.viewData.os

    const opponent = match({region, city, os, isBot})(
        ({isBot = true}) => "Mr. Tacticus",
        ({region = T.string, city = T.string, os = T.nullish}) =>
            `Someone in the ${city} (${region}) time zone`,
        ({region = T.string, city = T.string}) =>
            `Someone on ${os} in the ${city} (${region}) time zone`,
        _ => "Someone in the world"
    )

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
