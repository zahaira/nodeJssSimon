const validTypes =['Plante',
'Poison',
'Feu',
'Eau',
'Insecte',
'Normal',
'Electrik',
'Carapuce',
'Vol',
'Fée',
'Combat'
]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'le name doit etre unique'
        },
        validate: {
          notEmpty: {msg: 'no have to be empty'},
          notNull: {msg: 'nom obligatoire'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'utiliser unquement les nombres entiers'},
          notNull: {msg: 'les pts de vie sont obligatoire'},
          min:{
            args:[0],
            msg: 'min 0'
          },
          max:{
            args:[999],
            msg: 'max 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'utiliser unquement les nombres entiers'},
          notNull: {msg: 'les pts de vie sont obligatoire'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: 'utiliser url'},
          notNull: {msg: 'picture obligatoire'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types',types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value){
              throw new Error('un pokemon doit aumois has a type')
            }
            if(value.split(',').length > 3){
              throw new Error('un pokemon doit max 3  type')
            }
            value.split(',').forEach(type=>{
              if(!validTypes.includes(type)){
                throw new Error('le type n est pas valid')
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }