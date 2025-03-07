document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const thinkButton = document.getElementById("think");
    const message = document.getElementById("message");
    const countdownElement = document.getElementById("countdown");
    const envelope = document.getElementById("envelope");
    const imageContainer = document.getElementById("image-container");
    const hiddenImage = document.getElementById("hidden-image");
    const photoText = document.getElementById("photo-text");  // Seleccionamos el texto

    let countdownTimer;
    const wordToSpam = "GAY";  // Palabra que se va a spamear

    yesButton.addEventListener("click", () => {
        message.innerHTML = "Sabía que dirías que sí 😊❤️";
        message.style.color = "#4CAF50";
        
        // Mostrar el sobre con una animación o transiciones
        envelope.style.display = "block"; // Cambiar display a block
        envelope.classList.add("appear"); // Asegúrate de que haya una clase para la animación si la deseas
    });

    noButton.addEventListener("mouseover", () => {
        const maxX = window.innerWidth - noButton.clientWidth;
        const maxY = window.innerHeight - noButton.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noButton.style.position = "absolute";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    });

    thinkButton.addEventListener("click", () => {
        // Inicia la cuenta atrás
        countdownElement.style.display = "block"; // Asegura que el contador sea visible
        let countdown = 60; // 60 segundos reales
        let acceleratedTime = 0; // Variable para acelerar el tiempo

        countdownTimer = setInterval(() => {
            acceleratedTime += 1; // Acelera el tiempo de cuenta atrás en 1 segundo real cada vez

            // Calcular el tiempo restante a mostrar (esto acelerará visualmente el tiempo)
            let timeLeft = countdown - Math.floor(acceleratedTime / 10);
            if (timeLeft < 0) timeLeft = 0; // Para no mostrar tiempos negativos

            countdownElement.innerHTML = `${timeLeft} segundos restantes...`;

            // Cuando llegue al final de los 5 segundos reales (equivalentes a 60 segundos en el contador acelerado)
            if (acceleratedTime >= 50) {
                clearInterval(countdownTimer);
                message.innerHTML = "suficiente tiempo... ns pa k si yo se que es un Sí 😴";
                message.style.color = "#000000	";
            }
        }, 100); // Acelera cada 100ms

        // Después de 5 segundos reales, mostrar el mensaje final
        setTimeout(() => {
            message.innerHTML = "suficiente tiempo... ns pa k si yo se que es un Sí 😴";
            message.style.color = "#000000	";
            countdownElement.style.display = "none"; // Ocultar el contador
        }, 5000); // 5 segundos reales
    });

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

    // Crear el botón de Términos y Condiciones dinámicamente
    const termsContainer = document.createElement("div");
    termsContainer.classList.add("terms-container");
    
    const termsButton = document.createElement("button");
    termsButton.classList.add("terms-btn");
    termsButton.innerText = "Términos y Condiciones";
    termsButton.addEventListener("click", goToTerms); // Evento para redirigir
    
    termsContainer.appendChild(termsButton);
    document.body.appendChild(termsContainer);
    
    // Agregar estilos para el botón
    const style = document.createElement("style");
    style.innerHTML = `
        .terms-container {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 8px;
        }
    
        .terms-btn {
            padding: 8px 15px;
            font-size: 14px;
            background-color: #222;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: background 0.3s;
        }
    
        .terms-btn:hover {
            background-color: #444;
        }
    `;
    document.head.appendChild(style);

});
