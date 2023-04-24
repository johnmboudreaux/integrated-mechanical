(function() {
  "use strict"

  const contactForm = document.getElementById('contact')
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(contactForm)
    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')
    
    // nodemailer values
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Subject:', subject)
    console.log('Message:', message)

    fetch('http://localhost:3000/api/v1/messageReceived', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: name, email, subject, text: message })
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
