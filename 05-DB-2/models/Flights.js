const mongoose = require("mongoose");
/*
Un aeropuerto busca controlar los vuelos que llegan al lugar, 
desea conocer los vuelos que existen, a qué aerolínea pertenecen, 
las características del avión y el lugar de procedencia. Ayuda al 
aeropuerto a solucionar su problema.
*/
const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    model: String,
    origin: {
        type: String,
        required:true
    },
    ticket_price: Number
});
const Flights = mongoose.model('Flights', flightSchema)
module.exports = Flights;