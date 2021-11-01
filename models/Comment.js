const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Comment extends Model {}

Comment.init({
    comment_body:{
        type:DataTypes.STRING,
        validate:{
            len:[8]
        }
    }
    
},{
    sequelize,
});

module.exports = Comment;