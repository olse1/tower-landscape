import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

export const socket = socketIo(SERVER_URL);
