import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password)
    }
    return (
        <div className="p-2">
            <form className="signup text-white" onSubmit={handleSubmit}>
                <h3 className="mb-4">Sign Up</h3>

                <label className="form-label d-block">Username:</label>
                <input
                    className="d-block"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label className="form-label d-block">Password:</label>
                <input
                    className="d-block"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading} className="button mt-3 me-1">Sign up</button>
                <a href="/login" className="url"> Already have an account?</a>

                {error && <div className="error">{error}</div>}
            </form>            
        </div>

    )
}

export default Signup