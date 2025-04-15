const Signup_btn = document.getElementById('go_to_signup');
const Loginform = document.getElementById('loginform') as HTMLFormElement;

Signup_btn?.addEventListener('click', () => {
    // console.log("hii");
    window.location.replace('../Signup/Signup_Index.html');
});


Loginform?.addEventListener('submit', async(e: Event) => {
    // console.log("hiii")
    e.preventDefault();
    const username = (document.getElementById('login_username') as HTMLInputElement).value;
    const password = (document.getElementById('login_password') as HTMLInputElement).value;

    if(!username || !password){
        alert("Please fill all fields.")
        return;
    }
    try{
        let data,response;
        response = await fetch("http://localhost:5501/api/login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({username, password})
        });
        data = await response.json();
        if(response.ok){
            // alert("Login Successful 🚀")
            window.location.replace("../Choose/choose_index.html")
        }else{
            alert(data.message || "Invalid username or password ❌");
        }
        
    }catch(error){
        console.error("Login error",error);
        alert("Something went wrong. Please try again later 😥")
    }
})
