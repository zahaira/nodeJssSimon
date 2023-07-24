const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    console.log( req.body.username)
    console.log(req.body.password)
    

    User.findOne({ where: { username: req.body.username } }).then(user => {
      console.log('hello')
      if(!user){
            const message = 'user n exist pas'
            return res.status.json({message})
        }

        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `mot incorrect`;
          return res.status(401).json({ message})
        }
        //jwt
        const token = jwt.sign(
          {userId: user.id},
          privateKey,
          {expiresIn: '24h'}
        )
        const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user,token })
      })
    })
    .catch(error=>{
        const message = `L'utilisateur  pas pu connecte`;
        return res.json({ message, data: error })
    })
  })
}