document.addEventListener("DOMContentLoaded", function () {
    // Selección de elementos
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const thinkButton = document.getElementById("think");
    const message = document.getElementById("message");
    const countdownElement = document.getElementById("countdown");
    const envelope = document.getElementById("envelope");
    const imageContainer = document.getElementById("image-container");
    const hiddenImage = document.getElementById("hidden-image");
    const photoText = document.getElementById("photo-text");

    let countdownTimer;
    const wordToSpam = "GAY";

    if (yesButton) {
        yesButton.addEventListener("click", () => {
            message.innerHTML = "Sabía que dirías que sí 😊❤️";
            message.style.color = "#4CAF50";
            envelope.style.display = "block";
            envelope.classList.add("appear");
        });
    }

    if (noButton) {
        noButton.addEventListener("mouseover", () => {
            const maxX = window.innerWidth - noButton.clientWidth;
            const maxY = window.innerHeight - noButton.clientHeight;
            noButton.style.position = "absolute";
            noButton.style.left = `${Math.random() * maxX}px`;
            noButton.style.top = `${Math.random() * maxY}px`;
        });
    }

    if (thinkButton) {
        thinkButton.addEventListener("click", () => {
            countdownElement.style.display = "block";
            let countdown = 60;
            let acceleratedTime = 0;

            countdownTimer = setInterval(() => {
                acceleratedTime += 1;
                let timeLeft = countdown - Math.floor(acceleratedTime / 10);
                if (timeLeft < 0) timeLeft = 0;
                countdownElement.innerHTML = `${timeLeft} segundos restantes...`;

                if (acceleratedTime >= 50) {
                    clearInterval(countdownTimer);
                    message.innerHTML = "Ups... tuviste mucho tiempo, eso es un Sí 😴";
                    message.style.color = "#000000";
                }
            }, 100);

            setTimeout(() => {
                message.innerHTML = "¡Ups... tuviste mucho tiempo, eso es un Sí 😴";
                message.style.color = "#000000";
                countdownElement.style.display = "none";
            }, 5000);
        });
    }

    if (envelope) {
        envelope.addEventListener("click", () => {
            imageContainer.style.display = "block";
            if (photoText) photoText.style.display = "block";
            setTimeout(() => spamWords(wordToSpam), 3000);
        });
    }

    if (photoText) {
        photoText.addEventListener("click", function () {
            window.location.href = "terminos.html";
        });
    }

    function goToTerms() {
        window.location.href = "terminos.html";
    }

    // Crear el botón de "Términos y Condiciones"
    const termsContainer = document.createElement("div");
    termsContainer.classList.add("terms-container");

    const termsButton = document.createElement("button");
    termsButton.classList.add("terms-btn");
    termsButton.innerText = "Términos y Condiciones";
    termsButton.addEventListener("click", goToTerms);

    termsContainer.appendChild(termsButton);
    document.body.appendChild(termsContainer);

    // Agregar estilos
    const style = document.createElement("style");
    style.innerHTML = `
        .terms-container {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            background: rgba(0, 0, 0, 0.7);
            padding: 5px;
            border-radius: 5px;
        }

        .terms-btn {
            font-size: 12px;
            color: white;
            text-decoration: underline;
            background: none;
            border: none;
            cursor: pointer;
            text-align: center;
        }

        .terms-btn:hover {
            text-decoration: none;
            color: #ddd;
        }
    `;
    document.head.appendChild(style);

    // Debugging: Comprobar si el botón se crea en el DOM
    console.log("Botón de Términos y Condiciones agregado al DOM.");
});
