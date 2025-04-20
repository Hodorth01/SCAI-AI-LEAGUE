import { useState } from "react"
import {useLogin} from "../hooks/useLogin"
const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { login , error , isLoading} = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(userName, password)
    }

    return (
        <div className="p-2">
        <form className="login text-white " onSubmit={handleSubmit}>
            <h3 className="mb-4 text-white">Log In</h3>
            <label className="form-label d-block text-white">Username:</label>
            <input
                className="d-block "
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />
            <label className="form-label d-block text-white">Password:</label>
            <input
                className="d-block"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading} className="button mt-3 me-1 text-white">Log in</button>
            <a href="/signup" className="url "> you don't have an account?</a>
            {error && <div className="error">{error}</div>}
        </form>
        </div>

    )
}

export default Login