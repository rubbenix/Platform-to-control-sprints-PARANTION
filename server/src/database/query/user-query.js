//Everytime close and run the server again, it drops the tables and creates it again with dummy data
//We can change it later on
export const dropUserTable = `DROP TABLE IF EXISTS users;`;
export const dropBoardUserTable = `DROP TABLE IF EXISTS TestBoardUser;`;

export const dropTestBoardTable = `DROP TABLE IF EXISTS TestBoard;`;

export const dropTestTable = `DROP TABLE IF EXISTS Test;`;

export const dropTestStepTable = `DROP TABLE IF EXISTS TestStep;`;


export const getAllUsersQuery = `SELECT * FROM users ;`;

export const getUserById = `SELECT * FROM users WHERE userid = $1;`;

export const createNewUser = `INSERT INTO users (email, role, password) VALUES ($1, $2, $3) RETURNING *;`;

export const updateUser = `UPDATE users SET email = $1, role = $2, password = $3 WHERE userid = $4 RETURNING *;`;

export const deleteUser = `DELETE FROM users WHERE userid = $1;`;