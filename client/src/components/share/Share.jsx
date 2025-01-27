import { useState } from "react"
import { RiImageAddFill } from "react-icons/ri";

import { makeRequest } from "../../axios"

import styles from "./Share.module.css"

const Share = ({ mutation, placeholder, textBtn }) => {
    const [content, setContent] = useState("")
    const [media, setMedia] = useState(null)

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("media_url", media)
            const res = await makeRequest.post("/uploads", formData)
            console.log(res.data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if(!content.trim()) return

        let mediaUrl = ""
        if (media) mediaUrl = await upload()

        mutation.mutate({ content, media_url: mediaUrl.url })
    }
    return (
        <div className={styles.share}>
            <textarea 
                className={styles.share__content}
                type="text" 
                placeholder={ placeholder } 
                onChange={(e) => setContent(e.target.value)}
            />

            <div className={styles.additional_options}>
                <div className={styles.share__media}>
                    <input 
                        type="file" 
                        accept="image/*, video/*"
                        onChange={(e) => setMedia(e.target.files[0])}
                    />
                    <RiImageAddFill />
                    Add media
                    {media && <span>{media.name}</span>}
                </div>

                <button className={styles.share__btn} onClick={handleClick}>{ textBtn }</button>
            </div>
        </div>
    )
}

export default Share