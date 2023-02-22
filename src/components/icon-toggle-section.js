import {icons} from "../icons"
import {GameUnitIcon} from "./game-unit-icon"
import {ToggleSection} from "./toggle-section"

export const IconToggleSection = ({iconIndexState, isEasterEggFound}) => {
    const rows = []
    const length = isEasterEggFound ? icons.length : icons.length - 1
    for (var i = 0; i * 10 < length; ++i) {
        const values = []
        for (var k = 0; k < 10 && i * 10 + k < length; ++k) {
            values.push(i * 10 + k)
        }
        rows.push(
            <ToggleSection
                key={i}
                state={iconIndexState}
                values={values}
                labeler={value => <GameUnitIcon>{icons[value]}</GameUnitIcon>}
            />
        )
    }
    return <>{rows}</>
}
