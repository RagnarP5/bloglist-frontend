const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username:
                    <input
                        id='username'
                        value={username}
                        onChange={handleUsernameChange}/>
                </div>
                <div>
                    password:
                    <input
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button id='login-button' type="submit">login</button>
                </div>
            </form>
        </div>
    )
}


export default LoginForm