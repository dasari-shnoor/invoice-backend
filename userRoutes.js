const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/dashboard', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_dashboard()');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM get_user_profile($1)', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, mobile, dob, photo } = req.body;
        await pool.query('SELECT update_profile($1, $2, $3, $4, $5, $6)', [
            id, first_name, last_name, mobile, dob, photo
        ]);
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
