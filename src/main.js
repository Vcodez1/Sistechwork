// Main Interactivity Script

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      const nav = document.querySelector('.nav');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }

      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active'); // Basic toggle class
    // Note: In a real app, we'd add CSS for .nav.active to show the mobile menu
  });
}

// Intersection Observer for Scroll Animations
// This adds 'visible' class to elements when they scroll into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Select Custom Elements to Animate (Optional Enhancement)
document.querySelectorAll('.card, .stat-item, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Add global visible class style dynamically if needed, 
// or rely on the CSS transitions defined above
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* Mobile Menu Active State Styles (injected for simplicity) */
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            transform: translateY(-150%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        .nav.active {
            transform: translateY(0);
        }
        .nav-list {
            flex-direction: column;
            width: 100%;
            text-align: center;
        }
    }
  `;
document.head.appendChild(styleSheet);

// --- Authentication Logic ---
import { subscribeToAuthChanges, loginUser, registerUser, logoutUser } from './auth-service.js';

const authModal = document.getElementById('auth-modal');
const closeBtn = document.querySelector('.close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const signinBtnTrigger = document.querySelector('a[href="#"].btn-ghost'); // "Sign In" button in header

// Toggle Modal
function toggleModal(show) {
  if (show) {
    authModal.classList.remove('hidden');
    // Small timeout to allow display:block to apply before opacity transition
    setTimeout(() => authModal.classList.add('visible'), 10);
  } else {
    authModal.classList.remove('visible');
    setTimeout(() => authModal.classList.add('hidden'), 300);
  }
}

if (signinBtnTrigger) {
  signinBtnTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    // If already logged in, maybe redirect or show profile?
    // For now, assume it opens login if not logged in (logic below handles state)
    if (signinBtnTrigger.textContent === 'Sign In') {
      toggleModal(true);
    } else {
      // Handle Logout
      logoutUser().then(({ error }) => {
        if (error) alert('Logout failed: ' + error);
      });
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => toggleModal(false));
}

// Close on outside click
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) toggleModal(false);
});

// Tab Switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    tabBtns.forEach(b => b.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));

    // Add active to clicked
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    document.getElementById(`${tabId}-form`).classList.add('active');
  });
});

// Form Handling
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');

    errorMsg.textContent = 'Signing in...';

    const { user, error } = await loginUser(email, password);

    if (error) {
      errorMsg.textContent = error;
    } else {
      errorMsg.textContent = '';
      toggleModal(false);
      // alert(`Welcome back, ${user.email}!`);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorMsg = document.getElementById('signup-error');

    errorMsg.textContent = 'Creating account...';

    const { user, error } = await registerUser(email, password);

    if (error) {
      errorMsg.textContent = error;
    } else {
      errorMsg.textContent = '';
      toggleModal(false);
      // alert(`Account created for ${user.email}!`);
    }
  });
}

// Auth State Observer
subscribeToAuthChanges((user) => {
  if (user) {
    // User is signed in
    if (signinBtnTrigger) {
      signinBtnTrigger.textContent = 'Sign Out';
      signinBtnTrigger.classList.replace('btn-ghost', 'btn-outline'); // Make it look distinct
      signinBtnTrigger.title = user.email; // Tooltip shows email
    }
  } else {
    // User is signed out
    if (signinBtnTrigger) {
      signinBtnTrigger.textContent = 'Sign In';
      signinBtnTrigger.classList.replace('btn-outline', 'btn-ghost');
      signinBtnTrigger.title = '';
    }
  }
});

// --- Improved Loader Logic ---
function hideSiteLoader() {
  const loader = document.getElementById('app-loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}

// Ensure loader hides even if script loads after window.load
if (document.readyState === 'complete') {
  hideSiteLoader();
} else {
  window.addEventListener('load', hideSiteLoader);
  // Fallback: hide loader after 3 seconds anyway
  setTimeout(hideSiteLoader, 3000);
}

// --- Improved Book Demo Auth Guard ---
let authStateUser = null;
import { subscribeToAuthChanges as authCheck } from './auth-service.js';

authCheck((user) => {
  authStateUser = user;
});

// Use event delegation for consistently catching "Book Demo" clicks
document.addEventListener('click', (e) => {
  const target = e.target.closest('.btn');
  if (target && target.textContent.trim().toLowerCase().includes('book demo')) {
    if (!authStateUser) {
      e.preventDefault();
      e.stopPropagation();
      // Use existing toggleModal from the original main.js
      if (typeof toggleModal === 'function') {
        toggleModal(true);
      } else {
        const modal = document.getElementById('auth-modal');
        if (modal) {
          modal.classList.remove('hidden');
          setTimeout(() => modal.classList.add('visible'), 10);
        }
      }
    }
  }
}, true); // Use capture phase

// --- Spline Scroll-Through Fix ---
// Allows page scrolling even when mouse is over the interactive 3D scene
window.addEventListener('load', () => {
  const spline = document.querySelector('spline-viewer');
  if (spline) {
    spline.addEventListener('wheel', (e) => {
      // Forward scroll event to window with a multiplier for natural feel
      window.scrollBy({
        top: e.deltaY * 1.5,
        behavior: 'auto'
      });
    }, { passive: true });
  }
});
