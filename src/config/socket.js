import io from 'socket.io-client';

let socketUrl = process.env.REACT_APP_DEV_SOCKET_URL
switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
        socketUrl = process.env.REACT_APP_LOCAL_SOCKET_URL;
        break;
    case 'staging':
        socketUrl = process.env.REACT_APP_STG_SOCKET_URL;
        break;
    case 'dev':
        socketUrl = process.env.REACT_APP_DEV_SOCKET_URL;
        break;
    case 'live':
        socketUrl = process.env.REACT_APP_DEV_SOCKET_URL;
        break;
    default:
        socketUrl = process.env.REACT_APP_DEV_SOCKET_URL;
        break;
}

// SET SOCKET URL
const SOCKET_URL = socketUrl;
const newSocket = io(SOCKET_URL);

export default newSocket