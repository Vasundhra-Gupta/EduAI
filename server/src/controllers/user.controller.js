import {
    OK,
    COOKIE_OPTIONS,
    NOT_FOUND,
    BAD_REQUEST,
} from '../Constants/index.js';
import { tryCatch, ErrorHandler, generateToken } from '../utils/index.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

const login = tryCatch('login as contractor', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('missing fields', BAD_REQUEST));
    }

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler('user not found', NOT_FOUND));

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
        return next(new ErrorHandler('invalid credentials', BAD_REQUEST));
    }

    // generate token
    const accessToken = await generateToken({ _id: user._id });

    return res
        .status(OK)
        .cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: Number(process.env.ACCESS_TOKEN_MAXAGE),
        })
        .json(user);
});

const logout = tryCatch('logout user', async (req, res) => {
    return res
        .status(OK)
        .clearCookie('accessToken', COOKIE_OPTIONS)
        .json({ message: 'user loggedout successfully' });
});

const getCurrentUser = tryCatch('get current user', async (req, res) => {
    let { password, ...user } = req.user;
    return res.status(OK).json(user);
});

export { getCurrentUser, login, logout };
