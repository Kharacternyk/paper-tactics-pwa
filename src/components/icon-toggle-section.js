import AnchorIcon from "@mui/icons-material/AnchorOutlined"
import StarsIcon from "@mui/icons-material/AutoAwesomeOutlined"
import BakeryIcon from "@mui/icons-material/BakeryDiningOutlined"
import Balance from "@mui/icons-material/BalanceOutlined"
import BeachIcon from "@mui/icons-material/BeachAccessOutlined"
import Blender from "@mui/icons-material/BlenderOutlined"
import BubbleChart from "@mui/icons-material/BubbleChartOutlined"
import Casino from "@mui/icons-material/CasinoOutlined"
import CelebrationIcon from "@mui/icons-material/CelebrationOutlined"
import CrossIcon from "@mui/icons-material/Close"
import Diamond from "@mui/icons-material/DiamondOutlined"
import Cup from "@mui/icons-material/EmojiEventsOutlined"
import BulbIcon from "@mui/icons-material/EmojiObjectsOutlined"
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined"
import CircleIcon from "@mui/icons-material/FiberManualRecordOutlined"
import FlagIcon from "@mui/icons-material/FlagOutlined"
import StarIcon from "@mui/icons-material/GradeOutlined"
import HealthAndSafety from "@mui/icons-material/HealthAndSafetyOutlined"
import HiveIcon from "@mui/icons-material/HiveOutlined"
import CartIcon from "@mui/icons-material/LocalGroceryStoreOutlined"
import LunchDining from "@mui/icons-material/LunchDiningOutlined"
import MusicIcon from "@mui/icons-material/MusicNoteOutlined"
import MoonIcon from "@mui/icons-material/NightsStayOutlined"
import BellIcon from "@mui/icons-material/NotificationsNoneOutlined"
import RocketIcon from "@mui/icons-material/RocketLaunchOutlined"
import Science from "@mui/icons-material/ScienceOutlined"
import BeerIcon from "@mui/icons-material/SportsBarOutlined"
import FootballIcon from "@mui/icons-material/SportsFootballOutlined"
import HashIcon from "@mui/icons-material/TagOutlined"
import Token from "@mui/icons-material/TokenOutlined"
import Traffic from "@mui/icons-material/TrafficOutlined"
import {GameUnitIcon} from "./game-unit-icon"
import {ToggleSection} from "./toggle-section"

export const icons = [
    <CrossIcon />,
    <CircleIcon />,
    <HashIcon />,
    <FlagIcon />,
    <StarsIcon />,
    <RocketIcon />,
    <BeerIcon />,
    <MusicIcon />,
    <BakeryIcon />,
    <BulbIcon />,
    <HeartIcon />,
    <StarIcon />,
    <HiveIcon />,
    <CartIcon />,
    <MoonIcon />,
    <FootballIcon />,
    <AnchorIcon />,
    <CelebrationIcon />,
    <BellIcon />,
    <BeachIcon />,
    <Diamond />,
    <Token />,
    <BubbleChart />,
    <Blender />,
    <Casino />,
    <Science />,
    <LunchDining />,
    <HealthAndSafety />,
    <Traffic />,
    <Balance />,
    <Cup />,
]

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
