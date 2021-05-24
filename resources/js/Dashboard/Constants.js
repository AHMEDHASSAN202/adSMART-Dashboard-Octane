import io from "socket.io-client";

export const PaginationPerPageDefault = 10;
export const WebSocketServer = window.WS_SERVICE_URL;
export const WebSocketServerOptions = {
    withCredentials: true,
    transports: ['websocket'],
    path: '/socket.io',
};

export const GET_USERS_AND_GROUPS_URL = window.WS_SERVICE_DOMAIN + 'chat/get-users-and-groups';
export const GET_MESSAGES_CHAT_URL = window.WS_SERVICE_DOMAIN + 'chat/get-messages';
export const GROUPS_URL = window.WS_SERVICE_DOMAIN + 'groups';
export const GET_ONLINE_USERS_URL = window.WS_SERVICE_DOMAIN + 'users/online';
export const LIMIT_MESSAGES_CHAT = 100;
export const SOCKET = io(WebSocketServer, {...WebSocketServerOptions, query: {auth_token: window.USER_TOKEN}})
