import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  // You can add more fields like userId, sessionId, etc. as needed
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to user model if you have user authentication
    required: false // Make it optional for now
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
chatSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a compound index for faster queries
chatSessionSchema.index({ userId: 1, sessionId: 1 });

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);

export default ChatSession;
