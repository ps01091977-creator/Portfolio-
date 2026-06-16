import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with dynamic settings (ready for Render/Vercel deployment)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL // Vercel client URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow local network IPs for mobile testing (e.g., 192.168.x.x, 10.x.x.x)
    if (origin.startsWith('http://192.168.') || origin.startsWith('http://10.') || origin.startsWith('http://172.')) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: "Priyanshu Shakya's Portfolio Email Server is running."
  });
});

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.'
  });
});

console.log("Backend restarted to load new environment variables.");

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server successfully started on port ${PORT} (0.0.0.0)`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
});
