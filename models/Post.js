const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Post extends Model {}

Post.init({
    title: {
         type: DataTypes.STRING,
         validate: {
             len:[3]
         }
    },
    post_body:{
        type:DataTypes.TEXT,
        validate:{
            len:[8]
        }
    }
    
},{
    sequelize,
});

module.exports = Post;