const currentURL = 'http://localhost:5000/'

const signInUser = () => {
    let user = {
        username: $('#UserName').val(),
        password: $('#Password').val(),
        email: $('#UserName').val()
    }
    let body = JSON.stringify(user)
    console.log(body)
    try {
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
            })
    } catch (error) {
        console.log(`there was an error signing up the user: ${error}`)
    }
}

const moveToSignUp = () => {
    window.location.href = "http://localhost:5000/signup"
}

async function signupUser() {
    let user = {
        username: $('#UserName').val(),
        password: $('#Password').val(),
        email: $('#Email').val()
    }
    let body = JSON.stringify(user)
    console.log(body)
    try {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
            })
    } catch (error) {
        console.log(`there was an error signing up the user: ${error}`)
    }
    /*
   window.location.href = "http://localhost:5000/"
   */
}