import {Section} from "./section"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"

export const GameInfo = ({game}) => {
    return (
        <Section>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">Opponent</TableCell>
                        <TableCell>
                            Someone in the {game.opponent.viewData.timeZone} time zone
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Game ID</TableCell>
                        <TableCell>{game.id}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}
