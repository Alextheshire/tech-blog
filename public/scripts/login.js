const login = document.getElementById('login');

login.addEventListener("submit", (event)=> {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username:username,
        password:password
    }
    fetch("/login",{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("Incorrect login credentials.")
        }
    })
})
