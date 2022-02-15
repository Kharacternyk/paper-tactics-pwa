import {BadgeAlert} from "./badge-alert"
import Link from "@mui/material/Link"
import ThanksIcon from "@mui/icons-material/SentimentSatisfiedAlt"

export const Footer = () => {
    return (
        <BadgeAlert
            subtitle="It will make my day!"
            color="primary"
            progress={100}
            icon={<ThanksIcon color="primary"/>}
        >
            You can
            {" "}<Link href="https://saythanks.io/to/Kharacternyk">say thanks</Link>{" "}
            to the
            {" "}<Link href="https://vinnich.uk">sole developer</Link>
        </BadgeAlert>
    )
}
