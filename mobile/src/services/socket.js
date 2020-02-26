import socketio from 'socket.io-client';

const socket = socketio.connect('http://192.168.1.29:3333',{
  autoConnect: false
});

function connect(latitude, longitude, techs){
  socket.io.opts.query = {
    latitude, 
    longitude, 
    techs
  };

  socket.connect();

  /*socket.on('message', text => {
    console.log(text);
  })*/
}

function disconnect(){
  if (socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subscribeFunction){
  console.log('passou aqui...');
  
  socket.on('new-dev', subscribeFunction);
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
}