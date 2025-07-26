import ArchitectureIcon from "@mui/icons-material/ArchitectureOutlined"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import TurnIcon from "@mui/icons-material/Edit"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import ResetIcon from "@mui/icons-material/Replay"
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

const defaults = {
    apiUrl: servers[0].url,
    gameCode: "",
    gameSize: 10,
    turnCount: 3,
    isVisibilityApplied: false,
    trenchDensityPercent: 0,
    isDoubleBase: false,
    isWithRandomBases: false,
}

export default ({
    isEasterEggFound,
    highlightFX,
    animateFX,
    showTooltips,
    isQuickPlay,
}) => {
    const [awaiting, setAwaiting] = useState(false)
    const [apiUrl, setApiUrl] = useStorage("url", defaults.apiUrl)
    const [gameCode, setGameCode] = useStorage("game-code", defaults.gameCode)
    const iconIndex = useStorage("icon", defaults.iconIndex, localStorage)
    const gameSize = useStorage("game-size", defaults.gameSize)
    const turnCount = useStorage("turn-count", defaults.turnCount)
    const isVisibilityApplied = useStorage(
        "visibility",
        defaults.isVisibilityApplied
    )
    const trenchDensityPercent = useStorage(
        "trench-density",
        defaults.trenchDensityPercent
    )
    const isDoubleBase = useStorage("double-base", defaults.isDoubleBase)
    const isWithRandomBases = useStorage(
        "random-bases",
        defaults.isWithRandomBases
    )
    const isAgainstBot = useStorage("bot", false)
    const isReallyQuickPlay = isQuickPlay[0] && !isAgainstBot[0]

    return awaiting ? (
        <Game
            animateFX={animateFX}
            showTooltips={showTooltips}
            apiUrl={apiUrl}
            gamePreferences={
                isReallyQuickPlay
                    ? null
                    : {
                          size: gameSize[0],
                          turn_count: turnCount[0],
                          is_visibility_applied: isVisibilityApplied[0],
                          is_against_bot: isAgainstBot[0],
                          trench_density_percent: trenchDensityPercent[0],
                          is_double_base: isDoubleBase[0],
                          is_with_random_bases: isWithRandomBases[0],
                          code: gameCode,
                      }
            }
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
                state={isQuickPlay}
                values={[false, true]}
                labeler={value => (value ? "Quick play" : "Custom")}
                tooltip={
                    showTooltips
                        ? "Play with any settings or choose your own"
                        : null
                }
                isHidden={isAgainstBot[0]}
            />
            <ToggleSection
                state={isVisibilityApplied}
                values={[false, true]}
                labeler={value => (value ? "With visibility rules" : "Classic")}
                tooltip={
                    showTooltips ? "Conceal cells that are not reachable" : null
                }
                isHidden={isReallyQuickPlay}
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
                isHidden={isReallyQuickPlay}
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
                isHidden={isReallyQuickPlay}
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
                isHidden={isReallyQuickPlay}
            />
            <RatingSection
                state={turnCount}
                icon={<TurnIcon />}
                max={7}
                tooltip={showTooltips ? "Amount of moves per turn" : null}
                isHidden={isReallyQuickPlay}
            />
            <RatingSection
                state={gameSize}
                icon={<ArchitectureIcon />}
                min={3}
                max={12}
                tooltip={showTooltips ? "Map size" : null}
                isHidden={isReallyQuickPlay}
            />
            {isReallyQuickPlay ? null : (
                <Section>
                    <Button
                        variant="text"
                        disableElevation
                        onClick={() => {
                            setGameCode(defaults.gameCode)
                            gameSize[1](defaults.gameSize)
                            turnCount[1](defaults.turnCount)
                            isVisibilityApplied[1](defaults.isVisibilityApplied)
                            trenchDensityPercent[1](
                                defaults.trenchDensityPercent
                            )
                            isDoubleBase[1](defaults.isDoubleBase)
                            isWithRandomBases[1](defaults.isWithRandomBases)
                        }}
                        startIcon={<ResetIcon />}
                    >
                        Reset to default preferences
                    </Button>
                </Section>
            )}
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
