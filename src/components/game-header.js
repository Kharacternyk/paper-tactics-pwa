import {BadgeAlert} from "./badge-alert";
import {Section} from "./section";
import Button from "@mui/material/Button"
import Badge from "@mui/material/Badge"
import MyTurnIcon from "@mui/icons-material/Edit"
import OpponentsTurnIcon from "@mui/icons-material/EditOff"
import WonIcon from "@mui/icons-material/Mood"
import LostIcon from "@mui/icons-material/MoodBad"
import match from 'babel-plugin-proposal-pattern-matching/match'

export const GameHeader = ({
    game: {
        me: {
            isDefeated: opponentWon
        },
        opponent: {
            isDefeated: opponentLost,
            isGone: opponentGone
        },
        myTurn,
        turnsLeft
    },
    gamePreferences,
    onQuit
}) => {
    const [color, message] = match({opponentWon, opponentLost, opponentGone, myTurn})(
        ({opponentWon = true}) => ["secondary", "You are defeated!"],
        ({opponentLost = true}) => ["primary", "Your opponent is defeated!"],
        ({opponentGone = true}) => ["primary", "Your opponent has conceded!"],
        ({myTurn = true}) => ["primary", "Your turn"],
        _ => ["secondary", "Your opponent's turn"]
    )

    const iconProps = {color, sx: {transform: "scale(-1, 1)"}}

    const icon = match({opponentWon, opponentLost, opponentGone, myTurn})(
        ({opponentWon = true}) => <LostIcon {...iconProps} />,
        ({opponentLost = true}) => <WonIcon {...iconProps} />,
        ({opponentGone = true}) => <WonIcon {...iconProps} />,
        ({myTurn = true}) => <MyTurnIcon {...iconProps} />,
        _ => <OpponentsTurnIcon {...iconProps} />,
    )

    const [decoratedIcon, progress, topButton] = match({
        opponentWon, opponentLost, opponentGone
    })(
        ({opponentWon = false, opponentGone = false, opponentLost = false}) => [
            <Badge badgeContent={turnsLeft} color={color}>
                {icon}
            </Badge>,
            turnsLeft * 100 / gamePreferences.turn_count,
            <Button
                color="secondary"
                onClick={onQuit}
            >
                Concede
            </Button>
        ],
        _ => [
            icon,
            100,
            <Button
                variant="contained"
                disableElevation
                onClick={onQuit}
            >
                New game
            </Button>
        ]
    )

    return (
        <>
            <Section>
                {topButton}
            </Section>
            <BadgeAlert icon={decoratedIcon} color={color} progress={progress}>
                {message}
            </BadgeAlert>
        </>
    )
}
