import "@fontsource/ibm-plex-mono/latin-500-italic.css"
import "@fontsource/roboto/latin.css"
import {createRoot} from "react-dom/client"
import {App} from "./components/app"

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(new URL("worker.js", import.meta.url), {
        type: "module",
    })
}

const root = createRoot(document.getElementById("root"))

root.render(<App />)
