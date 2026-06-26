export function saveToken (token) {
    localStorage.setItem("token", token);
}

export function getToken () {
    return localStorage.getItem("token");
}

export function isLoggedIn () {
    const token = getToken();
    return !!token;
}

export function logout() {
    localStorage.removeItem('token');
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            Authorization: `Bearer ${getToken()}`,
        },
    });
}