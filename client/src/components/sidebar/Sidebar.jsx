import { NavLink } from "react-router"
import { IoHomeSharp } from "react-icons/io5";
import { BsFileEarmarkPost } from "react-icons/bs";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../contex/authContext";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className={styles.sidebar}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            <IoHomeSharp />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-posts">
                            <BsFileEarmarkPost />
                            <span>My Posts</span>
                        </NavLink>
                    </li>
                    <li>
                        {
                            currentUser ?
                            <button onClick={logout}>
                                <IoLogOut />
                                <span>Log out</span>
                            </button> :
                            <NavLink to="/login">
                                <IoLogIn />
                                <span>Log in</span>
                            </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar