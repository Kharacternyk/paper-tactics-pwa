import {BadgeAlert} from "./badge-alert"
import Link from "@mui/material/Link"
import GithubIcon from "@mui/icons-material/GitHub"

export const Footer = () => {
    return (
        <BadgeAlert
            subtitle={<>
                {"Check it out "}
                <Link href="https://github.com/Kharacternyk/paper-tactics">
                    on GitHub
                </Link>
            </>}
            color="primary"
            progress={100}
            icon={<GithubIcon color="primary"/>}
        >
            This website is open source
        </BadgeAlert>
    )
}
