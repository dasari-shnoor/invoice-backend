const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/send', async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        await pool.query('SELECT send_message($1, $2, $3)', [sender, receiver, message]);
        res.status(201).json({ message: 'Message sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:user1/:user2', async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const result = await pool.query('SELECT * FROM get_chat($1, $2)', [user1, user2]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
