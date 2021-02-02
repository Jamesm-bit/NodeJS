const update = document.querySelector('#update-button')

update.addEventListener('click', __ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
            fname: 'Test2',
            lname: 'Test2'
        })
    })
})

const data = {
    fname: 'Test2',
    lname: 'Test2'
}