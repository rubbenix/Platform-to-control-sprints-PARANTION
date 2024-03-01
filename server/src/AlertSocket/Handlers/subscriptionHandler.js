import {subscribedSockets, wsTokenMap} from "../websocket.js";
import {sendBlockers} from "./blockersHandler.js";


export async function handleSubscription(parsedData, ws) {
    if (wsTokenMap.get(ws)) {
        subscribedSockets.add(ws);
        ws.send(JSON.stringify({response: "subscription_success", message: "Subscribed successfully"}));
    } else {
        ws.send(JSON.stringify({response: "error", message: "Not authenticated"}));
    }
}
