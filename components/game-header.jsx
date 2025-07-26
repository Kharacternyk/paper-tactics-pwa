import MyTurnIcon from "@mui/icons-material/Edit"
import OpponentsTurnIcon from "@mui/icons-material/EditOff"
import WonIcon from "@mui/icons-material/Mood"
import LostIcon from "@mui/icons-material/MoodBad"
import Badge from "@mui/material/Badge"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import {useState} from "react"
import {BadgeAlert} from "./badge-alert"
import {Section} from "./section"

export const GameHeader = ({
    game: {
        me: {isDefeated: opponentWon, isGone: opponentWonByConceding},
        opponent: {isDefeated: opponentLost, isGone: opponentGone},
        myTurn,
        turnsLeft,
    },
    gamePreferences,
    onQuit,
    concede,
}) => {
    const [isConcedeDialogOpen, setIsConcedeDialogOpen] = useState(false)
    let color, message, IconComponent

    if (opponentWon) {
        color = "secondary"
        message = "You are defeated"
        IconComponent = LostIcon
    } else if (opponentWonByConceding) {
        color = "secondary"
        message = "You have conceded"
        IconComponent = LostIcon
    } else if (opponentLost) {
        color = "primary"
        message = "Your opponent is defeated!"
        IconComponent = WonIcon
    } else if (opponentGone) {
        color = "primary"
        message = "Your opponent has conceded!"
        IconComponent = WonIcon
    } else if (myTurn) {
        color = "primary"
        message = "Your turn"
        IconComponent = MyTurnIcon
    } else {
        color = "secondary"
        message = "Your opponent's turn"
        IconComponent = OpponentsTurnIcon
    }

    const iconProps = {color, sx: {transform: "scale(-1, 1)"}}
    const icon = <IconComponent {...iconProps} />

    let decoratedIcon, progress, topButton

    if (
        !opponentWon &&
        !opponentGone &&
        !opponentWonByConceding &&
        !opponentLost
    ) {
        decoratedIcon = (
            <Badge badgeContent={turnsLeft} color={color}>
                {icon}
            </Badge>
        )
        progress = (turnsLeft * 100) / gamePreferences.turnCount
        topButton = (
            <>
                <Button
                    color="secondary"
                    onClick={() => setIsConcedeDialogOpen(true)}
                >
                    Concede
                </Button>
                <Dialog
                    open={isConcedeDialogOpen}
                    onClose={() => setIsConcedeDialogOpen(false)}
                >
                    <DialogTitle>Do you want to concede?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setIsConcedeDialogOpen(false)}>
                            No
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => {
                                setIsConcedeDialogOpen(false)
                                concede()
                            }}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    } else {
        decoratedIcon = icon
        progress = 100
        topButton = (
            <Button variant="contained" disableElevation onClick={onQuit}>
                New game
            </Button>
        )
    }

    return (
        <>
            <Section>{topButton}</Section>
            <BadgeAlert icon={decoratedIcon} color={color} progress={progress}>
                {message}
            </BadgeAlert>
        </>
    )
}
