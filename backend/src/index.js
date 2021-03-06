const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const config = require('./config');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Conecta a base de dados do mongodb atlas
mongoose.connect(config.urlMongoDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Habilita o cors origin para todas as páginas
app.use(cors());

// Configura o express para utilizar o json no body das requests
app.use(express.json());

// Configura as routes
app.use(routes);

server.listen(config.port);