import "@fontsource/roboto/latin.css"
import "@fontsource/ibm-plex-mono/latin-500-italic.css"
import ReactDOM from "react-dom"
import {App} from "./components/app"
import fs from "fs"
import path from "path"

const version = fs.readFileSync(
    path.join(__dirname, "/../.git/refs/heads/master"),
    "utf8"
)

console.log(`PWA Version: ${version}`)

const root = document.getElementById("root")

ReactDOM.render(<App />, root)
