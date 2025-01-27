import { useMutation, useQueryClient } from "@tanstack/react-query"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"

import { makeRequest } from "../../axios"

import styles from "./MyPosts.module.css"


const MyPosts = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest.post("/posts", newPost)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    return (
        <div className={styles.my_posts}>
            <Share 
                mutation={mutation} 
                placeholder="Share your post"
                textBtn="Share"
            />

            <Posts link="/posts/my-posts" isEcclipsis={true} />
        </div>
    )
}

export default MyPosts