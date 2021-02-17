const currentURL = 'http://localhost:5000/'

let users = []

const getData = () => {
    fetch('/users', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json())
    .then(data => {
        for(item in data) {
            users.push(data[item])
        }
    })
}

getData()

console.log(users)
const signInUser = () => {
    for(item in users) {
        if($('#UserName').val()==users[item].username || $('#UserName').val()==users[item].email) {
            if($('#Password').val()==users[item].password){
                window.location.href = 'http://localhost:5000/signedin'
            } 
        }
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
    
    try {
        await fetch('/signup', {
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
    console.log(body)
    /*
   window.location.href = "http://localhost:5000/"
   */
}