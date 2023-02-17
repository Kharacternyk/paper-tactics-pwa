import {manifest} from "@parcel/service-worker"
import {precacheAndRoute} from "workbox-precaching"
import {setDefaultHandler} from "workbox-routing"
import {NetworkFirst} from "workbox-strategies"

precacheAndRoute(
    manifest
        .filter(url => url.split(".").length > 2)
        .map(url => ({url, revision: null}))
)

setDefaultHandler(new NetworkFirst())

addEventListener("install", _ => skipWaiting())
