import Axios from "axios";

export const login = user => {
    return Axios
        .post('/usuarios/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data);
            return res.data;
        })
        .catch(err => console.error(err));
}