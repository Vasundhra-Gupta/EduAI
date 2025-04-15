import jwt from 'jsonwebtoken';

/**
 * Util to generate Token
 * @param {Object} data - The data which needs to be in the token
 * @returns JWT Token
 */

const generateToken = async (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

/**
 * @param {object} req - The http req object to extract the token from.
 * @returns access token
 */

const extractToken = (req) => {
    return (
        req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1]
    );
};

export { extractToken, generateToken };
