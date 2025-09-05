const form = document.querySelector("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("con-password");
const toast = document.getElementById("toast");
const toastMessage = toast.querySelector(".toast-message");
const toastClose = toast.querySelector(".toast-close");

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  form.classList.add("was-validated"); // Trigger validation styles

  // Reset custom validity before checking
  confirmPassword.setCustomValidity("");

  // Native validation check
  if (!form.checkValidity()) {
    return; // Browser will show red borders and messages
  }

  // Custom password match validation
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
    confirmPassword.reportValidity();
    return;
  }

  // If all validations pass, show toast
  showToast("✅ Passwords match!");
  form.reset(); // Optional: reset form after success
  form.classList.remove("was-validated"); // Clear validation styles
});

// Show toast with custom message
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    hideToast();
  }, 3000);
}

// Manual dismiss
toastClose.addEventListener("click", hideToast);

function hideToast() {
  toast.classList.remove("show");
  toast.classList.add("hidden");
}
