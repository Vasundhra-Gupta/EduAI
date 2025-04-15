import jwt from 'jsonwebtoken';
import { BAD_REQUEST, FORBIDDEN, COOKIE_OPTIONS } from '../constants/index.js';
import { extractToken } from '../utils/index.js';
import { User } from '../models/index.js';

/**
 * @param {String} token - token to verify
 * @param {String} type  - type of token (access or refresh)
 * @returns {Object} null or current user object with user role
 */

const validateToken = async (token, type) => {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) throw new Error(`invalid access token`);
    const currentUser = await User.findById(decodedToken._id).lean();
    if (!currentUser) throw new Error('user not found');
    return currentUser;
};

const verifyJwt = async (req, res, next) => {
    try {
        const accessToken = extractToken(req);

        if (accessToken) {
            req.user = await validateToken(accessToken, 'access');
            return next();
        } else {
            return res.status(BAD_REQUEST).json({ message: 'tokens missing' });
        }
    } catch (err) {
        return res
            .status(FORBIDDEN)
            .clearCookie('accessToken', COOKIE_OPTIONS)
            .json({
                message: 'Invalid jwt token',
                err: err.message,
            });
    }
};

const optionalVerifyJwt = async (req, res, next) => {
    try {
        const accessToken = extractToken(req);
        if (accessToken) {
            req.user = await validateToken(accessToken, 'access');
        }
        return next();
    } catch (err) {
        return res
            .status(FORBIDDEN)
            .clearCookie('accessToken', COOKIE_OPTIONS)
            .json({
                message: 'Invalid jwt token',
                err: err.message,
            });
    }
};

export { verifyJwt, optionalVerifyJwt };
