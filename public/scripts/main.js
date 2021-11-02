$('.commentBtn').on('click', (event)=> {
    // console.log(event)
    
    // let newComment = $(`#comment-${targetId}`).val();
    // $(`#post-${targetId}`).append($(`<div class='comment-box'></div>`).text(newComment))
    
    let targetId = event.target.id;
    const commentText = $(`#comment-${targetId}`).val()
    const comment = {
        comment_body: commentText,
        PostId: targetId
    }
    console.log(comment)
    fetch("/comment",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("Uh Oh")
        }
    })
})