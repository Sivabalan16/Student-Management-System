const Signupform = document.getElementById('signupForm') as HTMLFormElement;
Signupform?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;


    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    else if (password != confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        let data,response;
        response = await fetch("http://localhost:5501/api/signup", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({ username, email, password, confirmPassword })
        });
        data = await response.json();
        if(response.ok){
            alert("User Signed Succesfully")
            window.location.replace("../Choose/choose_index.html")
        }
    } 
    catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again later 😥");
    }
});

