const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../../src/websocket') 

// index (list), show (listOne), store, update, destroy

module.exports = {

    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async show(req, res){

        const { github_username } = req.params;

        const dev = await Dev.findOne({ github_username });

        return res.json(dev);
    },

    async store(req, res){
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){

            const apiGithubResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiGithubResponse.data;
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            const techsArray = parseStringAsArray(techs);
        
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                techs: techsArray,
                bio,
                location,
            });

            // Filtrar as conexões que estão a no máximo 10 km de distancia
            const sendSocketMessageTo = findConnections(
                { latitude, longitude},
                techsArray,
            );

            //console.log('passou aqui...')
            //console.log(sendSocketMessageTo);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return res.json(dev);
    },

    async update(req, res){
        //console.log(req.body);

        const { github_username, name } = req.body;

        await Dev.updateOne({ github_username }, { name }, function(err,res){
        });

        const dev = await Dev.findOne({ github_username });

        return res.json(dev);
    },

    async destroy(req, res){

        const { github_username } = req.params;

        await Dev.deleteOne({ github_username }, function(err){
            if (err) return handleError(err);
        })

        return res.json({ message: 'SUCCESS'});
    }
}