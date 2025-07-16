import ArchitectureIcon from "@mui/icons-material/ArchitectureOutlined"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import TurnIcon from "@mui/icons-material/Edit"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import {useState} from "react"
import {useStorage} from "../hooks/use-storage"
import {Game} from "./game"
import {IconToggleSection} from "./icon-toggle-section"
import {RatingSection} from "./rating-section"
import {Section} from "./section"
import {ToggleSection} from "./toggle-section"

export default ({isEasterEggFound, highlightFX, animateFX, showTooltips}) => {
    const [awaiting, setAwaiting] = useState(false)
    const [apiUrl, setApiUrl] = useStorage("url", servers[0].url)
    const [gameCode, setGameCode] = useStorage("game-code", "")
    const iconIndex = useStorage("icon", 0, localStorage)
    const gameSize = useStorage("game-size", 10)
    const turnCount = useStorage("turn-count", 3)
    const isVisibilityApplied = useStorage("visibility", false)
    const trenchDensityPercent = useStorage("trench-density", 0)
    const isDoubleBase = useStorage("double-base", false)
    const isWithRandomBases = useStorage("random-bases", false)
    const isAgainstBot = useStorage("bot", false)

    return awaiting ? (
        <Game
            animateFX={animateFX}
            showTooltips={showTooltips}
            apiUrl={apiUrl}
            gamePreferences={{
                size: gameSize[0],
                turn_count: turnCount[0],
                is_visibility_applied: isVisibilityApplied[0],
                is_against_bot: isAgainstBot[0],
                trench_density_percent: trenchDensityPercent[0],
                is_double_base: isDoubleBase[0],
                is_with_random_bases: isWithRandomBases[0],
                code: gameCode,
            }}
            iconIndex={iconIndex[0]}
            onQuit={() => setAwaiting(false)}
        />
    ) : (
        <>
            <Section>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => setAwaiting(true)}
                    startIcon={isAgainstBot[0] ? <RobotIcon /> : <PeopleIcon />}
                >
                    Play against {isAgainstBot[0] ? "bot" : "other people"}
                </Button>
            </Section>
            <ToggleSection
                state={isAgainstBot}
                values={[false, true]}
                labeler={value =>
                    value ? "Against bot" : "Against other people"
                }
            />
            <ToggleSection
                state={isVisibilityApplied}
                values={[false, true]}
                labeler={value => (value ? "With visibility rules" : "Classic")}
                tooltip={
                    showTooltips ? "Conceal cells that are not reachable" : null
                }
            />
            <ToggleSection
                state={trenchDensityPercent}
                values={[0, 15, 25, 35]}
                labeler={value => (value ? `${value}%` : "No neutral units")}
                tooltip={
                    showTooltips
                        ? "Generate neutral units that can be captured by any player"
                        : null
                }
            />
            <ToggleSection
                state={isDoubleBase}
                values={[false, true]}
                labeler={value => (value ? "Double base" : "Single base")}
                tooltip={
                    showTooltips
                        ? "Generate two bases per player instead of one"
                        : null
                }
            />
            <ToggleSection
                state={isWithRandomBases}
                values={[false, true]}
                labeler={value => (value ? "Random bases" : "Corner bases")}
                tooltip={
                    showTooltips
                        ? "Generate the bases on random edge cells"
                        : null
                }
            />
            <RatingSection
                state={turnCount}
                icon={<TurnIcon />}
                max={7}
                tooltip={showTooltips ? "Amount of moves per turn" : null}
            />
            <RatingSection
                state={gameSize}
                icon={<ArchitectureIcon />}
                min={3}
                max={12}
                tooltip={showTooltips ? "Map size" : null}
            />
            <IconToggleSection
                highlightFX={highlightFX}
                showTooltips={showTooltips}
                iconIndexState={iconIndex}
                isEasterEggFound={isEasterEggFound}
            />
            <Section>
                <TextField
                    label="Game code"
                    variant="filled"
                    value={gameCode}
                    onChange={event => setGameCode(event.target.value)}
                />
            </Section>
            <Section>
                <Autocomplete
                    freeSolo
                    options={servers}
                    defaultValue={
                        servers.find(server => server.url == apiUrl)?.label ??
                        servers[0].label
                    }
                    onInputChange={(_, value) => {
                        const server = servers.find(
                            server => server.label == value
                        )
                        setApiUrl(server?.url ?? value)
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Server"
                            variant="filled"
                        />
                    )}
                />
            </Section>
        </>
    )
}

const servers = [
    {
        label: "Frankfurt",
        url: "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling",
    },
    {
        label: "Localhost",
        url: "ws://localhost:8001",
    },
]
