import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { performSimpleOneQuery} from "./generic.js";
import {replaceRoleIdWithName} from "./user-controller.js";

export async function checkToken(req, res) {
    const givenEmail = req.body.email;
    const givenPassword = req.body.password;

    try {
        const foundUser = await getUser(givenEmail);
        if (!foundUser) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const storedPassword = foundUser.password;
        checkPassword(givenPassword, storedPassword, foundUser, res);
    } catch (error) {
        console.error('Error checking token:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUser(givenEmail) {
    try {
        return performSimpleOneQuery('users','GET','email',givenEmail)
            .then((result) => {
                if(result.length === 0) return false;
                return result[0];
            });
    } catch (error) {
        throw error;
    }
}

async function checkPassword(givenPassword, storedPassword, user, res) {
    bcrypt.compare(givenPassword, storedPassword, function (err, result) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        } else if (result) {
            createToken(user, res);
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    });
}

async function createToken(user, res) {
    user = await replaceRoleIdWithName(user)
    console.log(user);
    const payload = {
        email: user.email,
        role: user.role,
        id: user.userid
    };
    jwt.sign(payload, 'secretKey', { expiresIn: '12h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Token generation failed' });
        } else {
            console.log("Token generation is successful");
            return res.status(200).json({ token, user: jwt.decode(token) });
        }
    });
}

