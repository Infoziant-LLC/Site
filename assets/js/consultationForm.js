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

  // Send form data to Web3Forms if valid
  if (isValid) {
      const formData = new FormData();
      formData.append('access_key', '8a00277a-d5f2-4f73-b618-e385955af564'); // Replace with your actual access key
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('services', services);
      formData.append('address', address);
      formData.append('message', message);

      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Thank you for your message. We will get back to you soon.');
              // Close the popup after successful submission
              document.getElementById('popupBox').style.display = 'none';
          } else {
              alert('There was an error submitting the form. Please try again.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting the form. Please try again.');
      });
  }
});