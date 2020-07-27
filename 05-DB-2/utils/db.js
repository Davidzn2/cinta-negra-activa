const mongoose = require("mongoose");
const {config} = require('../config')

mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Connected to Database'))
    .catch(()=> console.log('Error in datbase connection'))