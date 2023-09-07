const loginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    password:
                    <input
                        type="text"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default loginForm