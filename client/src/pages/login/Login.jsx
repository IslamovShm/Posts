import { useState } from "react"

import Auth from "../../components/auth/Auth"
import Input from "../../components/input/Input"

import styles from "./Login.module.css"

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    return (
        <Auth 
            authAccText="Don't have an account?" 
            authText="Login" 
            authLink="/register" 
            authLinkText="Sign up" 
            input={input}
            link="/login"
        >
            <Input type="email" placeholder="Email" setInput={setInput} name="email" />
            <Input type="password" placeholder="Password" setInput={setInput} name="password" />
        </Auth>
    )
}

export default Login