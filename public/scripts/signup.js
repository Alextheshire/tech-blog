
const submit = document.getElementById('new-user-form');


submit.addEventListener('submit',(event)=>{

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const password = document.getElementById('password').value;

    const newUser = {
        username: username,
        email: email,
        fname: fname,
        lname:lname,
        password:password
    }
    fetch("/signup",{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("Something went wrong.  Please try again.")
        }
    })
    event.preventDefault();
    event.stopPropagation();
})