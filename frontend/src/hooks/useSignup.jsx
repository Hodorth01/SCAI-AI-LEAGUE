import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (userName, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://scai-ai-league-production.up.railway.app/api/user/signup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName, password })
        })
        if (!response.ok) {
            // If not OK, try to parse the JSON error message
            const json = await response.json();
            setError(json.error || 'Something went wrong');
            setIsLoading(false);
            return;
        }
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}