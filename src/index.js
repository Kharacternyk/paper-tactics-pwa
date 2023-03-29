import "@fontsource/ibm-plex-mono/latin-500-italic.css"
import "@fontsource/roboto/latin.css"
import ReactDOM from "react-dom"
import {App} from "./components/app"

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(new URL("worker.js", import.meta.url), {
        type: "module",
    })
}

const root = document.getElementById("root")

ReactDOM.render(<App />, root)
