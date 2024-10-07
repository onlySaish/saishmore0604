const pool = require('../db');

// User signup
exports.signup = async (req, res) => {
    const { name, email, password, userRole = 'user' } = req.body; // Default role is 'user'
    const client = await pool.connect(); 
    try {
        await client.query('BEGIN');
        // const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const emailCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            // return res.status(400).json({ error: 'Email already exists' });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Email already exists' });
        }
        // const result = await pool.query(
        //     'INSERT INTO users (name, email, password, userRole) VALUES ($1, $2, $3, $4) RETURNING *',
        //     [name, email, password, userRole]
        // );
        const result = await client.query(
            'INSERT INTO users (name, email, password, userRole) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password, userRole]
        );
        await client.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'Error signing up' });
    } finally {
        // Release the client back to the pool
        client.release();
    }

};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.userrole === 'admin') {
                res.status(200).json({ message: 'Login successful', redirect: '/dashboard' });
            } else {
                res.status(200).json({ message: 'Login successful', redirect: '/donation' });
            }
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

// View ongoing campaigns
// exports.viewCampaigns = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM campaigns');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error fetching campaigns' });
//     }
// };
