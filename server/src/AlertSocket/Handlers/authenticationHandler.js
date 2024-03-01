import fetch from 'node-fetch';
import {wsTokenMap} from "../websocket.js";

const url = "http://localhost:3000/";

export async function handleAuthentication(parsedData, ws) {
    const credentials = {
        email: parsedData.email,
        password: parsedData.password
    };

    try {
        const response = await fetch(`${url}token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (data.token) {
            wsTokenMap.set(ws, data.token);
            ws.send(JSON.stringify({ response: "login_success", message: "Authentication successful" }));
            console.log(`user connected as ${parsedData.email} `);
        } else {
            ws.send(JSON.stringify({ response: "error", message: "Authentication failed" }));
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        ws.send(JSON.stringify({ response: "error", message: error.message }));
    }
}
