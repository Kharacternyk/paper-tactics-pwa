import NoInternetIcon from "@mui/icons-material/CloudOffOutlined"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import Button from "@mui/material/Button"
import Bowser from "bowser"
import camelcaseKeys from "camelcase-keys"
import {useEffect, useMemo, useState} from "react"
import useWebSocket from "react-use-websocket"
import {useStorage} from "../hooks/use-storage"
import {icons} from "../icons"
import {BadgeAlert} from "./badge-alert"
import {GameFooter} from "./game-footer"
import {GameHeader} from "./game-header"
import {GameMap} from "./game-map"
import {Section} from "./section"
import {ToggleSection} from "./toggle-section"

export const Game = ({
    apiUrl,
    gamePreferences,
    iconIndex,
    onQuit,
    animateFX,
}) => {
    const [game, setGame] = useState()
    const agent = useMemo(
        () => Bowser.getParser(window.navigator.userAgent),
        []
    )
    const notificationsSupported = agent.getPlatformType(true) == "desktop"
    const notificationsEnabled = notificationsSupported
        ? useStorage("notifications-enabled", false)
        : [false, null]

    const concede = () =>
        sendJsonMessage({
            action: "concede",
            gameId: game.id,
        })

    // It is important to have this cleanup fired before the websocket is closed
    useEffect(() => {
        if (game) {
            window.addEventListener("beforeunload", concede)
            return () => {
                window.removeEventListener("beforeunload", concede)
                concede()
            }
        }
    }, [game?.id])

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(apiUrl)

    useEffect(
        () => setGame(camelcaseKeys(lastJsonMessage, {deep: true})),
        [lastJsonMessage]
    )
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const os = agent.getOSName()

        sendJsonMessage({
            action: "create-game",
            view_data: {iconIndex: String(iconIndex), timeZone, os},
            preferences: gamePreferences,
        })
    }, [])
    useEffect(() => {
        if (
            game &&
            (!gamePreferences || !gamePreferences.is_against_bot) &&
            notificationsEnabled[0]
        ) {
            new Notification("An opponent has been found!", {
                icon: new URL("../images/logo-192.png", import.meta.url),
            })
        }
    }, [!!game])

    if (game) {
        const onTurnMade = (x, y) => {
            sendJsonMessage({
                action: "make-turn",
                gameId: game.id,
                cell: [x, y],
            })
        }

        let opponentIconIndex = Number(game.opponent.viewData.iconIndex ?? 0)

        if (!(opponentIconIndex >= 0 && opponentIconIndex < icons.length)) {
            opponentIconIndex = 0
        }

        const gameIcons = {
            me: icons[iconIndex],
            opponent:
                opponentIconIndex == 0 && iconIndex == 0
                    ? icons[1]
                    : opponentIconIndex == iconIndex
                      ? icons[0]
                      : icons[opponentIconIndex],
        }

        return (
            <>
                <GameHeader
                    game={game}
                    gamePreferences={game.preferences}
                    onQuit={onQuit}
                    concede={concede}
                />
                <Section>
                    <GameMap
                        animateFX={animateFX}
                        game={game}
                        onTurnMade={onTurnMade}
                        icons={gameIcons}
                        gamePreferences={game.preferences}
                    />
                </Section>
                <GameFooter game={game} gamePreferences={game.preferences} />
            </>
        )
    }

    const isWebSocketDead = readyState === -1 || readyState === 3
    const isAgainstBot = gamePreferences?.is_against_bot
    const color = isWebSocketDead ? "secondary" : "primary"
    const progress = isWebSocketDead ? 100 : undefined
    const icon = isWebSocketDead ? (
        <NoInternetIcon color="secondary" />
    ) : isAgainstBot ? (
        <RobotIcon color="primary" />
    ) : (
        <PeopleIcon color="primary" />
    )
    const message = isWebSocketDead
        ? "Cannot connect to the server"
        : isAgainstBot
          ? "Powering on the bot…"
          : "Waiting for someone else to connect…"

    return (
        <>
            <Section>
                <Button onClick={onQuit}>Cancel</Button>
            </Section>
            <BadgeAlert color={color} icon={icon} progress={progress}>
                {message}
            </BadgeAlert>
            {notificationsSupported ? (
                <ToggleSection
                    state={notificationsEnabled}
                    values={[false, true]}
                    labeler={value =>
                        value ? "Notify me" : "No notifications"
                    }
                    callback={async value =>
                        !value ||
                        Notification.permission == "granted" ||
                        (await Notification.requestPermission()) == "granted"
                    }
                />
            ) : null}
        </>
    )
}
