import {subscribedSockets} from "../websocket.js";
import {sendBlockers} from "./blockersHandler.js";


export async function sendPushmessage(parsedData, ws) {
    const serverToken = parsedData.token
    {
        if (serverToken === "LrNz0wGflK67oQmu8MVthntnvbzTBkmH") {
            await sendBlockers();
            ws.send("Clients Notified")
        } else {
            ws.send("authentication failed")
        }


    }
}

export async function sendinternalPushmessage() {
    {
        await sendBlockers();

    }
}

