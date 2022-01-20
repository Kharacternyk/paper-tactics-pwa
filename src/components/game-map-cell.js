import styled from "styled-components"
import { BsXLg, BsFillSquareFill, BsCircle, BsApp, BsAppIndicator } from "react-icons/bs"

const Td = styled.td`
    text-align: center;
    vertical-align: middle;
    color: ${({mine, opponent, unit}) => {
        if (unit) {
            if (mine) {
                return "var(--bs-blue)"
            }
            if (opponent) {
                return "var(--bs-red)"
            }
        }
        return "var(--bs-light)"
    }};
    background-color: ${({mine, opponent, wall}) => {
        if (wall) {
            if (mine) {
                return "var(--bs-blue)"
            }
            if (opponent) {
                return "var(--bs-red)"
            }
        }
        return "var(--bs-light)"
    }} !important;
`

export const GameMapCell = (props) => {
    const icon = props.unit || props.wall ? <BsXLg /> : <BsCircle />
    
    return <Td {...props}>{icon}</Td>
}
