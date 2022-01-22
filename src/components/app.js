import { useState } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ eventKey, setEventKey ] = useState("how-to")

    return (
        <Stack gap={3}>
            <Navbar bg="success" variant="dark">
                <Container>
                    <Navbar.Brand>Paper Tactics</Navbar.Brand>
                    <Nav defaultActiveKey="how-to" onSelect={setEventKey}>
                        <Nav.Link eventKey="how-to">How to play</Nav.Link>
                        <Nav.Link eventKey="new-pvp">Play vs other people</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {eventKey === "how-to" && <Alert variant="success"> Coming soon… </Alert>}
            {eventKey === "new-pvp" && <Game apiUrl={apiUrl} />}
        </Stack>
    )
}
