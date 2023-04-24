(function() {
  "use strict"

  const contactForm = document.getElementById('contact')
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(contactForm)
    const name = formData.get('name')
    const from = formData.get('email')
    const subject = formData.get('subject')
    const text = formData.get('message')
    const city = formData.get('city')

    fetch('http://localhost:3000/api/v1/messageReceived', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, from, name, subject, text })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        // Do something with the response data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
      })
  })

})()
