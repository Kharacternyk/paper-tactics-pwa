import {Section} from "./section"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

export const Tutorial = () => {
    return (
        <>
            <Paragraph>
                <b>Paper Tactics</b> is a turn-based pen-and-paper game played
                on a square grid, usually 10×10. The goal of the game is to
                outlive your opponent, i.e., a player that cannot make a turn is
                considered defeated. Each turn consists of moves, usually three.
                On your move, you must place either a unit (looks like a funny
                icon, e.g., the X in the upper left corner of the logo) or a
                wall (looks like a filled opponent's icon, e.g., the circle in
                the lower left corner of the logo). Units are placed only on
                empty cells, while walls are placed only on opponent's units.
                You cannot place anything on walls or your own units.
            </Paragraph>
            <Paragraph>
                Units and walls can only be placed on cells that are reachable
                for you. A cell is considered reachable by a certain player
                either if there is a player's unit that is adjacent to the cell
                or if there is a continuous chain of adjacent player's walls
                that connects the cell and a player's unit. Two cells are
                considered adjacent if they share a side or a corner.
            </Paragraph>
            <Paragraph>
                In the <b>«Play»</b> tab, you can choose a game mode, the count
                of moves per turn, the size of the grid, and an icon for your
                units. You will then be connected with another player to play,
                but remember that the more unusual your preferences (except for
                the icon) are, the more unlikely it is that an opponent with the
                same preferences will be found. The{" "}
                <b>«With visibility rules»</b> game mode is a modification where
                players cannot see each other's units until they are reachable.
            </Paragraph>
            <Paragraph>
                This concludes the rules of the game. The source code of this
                website and the game server is open. You can browse it{" "}
                <Link href="https://github.com/Kharacternyk/paper-tactics-pwa">
                    here
                </Link>{" "}
                and{" "}
                <Link href="https://github.com/Kharacternyk/paper-tactics">
                    here
                </Link>{" "}
                respectively. In case you host your own game server, players on
                this website can connect to it by pasting its WebSocket URL into
                the <b>«Server»</b> field in the <b>«Play»</b> tab.
            </Paragraph>
        </>
    )
}

const Paragraph = ({children}) => (
    <Section>
        <Typography p={1} textAlign="justify">
            {children}
        </Typography>
    </Section>
)
