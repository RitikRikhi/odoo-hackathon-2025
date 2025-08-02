const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Routes
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticket');

dotenv.config();
const app = express();

// ✅ MIDDLEWARE (Correct Order)
app.use(cors());

// ✅ 1. Parses JSON body for POST requests
app.use(express.json());

// ✅ 2. Parses form data (like URL-encoded from forms)
app.use(express.urlencoded({ extended: true }));

// ✅ 3. Handles file uploads (only needed for attachments)
app.use(fileUpload());

// ✅ ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// ✅ DATABASE + SERVER START
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('✅ Server started on port 5000')))
  .catch(err => console.error('❌ DB Connection Error:', err));
