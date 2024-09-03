const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');  

const User = {
    create: async (username, email, password, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO register (username, email, password) VALUES (?, ?, ?)';
            db.query(sql, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    },
    authenticate: async (email, password, callback) => {
        try {
            const sql = 'SELECT * FROM register WHERE email = ?';
            db.query(sql, [email], async (err, results) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (results.length === 0) {
                    callback(new Error('User not found'), null);
                    return;
                }
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.generateToken({ id: user.id, email: user.email });
                    callback(null, { user, token });
                } else {
                    callback(new Error('Invalid password'), null);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    }
};

module.exports = User;
