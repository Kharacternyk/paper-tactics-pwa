import "@fontsource/ibm-plex-mono/latin-500-italic.css"
import "@fontsource/roboto/latin.css"
import fs from "fs"
import path from "path"
import ReactDOM from "react-dom"
import {App} from "./components/app"

const version = fs.readFileSync(
    path.join(__dirname, "/../.git/refs/heads/master"),
    "utf8"
)

console.log(`PWA Version: ${version}`)

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(new URL("worker.js", import.meta.url), {
        type: "module",
    })
}

const root = document.getElementById("root")

ReactDOM.render(<App />, root)
