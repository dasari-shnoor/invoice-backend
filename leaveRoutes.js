const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/apply', async (req, res) => {
    try {
        const { user_id, type, start, end, reason } = req.body;
        await pool.query('SELECT apply_leave($1, $2, $3, $4, $5)', [
            user_id, type, start, end, reason
        ]);
        res.status(201).json({ message: 'Leave applied' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/status', async (req, res) => {
    try {
        const { leave_id, status } = req.body;
        await pool.query('SELECT update_leave_status($1, $2)', [leave_id, status]);
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
