const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const currentLocation = document.querySelector('#current-location')


// Code to get the current location of the user
currentLocation.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }
    currentLocation.setAttribute('disabled', 'disabled')
    
    navigator.geolocation.getCurrentPosition((position) => {
       const lat = position.coords.latitude
       const lng = position.coords.longitude

       messageOne.textContent = 'Loading'
       messageTwo.textContent = ''
       
   fetch('http://localhost:3000/weather?latitude=' +lat+'&longitude=' +lng).then((response) => {
       response.json().then((data) => {
           if(data.error) {
               return messageOne.textContent = data.error
           }
           messageOne.textContent = data.city
           messageTwo.textContent = data.forecast
       })
   })

    })
    currentLocation.removeAttribute('disabled')
})


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    
fetch('http://localhost:3000/weather?location=' +location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.city
        messageTwo.textContent = data.forecast
    })
})
})