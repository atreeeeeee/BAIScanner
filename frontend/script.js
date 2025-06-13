function goBack() {
  window.history.back();
}

function handleLogin(event) {
  event.preventDefault();
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  window.location.href = 'registration.html';
}

function handleNameSubmit(event) {
  event.preventDefault();
  const first = document.getElementById('first-name').value;
  const last = document.getElementById('last-name').value;

  // Clear fields
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';

  // Dummy values
  const registrationTier = "GOLD";
  const mealStatus = "N/A";

  // Set popup values
  document.getElementById('popup-name').textContent = `${first} ${last}`;
  document.getElementById('popup-tier').textContent = registrationTier;
  document.getElementById('popup-meal').textContent = mealStatus;

  // Show popup
  const popup = document.getElementById('popup');
  popup.classList.remove('hidden');
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
}
