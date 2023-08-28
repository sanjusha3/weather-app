const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchTerm.value

    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                message1.innerText = data.error
                message1.style.color = "red"
                message1.style.fontWeight = "bold"
            } else {
                message1.innerText = data.location
                message2.innerText = data.forecast
            }
        })
})