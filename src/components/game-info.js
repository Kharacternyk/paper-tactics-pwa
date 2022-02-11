import {BadgeAlert} from "./badge-alert"
import OpponentIcon from "@mui/icons-material/ConnectWithoutContact"
import IdIcon from "@mui/icons-material/Fingerprint"
import {match, T} from "babel-plugin-proposal-pattern-matching/match"

export const GameInfo = ({game}) => {
    const [region, city] = game.opponent.viewData.timeZone?.split("/")
    const opponent = match({region, city})(
        ({region = T.string, city = T.string}) => (
            `Someone near ${fix(city)} (${fix(region)})`
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
                {game.id}
            </BadgeAlert>
        </>
    )
}

const fix = string => string.replace("Kiev", "Kyiv").replace("_", " ")
