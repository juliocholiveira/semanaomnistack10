const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/devs/:github_username', DevController.show);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs/:github_username', DevController.destroy)

routes.get('/search', SearchController.index);

module.exports = routes;

/*

app.get('/', (req, res) => {
    //return res.send('Hello World');
    return res.json({
        message: 'Bem vindo a SemanaOmniStack10!!'
    });
});

// Métodos http: GET, POST, PUT, DELETE

// Tipos de Parâmetros:

// Query Params: request.query
app.get('/users', (req, res) => {
    console.log(req.query);
    return res.json({
        nome: 'Query Params'
    });
});

// Route Params: request.params
app.delete('/users/:id', (req, res) => {
    console.log(req.params);
    return res.json({
        nome: 'Route Params'
    });
});

// Body: request.body
app.post('/users', (req, res) => {
    console.log(req.body);
    return res.json({
        nome: 'Body Params'
    });
});

*/