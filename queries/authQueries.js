const createUserQuery = `
    INSERT INTO users
    (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email;
`;

const getUserByEmailQuery = `
    SELECT *
    FROM users
    WHERE email = $1;
`;

const getUserByIdQuery = `
    SELECT id, name, email
    FROM users
    WHERE id = $1;
`;

module.exports = {
    createUserQuery,
    getUserByEmailQuery,
    getUserByIdQuery,
};