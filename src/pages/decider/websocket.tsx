import { FC, useEffect, useState } from 'react'
import './websocket.css'

const SERVER_URL = 'http://1.mkolchurin.ru:9988/api/v1/decider/uid1';

const Websocket: FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket(SERVER_URL);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('Connected to server');
        };

        newSocket.onmessage = (event) => {
            const message: any = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message.content]);
        };

        newSocket.onclose = () => {
            console.log('Disconnected from server');
        };

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            const message: any = {
                type: "update",
                user: {
                    uid: "userUniqID",
                    username: "user1"
                },
                body: {
                    partyUid: 1
                }
            };
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <div className="websocket">
            <h3>WebSocket Chat</h3>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Websocket