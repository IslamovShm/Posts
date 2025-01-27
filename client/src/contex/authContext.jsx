import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"


export const AuthContext = createContext({
    currentUser: null,
    login: () => {},
    logout: () => {}
})

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const navigate = useNavigate()

    const login = async (input) => {
        const res = await axios.post("http://localhost:7777/api/auth/login", input, {
            withCredentials: true
        })

        setCurrentUser(res.data)

        if (res.status === 200) {
            navigate("/")
        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:7777/api/auth/logout", {}, {
                withCredentials: true
            })
            setCurrentUser(null)
            localStorage.removeItem("user")
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", err)
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}