async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const responseElement = document.getElementById('response');
    if (!userInput) {
        responseElement.textContent = 'Please type a question!';
        return;
    }
    responseElement.textContent = 'SMChatAI2 is thinking...';
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        responseElement.textContent = data.reply || 'No answer from SMChatAI2.';
    } catch (error) {
        responseElement.textContent = 'Error: Could not connect to SMChatAI2.';
    }
}