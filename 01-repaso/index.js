const request = require('request');
const axios = require('axios')

// VARIABLES
var juanita = 'Juanita' // VARIABLE ALCANCE GLOBAL
let indice = 0 // VARIABLE DE ALCANCE LOCAL
const pi = 3.141592 // VARIABLE DE ALCANCE LOCAL, NO SE PUEDE SOBREESCRIBIR

// CONVENCIONAL / VANILLA
function miFuncion(){
    console.log('soy una funcion')
}
// Arrow function ES6 / ES2015
const otraFuncion = ()=>{
    console.log('soy una funcion de flecha, arrow para los cuates')
}
// FUNCION ANONIMA
const funcionAnonima = function(){
    console.log('soy anonima shhhh')
}
// LLAMADAS A UNA API
const getBreakinBadQuote = ()=>{
    const URL = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
    request.get(URL,(err, res, body)=>{
        if(res.statusCode === 200){
            const json = JSON.parse(body)
            console.log(`${json[0].author} dijo: ${json[0].quote}`)
        } else console.log(err)
    })
}

const getBreakinBadQuoteAxios = ()=>{
    const URL = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
    axios.get(URL)
        .then((res)=>{
            console.log(res.data[0])
        }) 
        .catch((err)=>{
            console.log(err)
        })
}

getBreakinBadQuoteAxios()