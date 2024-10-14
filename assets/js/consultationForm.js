document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('popupBox').style.display = 'flex';
  });
  
  document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('popupBox').style.display = 'none';
  });
  
  document.getElementById('popupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Reset previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
  
    let isValid = true;
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const services = document.getElementById('services').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;
  
    // Validate required fields
    if (name === '') {
      document.getElementById('nameError').textContent = 'Name is required';
      isValid = false;
    }
    
    if (email === '') {
      document.getElementById('emailError').textContent = 'Email is required';
      isValid = false;
    }
    
    if (message === '') {
      document.getElementById('messageError').textContent = 'Message is required';
      isValid = false;
    }
  
    // Log form data if valid
    if (isValid) {
      console.log({
        name: name,
        email: email,
        phone: phone,
        services: services,
        address: address,
        message: message
      });
  
      // Close the popup after submission
      document.getElementById('popupBox').style.display = 'none';
    }
  });
  