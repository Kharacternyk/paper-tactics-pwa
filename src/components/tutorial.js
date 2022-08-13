import {Section} from "./section"
import {GameMap} from "./game-map"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import MyIcon from "@mui/icons-material/Close"
import OpponentIcon from "@mui/icons-material/FiberManualRecordOutlined"

export const Tutorial = () => {
    return (
        <>
            <Paragraph>
                <strong>Paper Tactics</strong> is a turn-based pen-and-paper
                game played on a square grid. The goal of the game is to
                outlive your opponent—a player that cannot make a turn is
                defeated. A turn consists of moves. On your move, you must
                place either a unit or a wall. Units are placed only on empty
                cells, while walls are placed only on opponent's units. You
                cannot place anything on walls or your own units.
            </Paragraph>
            <Paragraph>
                Units and walls can only be placed on cells that are reachable.
                A cell is reachable by a certain player either if there is a
                player's unit that is adjacent to the cell or if there is a
                continuous chain of adjacent player's walls that connects the
                cell and a player's unit. Two cells are adjacent if they share
                a side or a corner.
            </Paragraph>
            <Paragraph>
                The sample below showcases how a game looks like.
                <MyIcon sx={{verticalAlign: "bottom"}} />
                and
                <OpponentIcon sx={{verticalAlign: "bottom"}} />
                are your and opponent's units, respectively.{" "}
                <MyIcon
                    sx={{
                        verticalAlign: "bottom",
                        bgcolor: "black",
                        color: "white",
                    }}
                />{" "}
                and{" "}
                <OpponentIcon
                    sx={{
                        verticalAlign: "bottom",
                        bgcolor: "black",
                        color: "white",
                    }}
                />{" "}
                are opponent's and your walls, respectively. Cells with a white
                background are reachable for you, while the ones with a grey
                background are not.
            </Paragraph>
            <Section>
                <GameMap
                    game={exampleGame}
                    icons={gameIcons}
                    gamePreferences={{size: 4}}
                />
            </Section>
            <Paragraph>
                In the <strong>«Play»</strong> tab, you can choose a game mode,
                the count of moves per turn, the size of the grid, and an icon
                for your units. The usual setup is a 10×10 grid with 3 moves
                per turn. You will then be connected with another player to
                play, but remember that the more unusual your preferences
                (except for the icon) are, the more unlikely it is that an
                opponent with the same preferences will be found. If there are
                no other players to play with, you can play against a bot.
                The{" "} <strong>«With visibility rules»</strong> game mode is
                a modification where players cannot see each other's units
                until they are reachable.
            </Paragraph>
            <Paragraph>
                This concludes the rules of the game. The source code of {" "}
                <Link href="https://github.com/Kharacternyk/paper-tactics-pwa">
                    this website
                </Link>{" "}
                and{" "}
                <Link href="https://github.com/Kharacternyk/paper-tactics">
                    the game server
                </Link>{" "}
                is open. In case you host your own game server, players on this
                website can connect to it by pasting its WebSocket URL into
                the <strong>«Server»</strong> field in
                the <strong>«Play»</strong> tab.
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

const gameIcons = {
    me: <MyIcon />,
    opponent: <OpponentIcon />,
}

const exampleGame = {
    me: {
        units: [
            [2, 1],
            [4, 1],
            [1, 1],
        ],
        walls: [
            [1, 2],
            [1, 3],
        ],
        reachable: [
            [2, 2],
            [1, 3],
            [2, 3],
            [1, 4],
            [2, 4],
            [1, 1],
            [3, 1],
            [3, 2],
            [4, 2],
        ],
    },
    opponent: {
        units: [
            [2, 4],
            [3, 4],
            [4, 4],
        ],
        walls: [
            [3, 2],
            [4, 3],
        ],
        reachable: [],
    },
}
