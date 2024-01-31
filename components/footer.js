import ContactIcon from "@mui/icons-material/Mail"
import Link from "@mui/material/Link"
import SvgIcon from "@mui/material/SvgIcon"
import DiscordLogo from "../images/logo-discord.svg"
import SponsorLogo from "../images/logo-sponsor.svg"
import {BadgeAlert} from "./badge-alert"

export const Footer = () => {
    const sponsorLogo = <SvgIcon inheritViewBox component={SponsorLogo} />
    const discordLogo = <SvgIcon inheritViewBox component={DiscordLogo} />

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
                subtitle="Bug reports, feature requests, or just thanks"
                color="primary"
                progress={100}
                icon={<ContactIcon color="primary" />}
            >
                You can{" "}
                <Link href="https://vinnich.uk">contact the developer</Link>
            </BadgeAlert>
            <BadgeAlert color="primary" progress={100} icon={sponsorLogo}>
                <div>
                    Paper Tactics is sponsored by{" "}
                    <Link href="https://depauth.com">DepAuth</Link>
                </div>
            </BadgeAlert>
        </>
    )
}
