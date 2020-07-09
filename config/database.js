const sequelize = require('sequelize')
module.exports = new sequelize('codegig' , 'postgres' , 'euclid5n',{
    host : 'localhost',
    dialect : 'postgres',
    pool : {
        max : 2,
        min : 0,
        acquire : 3000 ,
        idle : 1000000 
    }
})