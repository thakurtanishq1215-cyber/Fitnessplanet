// ===============================
// UI Toggle
// ===============================

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

if (registerBtn && container) {
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });
}

if (loginBtn && container) {
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
}


// ===============================
// EMAILJS WORKING CODE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init("P1s3FI_glKoGLJWiW");

    // Get Registration Form
    const emailForm = document.getElementById("email-form");

    // Run only if form exists
    if (emailForm) {

        emailForm.addEventListener("submit", function (event) {

            // Stop page refresh
            event.preventDefault();

            // Get Input Values
            const userName = document.getElementById("user_name").value.trim();
            const userEmail = document.getElementById("user_email").value.trim();

            // Email Validation
            if (userEmail === "") {
                alert("Please enter email");
                return;
            }

            // Send Email
            emailjs.send(
                "service_hnomdjb",     // Service ID
                "template_ca6astl",    // Template ID
                {
                    user_name: userName,
                    user_email: userEmail,
                    to_email: userEmail
                }
            )

            .then(function (response) {

                alert("Registration Successful! Check your Email.");

                console.log("SUCCESS!", response.status, response.text);

                // Reset Form
                emailForm.reset();

            })

            .catch(function (error) {

                alert("Email Failed to Send");

                console.log("FAILED...", error);

            });

        });

    }

});