const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const apiResponse = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
            { inputs: message },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const reply = apiResponse.data.generated_text || 'No response from SMChatAI2.';
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response from SMChatAI2' });
    }
});
app.listen(PORT, () => {
    console.log(`SMChatAI2 running on port ${PORT}`);
});