const { sequelize, User } = require('../modles');

const getAllUser = async (req, res) => {
    try {

    } catch (err) {
        console.error('', err);
        res.status(500),json({ error: '' });
    }
};

const getUserById = async (req, res) => {
    try {

    } catch (err) {
        console.error('', err);
        res.status(500),json({ error: '' });
    }
};

const createUser = async (req, res) => {
    try {

    } catch (err) {
        console.error('', err);
        res.status(500),json({ error: '' });
    }
};

const updateUser = async (req, res) => {
    try {

    } catch (err) {
        console.error('', err);
        res.status(500),json({ error: '' });
    }
};

const deleteUser = async (req, res) => {
    try {

    } catch (err) {
        console.error('', err);
        res.status(500),json({ error: '' });
    }
};

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};