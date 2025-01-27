import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { makeRequest } from "../../axios";

import styles from "./Post.module.css"
import Share from "../share/Share";

const Post = ({ post, isEcclipsis }) => {
    const [isActive, setIsActive] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            return makeRequest.delete(`/posts/${postId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }

    const editMutation = useMutation({
        mutationFn: (updatePost) => {
            return makeRequest.patch(`/posts/${post.id}`, {
                content: updatePost.content,
                media_url: updatePost.media_url
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            setIsEdit(false)
            setIsActive(false)
        },
    })

    return (
        <>
            <div className={styles.post}>
                <div className={styles.post__header_wrapper}>
                    <div className={styles.post__header}>
                        <RxAvatar />
                        <h3>{ post.username }</h3>
                    </div>
                    {
                        isEcclipsis &&
                        <div className={styles.post__options_wrapper}>
                            {
                                isActive ?
                                <div className={styles.post__options}>
                                    <button className={styles.close} onClick={() => {setIsActive(false); setIsEdit(false)}}>
                                        <RxCross2 />
                                    </button>
                                    <button className={styles.delete} onClick={handleDelete}>
                                        <RiDeleteBin6Line />
                                        Delete
                                    </button>
                                    <button className={styles.edit} onClick={() => setIsEdit(true)}>
                                        <FaEdit />
                                        Edit
                                    </button>
                                </div> :
                                <button onClick={() => setIsActive(true)}>
                                    <IoEllipsisVerticalSharp />
                                </button>
                            }
                        </div>
                    }
                </div>

                {
                    post.media_url &&
                    <div className={styles.post__media}>
                        <video
                            autoPlay muted loop
                            poster={`http://localhost:7777${post.media_url}`} 
                            onError={(e) => {
                            e.target.outerHTML = `<img src="http://localhost:7777${post.media_url}" alt="Media content" />`;
                            }}
                        >
                            <source src={`http://localhost:7777${post.media_url}`} type="video/mp4" />
                        </video>
                    </div>
                }

                <p className={styles.post__content}>
                    { post.content }
                </p>
            </div>

            {
                isEdit &&
                <Share
                    mutation={editMutation} 
                    placeholder="Edit your post"
                    textBtn="Edit"
                />
            }
        </>
    )
}

export default Post