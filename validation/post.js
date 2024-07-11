const Joi = require('joi');
const postSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    body: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive').required(),
    geoLocation: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    }).required()
});   
module.exports = {postSchema}