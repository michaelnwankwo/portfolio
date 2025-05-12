document.addEventListener('DOMContentLoaded', function()  
  // Mobile menu elements
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburgerButton = document.getElementById('mobileMenuButton');
  const hamburgerIcon = hamburgerButton.querySelector('i');

  // Toggle mobile menu
  hamburgerButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      // Toggle between bars and times icon
      if (mobileMenu.classList.contains('hidden')) {
          hamburgerIcon.classList.remove('fa-times');
          hamburgerIcon.classList.add('fa-bars');
      } else {
          hamburgerIcon.classList.remove('fa-bars');
          hamburgerIcon.classList.add('fa-times');
      }
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('fa-times');
          hamburgerIcon.classList.add('fa-bars');
      });
  });