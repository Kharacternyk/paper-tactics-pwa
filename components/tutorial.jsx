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
                <strong>Paper Tactics</strong> is a turn-based duel
                pen-and-paper game played on a square grid. The goal of the game
                is to outlive the opponent — a player that cannot make a turn is
                defeated. A turn consists of moves. Each move, either a unit is
                placed on an empty cell or a wall is placed on an opponent's
                unit. Players begin with a single unit in a corner of the grid,
                often called the <strong>«base»</strong>.
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
                can either choose to play with any settings (
                <strong>«Quick play»</strong>) or create your own game with
                custom settings (<strong>«Custom»</strong>). The «Custom» option
                offers plenty of ways to modify your game by adding game modes,
                neutral units, and more; all modifications are explained here
                and in their tooltips. Keep in mind that if you choose custom
                preferences, you will only be able to play with people who have
                «Quick play» enabled or have the exact same preferences. You can
                also change the appearance of your units (this is purely
                cosmetic). If you want to practice or there are no other players
                to play with, you can play against a bot.
            </Paragraph>
            <Paragraph>
                The <strong>«With visibility rules»</strong> game mode is a
                modification where players cannot see their opponent's units
                until they are reachable. The <strong>«Deathmatch»</strong> game
                mode increments the amount of moves per turn by 1 after a player
                has made their turn. For example, player A makes 1 move, then
                player B makes 2 moves, then player A makes 3 moves, and so on.{" "}
                <strong>Neutral units</strong> can be captured by any player as
                if they were opponent's units. Neutral units are always placed
                symmetrically. Please note that the neutral unit percentage
                defines the probability of a neutral unit to appear in a cell,
                not the overall amount of neutral units. The{" "}
                <strong>«Double base»</strong> option generates two bases per
                player instead of one. The <strong>«Random bases»</strong>{" "}
                option generates the bases in random cells on the edge of the
                grid rather than always in the corners. You can also change the{" "}
                <strong>size of the grid</strong> and the{" "}
                <strong>amount of moves per turn</strong>.
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
