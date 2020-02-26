const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    
    io = socketio(server);    

    io.on('connection', socket => {
        //console.log(socket.id);
        //console.log(socket.handshake.query);

        const { latitude, longitude, techs } = socket.handshake.query;

        // Adicionar ao array de connections cada nova connection
        connections.push({
            id: socket.id,
            coodinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });

        /*
        setTimeout(() => {
            socket.emit('message', 'Hello OmniStack');
        }, 3000);
        */
    });
}

// Verifica se o dev cadastrado está a menos de 10 km de distancia dos devs do socket e se 
// as techs batem com o filtro
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coodinates) <= 10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    console.log('passou aqui 2...');
    console.log(to);
    
    
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}