import {useEffect, useState} from "react"
import {icons} from "./settings"
import {GameMap} from "./game-map"
import {TurnIndicator} from "./turn-indicator"
import {GameInfo} from "./game-info"
import {BadgeAlert} from "./badge-alert"
import WaitIcon from "@mui/icons-material/ConnectWithoutContact"
import useWebSocket from "react-use-websocket"

export const Game = ({apiUrl, iconIndex}) => {
    const { sendJsonMessage, lastJsonMessage: game } = useWebSocket(apiUrl)

    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        sendJsonMessage({
            action: "create-game",
            viewData: {iconIndex: String(iconIndex), timeZone}
        })
    }, [])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    const gameIcons = game && {
        me: icons[iconIndex],
        opponent: icons[game.opponent.viewData.iconIndex] || icons[0]
    }

    return game ? (
        <>
            <TurnIndicator game={game} />
            <GameMap game={game} onTurnMade={onTurnMade} icons={gameIcons} />
            <GameInfo game={game} />
        </>
    ) : (
        <BadgeAlert icon={<WaitIcon color="primary" />} color="primary">
            Waiting for someone else to connect…
        </BadgeAlert>
    )
}
