import { useQuery } from "@tanstack/react-query"

import Post from "../post/Post"
import { makeRequest } from "../../axios"

import styles from "./Posts.module.css"

const Posts = ({ link, isEcclipsis }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await makeRequest.get(link)
            return res.data
        }
    })

    if (isLoading) {
        return <div>Loading...</div>
      }
    
      if (error) {
        return <div>Something went wrong!</div>
      }

    return (
        <div className={styles.posts}>
            {
                data.length !== 0 ?
                data.map((post) => (
                    <Post key={post.id} post={post} isEcclipsis={isEcclipsis} />
                )) :
                <div>No posts</div>
            }
        </div>
    )

}

export default Posts