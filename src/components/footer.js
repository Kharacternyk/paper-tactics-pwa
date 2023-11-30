import ContactIcon from "@mui/icons-material/Mail"
import Link from "@mui/material/Link"
import SvgIcon from "@mui/material/SvgIcon"
import SponsorLogo from "../logo-sponsor.svg"
import {BadgeAlert} from "./badge-alert"

export const Footer = () => {
    const sponsorLogo = <SvgIcon inheritViewBox component={SponsorLogo} />

    return (
        <>
            <BadgeAlert color="primary" progress={100} icon={sponsorLogo}>
                Paper Tactics is sponsored by{" "}
                <Link href="https://depauth.com">DepAuth</Link>
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
        </>
    )
}
