const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app = express()
const PORT = process.env.PORT | 3000;

app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req,res)=>{
  res.json('hello me')
})

//piont de terminaiseon
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//on ajoute error handling 404
app.use(({res})=>{
  const message = 'impossible 404'
  res.status(404).json({message})
})

app.listen(PORT, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))





