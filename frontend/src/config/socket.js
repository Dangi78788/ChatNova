import socket from 'socket.io-client';

let socketInstance = null;


export const initializeSocket = (projectId)=> {  
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId: projectId
        },
    });
    return socketInstance;
}


export const receiveMessage = (event, callback) => {
    if (socketInstance) {
        socketInstance.on(event, callback);
    } else {
        console.error('Socket not initialized. Call initializeSocket first.');
    }
}

export const sendMessage = (event, data) => {
    if (socketInstance) {
        socketInstance.emit(event, data);
    } else {
        console.error('Socket not initialized. Call initializeSocket first.');
    }
}
