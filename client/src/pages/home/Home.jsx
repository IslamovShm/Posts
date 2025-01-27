import Posts from "../../components/posts/Posts"

import styles from "./Home.module.css"

const Home = () => {

    return (
        <div className={styles.home}>
            <Posts link="/posts" isEcclipsis={false} />
        </div>
    )
}

export default Home