import { useContext, createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUserContext } from './User.context';

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useUserContext();

    function connectSocket() {
        if (!user || socket) return;

        const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            auth: { userId: user._id, role: user.role },
        });

        socketInstance.on('connect', () => {
            console.log('socket connected. SocketId: ', socketInstance.id);
            setSocket(socketInstance);
        });

        // Error Handling
        socketInstance.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        socketInstance.on('error', (err) => {
            console.error('Socket error:', err);
        });

        // Events

        return socketInstance; // optional
    }

    function disconnectSocket() {
        if (socket) {
            console.log('socket disconnecting...');
            socket.disconnect(); // will set socket = null implicitly
            setSocket(null);
        }
    }

    useEffect(() => {
        user ? connectSocket() : disconnectSocket();
        return () => disconnectSocket();
    }, [user]);

    return (
        <SocketContext.Provider
            value={{ socket, connectSocket, disconnectSocket }}
        >
            {children}
        </SocketContext.Provider>
    );
};

const useSocketContext = () => useContext(SocketContext);

export { useSocketContext, SocketContextProvider };
