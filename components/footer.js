import ContactIcon from "@mui/icons-material/Mail"
import Link from "@mui/material/Link"
import SvgIcon from "@mui/material/SvgIcon"
import DepAuthLogo from "../images/depauth.svg"
import DiscordLogo from "../images/discord.svg"
import GitHubLogo from "../images/github.svg"
import {BadgeAlert} from "./badge-alert"

export const Footer = () => {
    const depauthLogo = <SvgIcon inheritViewBox component={DepAuthLogo} />
    const discordLogo = <SvgIcon inheritViewBox component={DiscordLogo} />
    const githubLogo = <SvgIcon inheritViewBox component={GitHubLogo} />

    return (
        <>
            <BadgeAlert color="primary" progress={100} icon={discordLogo}>
                <div>
                    You can{" "}
                    <Link href="https://discord.gg/c6X7tDTKSX">
                        discuss the game on Discord
                    </Link>
                </div>
            </BadgeAlert>
            <BadgeAlert
                color="primary"
                progress={100}
                icon={<ContactIcon color="primary" />}
            >
                <div>
                    You can contact{" "}
                    <Link href="https://vinnich.uk">the developer</Link>
                </div>
            </BadgeAlert>
            <BadgeAlert color="primary" progress={100} icon={githubLogo}>
                <div>
                    <Link href="https://github.com/Kharacternyk/paper-tactics">
                        The game server
                    </Link>{" "}
                    and{" "}
                    <Link href="https://github.com/Kharacternyk/paper-tactics-pwa">
                        this website
                    </Link>{" "}
                    are open source
                </div>
            </BadgeAlert>
            <BadgeAlert color="primary" progress={100} icon={depauthLogo}>
                <div>
                    Paper Tactics is sponsored by{" "}
                    <Link href="https://depauth.com">DepAuth</Link>
                </div>
            </BadgeAlert>
        </>
    )
}
