import { useState } from "react"

import Auth from "../../components/auth/Auth"
import Input from "../../components/input/Input"

import styles from "./Register.module.css"

const Register = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    return (
        <Auth 
            authAccText="Have an account?" 
            authText="Register" 
            authLink="/login" 
            authLinkText="Sign in" 
            input={input}
            link="/register"
        >
            <Input type="text" placeholder="Username" name="username" setInput={setInput} />
            <Input type="email" placeholder="Email" name="email" setInput={setInput} />
            <Input type="password" placeholder="Password" name="password" setInput={setInput} />
        </Auth>
    )
}

export default Register