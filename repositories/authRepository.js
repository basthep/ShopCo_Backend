const pool = require("../config/db");

const {
    createUserQuery,
    getUserByEmailQuery,
    getUserByIdQuery,
} = require("../queries/authQueries");


const createUser = async (
    name,
    email,
    password
) => {

    const result = await pool.query(
        createUserQuery,
        [
            name,
            email,
            password,
        ]
    );

    return result.rows[0];
};


const getUserByEmail = async (email) => {

    const result = await pool.query(
        getUserByEmailQuery,
        [email]
    );

    return result.rows[0];
};


const getUserById = async (id) => {

    const result = await pool.query(
        getUserByIdQuery,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};