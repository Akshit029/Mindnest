import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from './config/db.js';
import ChatSession from './models/chatModel.js';
import { v4 as uuidv4 } from 'uuid';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Mindnest API' });
});

// Create or get chat session
app.post('/api/chat/session', async (req, res) => {
  try {
    const { userId } = req.body;
    const sessionId = uuidv4();
    
    const newSession = new ChatSession({
      userId: userId || null,
      sessionId,
      messages: []
    });

    await newSession.save();

    res.status(201).json({
      success: true,
      sessionId,
      message: 'Chat session created successfully'
    });
  } catch (error) {
    console.error('Error creating chat session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create chat session'
    });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    // Find or create session
    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({
        sessionId,
        messages: []
      });
    }

    // Add user message to session
    session.messages.push({
      content: message,
      sender: 'user'
    });

    // Save user message to database
    await session.save();

    // System prompt for mental wellness support
    const systemPrompt = {
      role: "user",
      parts: [{
        text: `You are a compassionate mental wellness assistant. Your role is to listen, provide emotional support, and offer helpful, non-judgmental guidance. You never diagnose or act as a therapist. Always suggest professional help for serious issues. Be empathetic, calming, and supportive. If a user expresses suicidal thoughts, respond with concern and suggest they contact emergency services or a professional.`
      }]
    };

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare chat history for the AI
    const aiHistory = [
      systemPrompt,
      ...history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    // Prepare chat with history
    const chat = model.startChat({
      history: aiHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });

    // Generate response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const aiResponse = response.text();

    // Add AI response to session
    session.messages.push({
      content: aiResponse,
      sender: 'ai'
    });

    // Save AI response to database
    await session.save();

    res.json({ 
      success: true, 
      message: aiResponse,
      sessionId: session.sessionId
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process your request' 
    });
  }
});

// Get chat history
app.get('/api/chat/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatSession.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      messages: session.messages
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history'
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});