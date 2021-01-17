import React from 'react'


const LoginForm = ({handleLogin, username, password, setUserName, setPassword}) => {

    return (
        <form onSubmit={handleLogin}>
            <div>username <input
                type="text"
                name="Username"
                value={username}
                onChange={e => {
                    setUserName(e.target.value)
                }}
            />
            </div>
            <div>password
                <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm