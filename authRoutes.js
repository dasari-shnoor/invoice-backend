const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, contact } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('SELECT register_user($1, $2, $3, $4, $5)', [
            first_name, last_name, email, hashedPassword, contact || ''
        ]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error during registration', details: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userQuery = await pool.query('SELECT user_id, email, password, role, status FROM users WHERE email = $1', [email]);
        if (userQuery.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = userQuery.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1', [user.user_id]);

        res.json({
            user_id: user.user_id,
            email: user.email,
            role: user.role,
            status: user.status
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error during login' });
    }
});

module.exports = router;
