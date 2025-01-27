import { Link, useNavigate } from "react-router"
import axios from "axios"
import { useContext, useState } from "react"

import { AuthContext } from "../../contex/authContext"

import video from "../../assets/social-media.mp4"

import styles from "./Auth.module.css"

const Auth = ({ 
    children, 
    authText, 
    authAccText, 
    authLink, 
    authLinkText, 
    input,
    link
}) => {
    const [err, setErr] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            if (link === "/register") {
                await axios.post("http://localhost:7777/api/auth/register", input)
                navigate("/login")
            } else if(link === "/login") {
                login(input);
            }
        } catch (error) {
            setErr(true)
        }
    }

    return (
        <div className={styles.auth}>
            <div className={styles.auth__content}>
                <h1 className={styles.auth__title}>Welcome</h1>

                <form className={styles.auth__form}>
                    {children}

                    <button onClick={handleClick} className={styles.auth__btn}>
                        {authText}
                    </button>
                    <p className={styles.auth__text}>
                        {authAccText} <Link to={authLink}>{authLinkText}</Link>
                    </p>
                </form>
            </div>

            <div className={styles.auth__video}>
                <video autoPlay muted loop>
                    <source src={video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            </div>
        </div>
    )
}

export default Auth