const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username:
                    <input
                        value={username}
                        onChange={handleUsernameChange}/>
                </div>
                <div>
                    password:
                    <input
                        value={password}
                        onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}


export default LoginForm