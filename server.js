require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', chatRoutes);
app.use('/api/leaves', leaveRoutes);

app.get('/', (req, res) => {
    res.send('Shnoor Invoicing API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
