const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id', auth,(req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'sorry nexist pas'
          return res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      }).catch((error)=>{
        const message = 'le pokemon nexist pas'
        res.status(500).json({message,data:error})
      })
  })
}