import {BadgeAlert} from "./badge-alert"
import OpponentIcon from "@mui/icons-material/ConnectWithoutContact"
import IdIcon from "@mui/icons-material/Fingerprint"
import {match, T} from "babel-plugin-proposal-pattern-matching/match"

export const GameFooter = ({game}) => {
    const [region, city] = fixTimeZone(game.opponent.viewData.timeZone)?.split("/")
    const opponent = match({region, city})(
        ({region = T.string, city = T.string}) => (
            `Someone in the ${city} (${region}) time zone`
        ),
        _ => "Someone in the world"
    )
    return (
        <>
            <BadgeAlert
                subtitle="Your opponent"
                color="secondary"
                progress={100}
                icon={<OpponentIcon color="secondary"/>}
            >
                {opponent}
            </BadgeAlert>
            <BadgeAlert
                subtitle="Game ID"
                color="primary"
                progress={100}
                icon={<IdIcon color="primary"/>}
            >
                {breakId(game.id)}
            </BadgeAlert>
        </>
    )
}

const fixTimeZone = timeZone => timeZone?.replace("Kiev", "Kyiv")?.replace("_", " ")
const breakId = id => (
    [[0, 8], [8, 16], [16, 24], [24, 32]]
    .map(([x, y]) => id.slice(x, y))
    .join(" ").toUpperCase()
)
