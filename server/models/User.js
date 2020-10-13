module.exports = (sequelize, DataTypes) => 
    sequelize.define('account', {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    })
