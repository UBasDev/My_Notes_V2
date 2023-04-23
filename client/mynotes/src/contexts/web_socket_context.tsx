import {createContext} from 'react';
import {Socket, io} from 'socket.io-client'

export const socket_io = io('http://localhost:9001') //Socket server running port

export const Web_Socket_Context = createContext<Socket>(socket_io);

export const Web_Socket_Provider = Web_Socket_Context.Provider;