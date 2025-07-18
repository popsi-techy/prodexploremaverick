import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Define an array of allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',          // Your local development frontend
  'https://exploremaverick.web.app', // Your Firebase Hosting default URL
  'https://prodexploremaverick-frontend.onrender.com', // Keep this ONLY if you still have an active frontend on Render that needs to access this backend
  // 'https://your-custom-domain.com'  // Add your custom domain here if you set one up for Firebase Hosting
];

app.use(cors({
  origin:  allowedOrigin // Use the environment variable
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask-gemini', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-1.5-pro"

    // Construct the prompt to explicitly ask for a short, crisp paragraph answer
    const fullPrompt = `Answer the following question concisely, in a single, short, and crisp paragraph. Do not provide extra details or bullet points.
    
    Question: ${question}`;

    const result = await model.generateContent(fullPrompt); // Use the modified prompt
    const response = await result.response;
    let text = response.text();

    // Remove the client-side truncation, as the AI will handle conciseness
    // const maxLength = 100;
    // if (text.length > maxLength) {
    //   text = text.substring(0, maxLength) + '...';
    // }

    res.json({ answer: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get an answer from Gemini API.' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});