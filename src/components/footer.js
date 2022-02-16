import {BadgeAlert} from "./badge-alert"
import Link from "@mui/material/Link"
import ContactIcon from "@mui/icons-material/Mail"

export const Footer = () => {
    return (
        <BadgeAlert
            subtitle="Bug reports, feature requests, or just thanks"
            color="primary"
            progress={100}
            icon={<ContactIcon color="primary"/>}
        >
            You can
            {" "}<Link href="https://vinnich.uk">contact the developer</Link>{" "}
        </BadgeAlert>
    )
}
