import decodeJwt from 'jwt-decode';

export default {
    login: ({username, password}) => {
        const request = new Request(`http://0.0.0.0:3000/api/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                const decodedToken = decodeJwt(res.accessToken);
                const {id, confirmed, roles, accessToken} = res;
                localStorage.setItem('confirmed', confirmed);
                localStorage.setItem('token', accessToken);
                localStorage.setItem('permissions', roles);
                localStorage.setItem('userId', id);
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    checkError: error => {
        console.error(error)
        // ...
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.resolve('guest')
    },
    getIdentity : () => {
        const confirmed = localStorage.getItem("confirmed");
        return Promise.resolve(confirmed);
    }

};
