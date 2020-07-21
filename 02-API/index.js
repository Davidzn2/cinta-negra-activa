const express = require('express');
const app = express();

app.get('/', (request, response)=>{
    response.send('Hola mundo')
})
app.get('/rick', (request, response)=>{
    response.send({
        'character': 'Rick sanchez'
    })
})
app.get('/saludar/:name/:lastname', (request, response)=>{
    console.log(request.query, request.params)
    const { name, lastname } = request.params;
    if(name === 'david'){
        response.status(200).json({'respuesta':`${name} ${lastname}, bienvenido`})

    }else{
        response.status(400).json(`denegado`)
    }
})

app.get('/mayores/', (request, response)=>{
    console.log(request.query)
    const { edad } = request.query
    if (edad >= 18){
        response.send('Bienvenido')
    } else{
        response.send('Vete Menor!!')
    }
})

app.listen(7000, ()=> console.log(`Esta vivo en el puerto 7000`))