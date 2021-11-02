const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models")

const seed = async ()=>{
    try{

        const userData = await User.bulkCreate([
            {
                username:"joe",
                password:"password",
                email:"joe@joe.joe",
                first_name: "Joe",
                last_name: "Rehfuss"
            },
            {
                username:"louis",
                password:"password",
                email:"louis@joe.joe",
                first_name: "Louis",
                last_name: "Coleman"
            },
            {
                username:"brett",
                password:"password",
                email:"brett@joe.joe",
                first_name: "Brett",
                last_name: "Belka"
            },
            {
                username:"michael",
                password:"password",
                email:"michael@joe.joe",
                first_name: "Michael",
                last_name: "Corleone"
            },
        ],{
            individualHooks:true
        })
        const postData = await Post.bulkCreate([
            {
                title: "First",
                post_body: "This is a post body",
                UserId:1
            },
            {
                title: "Second",
                post_body: "This is a post body",
                UserId:2
            },
            {
                title: "Third",
                post_body: "This is a post body",
                UserId:2
            },
        ])
        const commentData = await Comment.bulkCreate([
            {
               comment_body: "jajajajjajajja",
               UserId:1,
               PostId:1
            },
            {
                comment_body: "AHHHHHHHHHH",
                UserId:2,
                PostId:1
             },
             {
                comment_body: "FUCK",
                UserId:1,
                PostId:2
             },
            
            
        ])
    }
    catch(error) {
        console.log(error)
    }
}

sequelize.sync({force:true}).then(()=>{
    seed();
})