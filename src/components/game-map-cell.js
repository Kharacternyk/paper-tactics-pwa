import styled from "styled-components"
import { BsXLg } from "react-icons/bs"

const Td = styled.td`
    & > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    color: ${({mine, opponent, unit, wall}) => {
        if (unit) {
            if (mine) {
                return "var(--bs-primary)"
            }
            if (opponent) {
                return "var(--bs-danger)"
            }
        }
        if (wall) {
            if (mine) {
                return "var(--bs-danger)"
            }
            if (opponent) {
                return "var(--bs-primary)"
            }
        }
        return "transparent"
    }};
    background: ${({wall, mine, opponent, reachableByMe, reachableByOpponent}) => {
        if (wall) {
            if (mine) {
                return "var(--bs-primary) !important"
            }
            if (opponent) {
                return "var(--bs-danger) !important"
            }
        }
        const createGradient = color => (
            `radial-gradient(
                rgba(var(--bs-${color}-rgb), 0.5),
                var(--bs-table-bg) 20%
            ) !important`
        )
        if (reachableByMe && reachableByOpponent) {
            return createGradient("secondary")
        }
        if (reachableByMe) {
            return createGradient("primary")
        }
        if (reachableByOpponent) {
            return createGradient("danger")
        }
    }};
    &:hover {
        color: ${({reachableByMe, unit}) => {
            if (reachableByMe && !unit) {
                return "rgba(var(--bs-primary-rgb), 0.5)"
            }
        }};
        background: ${({reachableByMe, unit}) => {
            if (reachableByMe && unit) {
                return "rgba(var(--bs-primary-rgb), 0.5) !important"
            }
        }};
    }
`

export const GameMapCell = (props) => {
    return <Td {...props}><div><BsXLg /></div></Td>
}
