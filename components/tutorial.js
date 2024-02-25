import MyIcon from "@mui/icons-material/Close"
import OpponentIcon from "@mui/icons-material/FiberManualRecordOutlined"
import Typography from "@mui/material/Typography"
import {GameMap} from "./game-map"
import {Section} from "./section"

export default ({findEasterEgg, isEasterEggFound}) => {
    const exampleGame = {
        myTurn: true,
        me: {
            units: [
                [2, 1],
                [4, 1],
                [1, 1],
            ],
            walls: [
                [1, 2],
                [1, 3],
            ].concat(isEasterEggFound ? [[2, 4]] : []),
            reachable: [
                [2, 2],
                [1, 3],
                [2, 3],
                [1, 4],
                [1, 1],
                [3, 1],
                [3, 2],
                [4, 2],
            ].concat(
                isEasterEggFound
                    ? [
                          [3, 3],
                          [3, 4],
                      ]
                    : [[2, 4]]
            ),
        },
        opponent: {
            units: [
                [3, 4],
                [4, 4],
            ].concat(isEasterEggFound ? [] : [[2, 4]]),
            walls: [
                [3, 2],
                [4, 3],
            ],
            reachable: [],
        },
        trenches: [],
    }

    return (
        <>
            <Paragraph>
                <strong>Paper Tactics</strong> is a turn-based pen-and-paper
                game played on a grid. The goal of the game is to outlive the
                opponent—a player that cannot make a turn is defeated. A turn
                consists of moves. Each move, either a unit is placed on an
                empty cell or a wall is placed on an opponent's unit. Players
                begin with a single unit in a corner of the grid.
            </Paragraph>
            <Paragraph>
                Units and walls can only be placed on cells that are reachable.
                A cell is reachable for a player if there is a player's unit
                that is adjacent to the cell or if there is a continuous chain
                of player's adjacent walls that connects the cell and a player's
                unit. Cells are adjacent if they share a side or a corner.
            </Paragraph>
            <Paragraph>
                A sample game is depicted below.
                <MyIcon sx={{verticalAlign: "bottom"}} />
                and
                <OpponentIcon sx={{verticalAlign: "bottom"}} />
                are your and your opponent's units, respectively.{" "}
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
                are your opponent's and your walls, respectively. White cells
                are reachable for you. Gray cells are not reachable.
            </Paragraph>
            <Section>
                <GameMap
                    game={exampleGame}
                    icons={gameIcons}
                    gamePreferences={{size: 4}}
                    onTurnMade={(x, y) => {
                        if (x == 2 && y == 4) {
                            findEasterEgg()
                        }
                    }}
                />
            </Section>
            <Paragraph>
                In the <strong>«Play»</strong> tab at the top of this page, you
                can choose a game mode, a number of moves per turn, a size of
                the grid, and an icon for your units. The usual setup is a 10×10
                grid with 3 moves per turn. You will then be connected with
                another player. You cannot be connected with a player that has
                different preferences (except for the icon). If there are no
                other players to play with, you can play against a bot.
            </Paragraph>
            <Paragraph>
                The <strong>«With visibility rules»</strong> game mode is a
                modification where players cannot see units until they are
                reachable. Neutral units can be added to the grid if you choose
                so. Anybody can place walls on neutral units as if they were
                opponent's units. Neutral units are always placed symmetrically.
                Please note that the neutral unit percentage defines the
                probability of a neutral unit to appear in a cell, not the
                overall amount of neutral units.
            </Paragraph>
            <Paragraph>
                If you specify a <strong>«Game code»</strong>, you can only be
                connected with someone who has entered the same game code. In
                case you host your own game server, players on this website can
                connect to it by pasting its WebSocket URL into the{" "}
                <strong>«Server»</strong> field in the <strong>«Play»</strong>{" "}
                tab.
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
