// ==========================================
// 1. GSAP ANIMATIONS
// ==========================================
const navElement = document.getElementById("nav");
if (navElement) {
    gsap.to("#nav", {
        backgroundColor: "#000",
        height: "90px",
        duration: 0.5,
        scrollTrigger: {
            trigger: "#nav",
            scroller: "body",
            start: "top -10%",
            end: "top -11%",
            scrub: 1 
        }
    });
}

const mainElement = document.getElementById("main");
if (mainElement) {
    gsap.to("#main", {
        backgroundColor: "#000",
        scrollTrigger: {
            trigger: "#main",
            scroller: "body",
            start: "top -25%",
            end: "top -70%",
            scrub: 2,
        },
    });
}


// ==========================================
// 2. BMI CALCULATOR
// ==========================================
function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100;
    let weight = parseFloat(document.getElementById("weight").value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("bmi-value").innerText = "Error";
        document.getElementById("condition").innerText = "Invalid input";
        return;
    }
    
    let bmi = (weight / (height * height)).toFixed(1);
    document.getElementById("bmi-value").innerText = bmi;
    
    let needle = document.getElementById("needle");
    let condition = "";
    let angle = 0;
    
    if (bmi < 18.5) {
        condition = "Underweight"; angle = -80;
    } else if (bmi < 25) {
        condition = "Normal"; angle = -45;
    } else if (bmi < 30) {
        condition = "Overweight"; angle = 0;
    } else if (bmi < 40) {
        condition = "Obese"; angle = 35;
    } else {
        condition = "Severely Obese"; angle = 80;
    }
    
    document.getElementById("condition").innerText = condition;
    needle.style.transform = `rotate(${angle}deg)`;
}

const calculateBtn = document.getElementById("calculate-btn");
if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateBMI);
}


// ==========================================
// 3. ANIMATED CARDS STACK
// ==========================================
let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
    let angle = 0;
    cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
            card.style.transform = `translateY(-120vh) rotate(-48deg)`;
        } else {
            card.style.transform = ` rotate(${angle}deg)`;
            angle = angle - 10;
            card.style.zIndex = cards.length - index;
        }
    });
}

if (stackArea && cards.length > 0) {
    rotateCards();
    window.addEventListener("scroll", () => {
        let distance = window.innerHeight * 0.5;
        let topVal = stackArea.getBoundingClientRect().top;
        let index = -1 * (topVal / distance + 1);
        index = Math.floor(index);

        for (let i = 0; i < cards.length; i++) {
            if (i <= index) {
                cards[i].classList.add("away");
            } else {
                cards[i].classList.remove("away");
            }
        }
        rotateCards();
    });
}


// ==========================================
// 4. CONTACT FORM (EmailJS)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init("P1s3FI_glKoGLJWiW"); 
    }

    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const formMessage = document.getElementById("form-message");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            // UX: Button shows "Sending..."
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            formMessage.innerText = "";
            formMessage.className = "form-message";

            // 🔴 IMPORTANT 🔴 
            // Put your new CONTACT FORM Template ID here. 
            // (Do NOT use template_ca6astl, as that is your Welcome Email template!)
            const SERVICE_ID = "service_hnomdjb";
            const TEMPLATE_ID = "template_dnjzic9"; 

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(() => {
                    // Success
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    formMessage.innerText = "Message sent successfully!";
                    formMessage.classList.add("success");
                    contactForm.reset(); 
                })
                .catch((error) => {
                    // Error
                    console.error("EmailJS Error:", error);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    formMessage.innerText = "Failed to send message. Please try again.";
                    formMessage.classList.add("error");
                });
        });
    }
});

