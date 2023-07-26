const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize'); 
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
      const name = req.query.name
      //const limit = parseInt(req,query.limit) || 5

      if(name.length<2){
        const message = 'le terme de 2 min char'
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        order:['name'],
        limit:5
      })
      .then(({count,rows}) => {
        res.json(rows)
      })
    }else{
    Pokemon.findAll({order:['name']})
      .then(pokemons => {
        res.json(pokemons )
      }).catch((error)=>{
        res.status(500).json(error)
      })
    }
  })
}