import { SERVER_ERROR, BASE_BACKEND_URL } from '../constants/constants';

class UserService {
    async login({ email, password }) {
        try {
            const res = await fetch(`${BASE_BACKEND_URL}/users/login`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log(data);

            if (res.status === SERVER_ERROR) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in login service', err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            const res = await fetch(`${BASE_BACKEND_URL}/users`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === SERVER_ERROR) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in getCurrentUser service', err);
            throw err;
        }
    }

    async logout() {
        try {
            const res = await fetch(`${BASE_BACKEND_URL}/users/logout`, {
                method: 'PATCH',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === SERVER_ERROR) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in logout service', err);
            throw err;
        }
    }
}

export const userService = new UserService();
