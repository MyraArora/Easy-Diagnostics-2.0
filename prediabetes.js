document.getElementById("sendMessage").addEventListener("click", function () {
    const userMessage = document.getElementById("userMessage").value.trim();
    if (userMessage === "") return;

    // Display the user's message
    displayMessage(userMessage, 'user');

    // Clear the input field
    document.getElementById("userMessage").value = "";

    // Send message to the backend
    sendMessageToBackend(userMessage);
});

// Function to display message in the chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to send the message to the Python Flask backend
function sendMessageToBackend(userMessage) {
    const apiUrl = "http://127.0.0.1:5000/ask";  // Replace with your deployed URL

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage })
    })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response || "Sorry, I didn't understand that.";
            displayMessage(botResponse, 'bot');
        })
        .catch(error => {
            console.error("Error:", error);
            displayMessage("Sorry, there was an error. Please try again later.", 'bot');
        });
}
