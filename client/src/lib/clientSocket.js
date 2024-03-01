// clientSocket.js
import {blockerStore} from "../stores/blockerStore.js";
import {get} from "svelte/store";

let subscribed = false;

export function connect() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket("ws://localhost:3001/");

        // Log WebSocket events
        socket.addEventListener('open', () => {
            console.log('WebSocket connection opened');
            resolve(socket); // Resolve the promise with the WebSocket object
        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed', event);
            reject(new Error('WebSocket connection closed unexpectedly'));
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            reject(error);
        });
    });
}

export async function subscribe(socket) {
    if (!subscribed) {
        socket.send(JSON.stringify({command: "subscribe"}));

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
        });

        subscribed = true;
    }
}


export async function login(email, password, socket) {

    if (socket.readyState === WebSocket.OPEN) {
        const credentials = {
            email: email,
            password: password
        };

        console.log(JSON.stringify({
            command: "authenticate",
            ...credentials
        }));

        socket.send(JSON.stringify({
            command: "authenticate",
            ...credentials
        }));

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);

            if (data.response === "login_success") {
                console.log(data);
                subscribe(socket);
                return;
            }

            if (data.response === "blockers") {
                blockerStore.set(data.blockers);
            } else {
            }
        });
    } else {
        console.log("WebSocket connection is not open.");
    }
}