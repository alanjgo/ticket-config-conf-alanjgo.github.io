//email validation

const emailInput = document.getElementById('email-address');
const emailError = document.getElementById('email-error');
const form = document.querySelector('.centered-form');

form.addEventListener('submit', function(e) {
  if (!emailInput.checkValidity()) {
    e.preventDefault();
    emailError.style.display = 'block';
    emailInput.style.borderColor = '#d32f2f';
  } else {
    emailError.style.display = 'none';
    emailInput.style.borderColor = '';
  }
});

emailInput.addEventListener('input', function() {
  if (emailInput.checkValidity()) {
    emailError.style.display = 'none';
    emailInput.style.borderColor = '';
  }
});

//avatar validation file type

const avatarInput = document.getElementById('avatar');
const avatarSizeError = document.getElementById('avatar-size-error');
const avatarInfo = document.getElementById('avatar-info');
const avatarPreview = document.getElementById('avatar-preview');
const avatarIcon = document.getElementById('avatar-icon')
const avatarText = document.querySelector('.avatar-text')

avatarInput.addEventListener('change', function() {
  avatarSizeError.style.display = 'none';
  avatarInfo.style.display = 'flex';

    if (avatarInput.files.length > 0) {
    const file = avatarInput.files[0];
    const maxSize = 500 * 1024; // 500KB in byte

    if (file.size > maxSize) {
        avatarSizeError.style.display = 'flex';
        avatarInfo.style.display = 'none';
        avatarInput.value = '';
    }
  }
});

//photo preview

document.addEventListener('DOMContentLoaded', function () {
  
    avatarInput.addEventListener('change', function () {
      if (avatarInput.files && avatarInput.files[0]) {
        const file = avatarInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          avatarPreview.src = e.target.result;
          avatarPreview.style.display = 'block';
          avatarIcon.style.display = 'none'; // cache l'icône d'upload
          avatarText.style.display = 'none';
        };
        reader.readAsDataURL(file);
      } else {
        avatarPreview.style.display = 'none';
        avatarIcon.style.display = 'block';
        avatarText.style.display = 'flex';

      }
    });
  });

//form validation

const ticketContainer = document.getElementById('ticket-container');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validation manuelle si besoin (tu peux ajouter tes vérifs ici)
  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email-address').value.trim();
  const github = document.getElementById('github-username').value.trim();
  const avatarInput = document.getElementById('avatar');
  const header = document.getElementById('intro')
  let avatarUrl = '';

  // Affiche l'avatar uploadé si présent
  if (avatarInput.files && avatarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      avatarUrl = e.target.result;
      showTicket(fullName, email, github, avatarUrl);
    };
    reader.readAsDataURL(avatarInput.files[0]);
  } else {
    // Si pas d'avatar, affiche une image par défaut
    avatarUrl = './assets/images/image-avatar.svg';
    showTicket(fullName, email, github, avatarUrl);
  }
});

function showTicket(fullName, email, github, avatarUrl) {
  // Remplis les champs du ticket
  document.getElementById('ticket-name').textContent = fullName || 'Attendee';
  document.getElementById('ticket-email').textContent = email || 'your@email.com';
  document.getElementById('ticket-holder').textContent = fullName || 'Attendee';
  document.getElementById('ticket-handle').textContent = github ? '@' + github.replace(/^@/, '') : '';
  document.getElementById('ticket-avatar').src = avatarUrl;

  // Cache le formulaire et affiche le ticket
  document.querySelector('.centered-form').style.display = 'none';
  document.querySelector('.intro').style.display = 'none';
  ticketContainer.style.display = 'flex';
}
