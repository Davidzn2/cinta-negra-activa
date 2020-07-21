const express = require('express');
const app = express();

app.get('/', (request, response)=>{
    response.send('Hola mundo')
})
app.get('/chapan', (request, response)=>{
    response.send({
        'character': 'Rick sanchez'
    })
})
app.listen(8000, ()=> console.log(`Esta vivo en el puerto 8000`))