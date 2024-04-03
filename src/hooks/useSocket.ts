import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
	const [isConnected, setIsConnected] = useState(false);
	const socketRef = useRef<Socket>();

	useEffect(() => {
		const session = localStorage.getItem("session");
		// http://35.247.134.118:4000
		socketRef.current = io(`localhost:4000`, {
			// socketRef.current = io(`http://35.247.134.118:4001`, {
			transports: ["websocket"],
			requestTimeout: 3000,
			auth: {
				session: session && session !== "null" ? session : null,
			},
		});
		const socket = socketRef.current;

		const engine = socket?.io?.engine;
		console.log(engine?.transport?.name); // in most cases, prints "polling"

		engine?.once("upgrade", () => {
			// called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
			console.log(engine.transport.name); // in most cases, prints "websocket"
		});

		socket.on("sync_session", (session) => {
			localStorage.setItem("session", session);
		});

		socket.on("connect", () => {
			console.log("Connected to server");
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from server");
			setIsConnected(false);
		});

		socket.on("connect_error", (error) => {
			console.log("Error connecting to server:", error);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const addListener = <T>(event: string, callback: (data: T) => void) => {
		socketRef.current?.on(event, callback);
	};

	const removeListener = (event: string) => {
		socketRef.current?.off(event);
	};

	const emitEvent = <T>(event: string, data?: T) => {
		if (socketRef.current?.connected) {
			socketRef.current?.emit(event, data);
		}
	};

	return {
		isConnected,
		socket: socketRef.current,
		emitEvent,
		addListener,
		removeListener,
	};
};

export default useSocket;
