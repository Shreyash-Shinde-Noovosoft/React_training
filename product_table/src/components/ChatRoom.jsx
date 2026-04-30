import { useState, useEffect } from "react";
import { createConection } from "../chat.js";


export function useChatRoom({ serverUrl, roomId }) {
    useEffect(() => {
        const connection = createConection(serverUrl, roomId);
        connection.connect();
        return() => {
            connection.disconnect();
        };
    }, [roomId, serverUrl]);
}