// Imports primero
const express = require('express');
const axios = require('axios');

// Instancias /variables / lo demas
const app = express();
const port = 5000;
/*
- Agrega un endpoint ‘/api/suma’ que responda a una 
      petición de tipo GET con la suma de dos números que 
      reciba mediante las querys num1 y num2. El servidor
      debe responder con un código de estado 200 y un json 
      como el siguiente:
                      {‘resultado’: 7}

*/

app.get('/api/suma', (req, res)=>{
    const {numero1, numero2} = req.query
    const resultado = parseInt(numero1) + parseInt(numero2)
    res.status(200).json({
        'resultado': resultado
    })
})

/*
4.- Agrega un endpoint ‘/api/swapi’ que responda a una
      petición de tipo GET con el personaje solicitado de 
                      https://swapi.dev/
      El cliente debe mandar el número de personaje mediante
      params. La respuesta del servidor debe lucir algo así
                  {‘personaje’: {
                      ‘name’: ‘Luke Skywalker’,
                      ...,
                  }}
*/
app.get('/api/swapi/:id', (req, res)=>{
    const {id} = req.params;
    const URL = `https://swapi.dev/api/people/${id}`
    
    axios.get(URL)
       
     .then((swapiResponse)=>{
        const {name, height, gender}  = swapiResponse.data
        res.status(200).json({
            'nombre': name,
            'estatura': height,
            'genero': gender
        })
     })
     .catch((error)=>{
         res.status(500).json({
             'error': 'tuvimos un error, regresa despues'
         })
     })
})


app.listen(port, ()=>console.log(`Server listening in port: ${port}`))