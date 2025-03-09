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

    // -----------------------------------------------------------------------------------------
     // Este es el evento para mostrar la imagen y el texto al hacer clic en el sobre
    envelope.addEventListener("click", () => {
        imageContainer.style.display = "block";  // Mostrar la imagen al hacer clic en el sobre
        photoText.style.display = "block";  // Mostrar el texto

        // Iniciar el spameo de palabras después de 3 segundos
        setTimeout(() => {
            spamWords(wordToSpam);  // Llamar a la función para spampear la palabra
        }, 3000);  // 3 segundos después de mostrar la foto
    });

    // Función para crear las palabras flotantes
    function spamWords(word) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Generar palabras flotantes aleatorias
        for (let i = 0; i < 50; i++) {  // Número de veces que aparecerá la palabra
            const floatingWord = document.createElement("div");
            floatingWord.classList.add("floating-word");
            floatingWord.innerText = word;

            // Generar direcciones aleatorias para X y Y
            const randomX = Math.random() * screenWidth * 2 - screenWidth;  // X aleatorio
            const randomY = Math.random() * screenHeight * 2 - screenHeight;  // Y aleatorio
            const randomDirectionX = (Math.random() < 0.5 ? -1 : 1);  // Dirección X aleatoria
            const randomDirectionY = (Math.random() < 0.5 ? -1 : 1);  // Dirección Y aleatoria

            // Establecer la dirección aleatoria para las palabras
            floatingWord.style.setProperty('--random-x', `${randomX * randomDirectionX}px`);
            floatingWord.style.setProperty('--random-y', `${randomY * randomDirectionY}px`);

            // Agregar la palabra al body
            document.body.appendChild(floatingWord);

            // Animación para rebotar las palabras
            moveFloatingWord(floatingWord);
        }
    }

    // Función para mover las palabras y hacer que reboten
    function moveFloatingWord(floatingWord) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let xPos = Math.random() * screenWidth;
        let yPos = Math.random() * screenHeight;
        let xVel = (Math.random() - 0.5) * 2;  // Velocidad de movimiento aleatoria
        let yVel = (Math.random() - 0.5) * 2;  // Velocidad de movimiento aleatoria

        function updatePosition() {
            xPos += xVel;
            yPos += yVel;

            // Rebotar en los bordes de la pantalla
            if (xPos <= 0 || xPos >= screenWidth) {
                xVel = -xVel;  // Cambiar la dirección X cuando golpea los bordes
            }
            if (yPos <= 0 || yPos >= screenHeight) {
                yVel = -yVel;  // Cambiar la dirección Y cuando golpea los bordes
            }

            // Actualizar la posición de la palabra
            floatingWord.style.left = `${xPos}px`;
            floatingWord.style.top = `${yPos}px`;

            // Llamar a la función de nuevo para animar el movimiento
            requestAnimationFrame(updatePosition);
        }

        updatePosition();
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
        }
        
        .terms-btn {
            font-size: 12px;
            color: white;
            text-decoration: underline;
            background: none;
            border: none;
            cursor: pointer;
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
