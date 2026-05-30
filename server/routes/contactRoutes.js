import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';
import contactLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/contact - Secure email route
router.post('/', contactLimiter, sendContactEmail);

export default router;
