import { WebSocketServer } from 'ws';
import {client} from "@repo/db/client"

const wss = new WebSocketServer({ port: 3001 });

console.log("WebSocket server started on port 8080");

// This event listener is triggered whenever a new client connects to the server.
// The 'ws' object represents the individual connection to that client.
wss.on('connection', (ws) => {
    console.log('A new client has connected.');

    // Send a welcome message to the newly connected client.
    ws.send('Welcome to the WebSocket server!');

    // This event listener is triggered whenever the server receives a message from this specific client.
    ws.on('message', (message) => {
        // We convert the message to a string in case it's a Buffer.
        const receivedMessage = message.toString();
        console.log(`Received message: ${receivedMessage}`);

        // Broadcast the received message to all connected clients.
        // We iterate over all connected clients and send the message to each one.
        wss.clients.forEach((client) => {
            // Check if the client is open and ready to receive messages.
            if (client.readyState === ws.OPEN) {
                client.send(`A client said: ${receivedMessage}`);
            }
        });
    });

    // This event listener is triggered when this specific client's connection is closed.
    ws.on('close', () => {
        console.log('A client has disconnected.');
    });

    // Handle any errors that might occur on the connection.
    ws.on('error', (error) => {
        console.error('An error occurred:', error);
    });
});
