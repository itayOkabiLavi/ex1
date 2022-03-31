import React from 'react'

export default function Login({ setToken }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target[0].value
        let pass = e.target[1].value
        const token = loginUser(name, pass);
        setToken(token);
    }
    function loginUser(userName, password) {
        let t = users.findIndex((x) => { return x.userName === userName && x.password === password; });
        return t !== -1;
    }
    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input name='userName' type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input name='password' type="password" />
                </label>
                <div>
                    <button type="submit" onSubmit={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

const users = [
    { userName: 'y', password: '1' },
    { userName: 'i', password: '2' },
    { userName: 'yehuda', password: 'ggfdtgrg' },
    { userName: 'haim', password: 'klfhrjgbw' },
    { userName: 'itay', password: '4254v56g4' },
    { userName: 'gilad', password: '4h6er47r' },
    { userName: 'rivka', password: 'g5r98y6' },
    { userName: 'shprintze', password: 'w272gwe' },
    { userName: 'sterna', password: 'vd25as' },
    { userName: 'adi', password: 'v205dsa' },
    { userName: 'igal', password: '41v6583w' },
];
