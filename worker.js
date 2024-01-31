import {setDefaultHandler} from "workbox-routing"
import {NetworkFirst} from "workbox-strategies"

setDefaultHandler(new NetworkFirst())

addEventListener("install", _ => skipWaiting())
