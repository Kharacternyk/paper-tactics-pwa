import { GameMapCell } from "./game-map-cell"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"

export const GameMap = ({game, onTurnMade, icon}) => {
    const cellProps = Array(10).fill().map(() => {
        return Array(10).fill().map(() => ({}))
    })

    const setPropsForEach = (array, props, propsFactory) => {
        array.forEach(([x, y]) => {
            Object.assign(cellProps[y - 1][x - 1], props)
            if (propsFactory) {
                Object.assign(cellProps[y - 1][x - 1], propsFactory(x, y))
            }
        })
    }

    setPropsForEach(game.opponent.units, { unit: true, opponent: true })
    setPropsForEach(game.opponent.walls, { wall: true, opponent: true })
    setPropsForEach(game.opponent.reachable, { reachableByOpponent: true })
    setPropsForEach(game.me.units, { unit: true, mine: true })
    setPropsForEach(game.me.walls, { wall: true, mine: true })
    setPropsForEach(game.me.reachable, { reachableByMe: true }, (x, y) => ({
        onClick: () => onTurnMade(x, y)
    }))

    const renderedRows = cellProps.map((row, y) => {
        const renderedRow = row.map((props, x) => {
            return <GameMapCell {...props} icon={icon} key={x} />
        })

        return <TableRow key={y}>{renderedRow}</TableRow>
    })

    return (
        <Table >
            <TableBody>
                {renderedRows}
            </TableBody>
        </Table>
    )
}
