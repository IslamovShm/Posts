import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = "SELECT p.*, u.id AS userId, username FROM posts AS p JOIN users AS u ON p.user_id = u.id ORDER BY p.created_at DESC";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
}

export const addPosts = (req, res) => {
    const token = req.cookies.accesToken;
    if (!token) return res.status(401).json("You are not logged in");

    jwt.verify(token, "secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts (user_id, content, media_url) VALUES (?, ?, ?)";

        db.query(q, [userInfo.id, req.body.content, req.body.media_url], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    })
}

export const getMysPosts = (req, res) => {
    const token = req.cookies.accesToken;
    if (!token) return res.status(401).json("You are not logged in");

    jwt.verify(token, "secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT p.*, u.id AS userId, username FROM posts AS p JOIN users AS u ON p.user_id = u.id WHERE p.user_id = ? ORDER BY p.created_at DESC";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.accesToken;
    if (!token) return res.status(401).json("You are not logged in");

    jwt.verify(token, "secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM posts WHERE id = ? AND user_id = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.affectedRows > 0) return res.status(200).json("Post has been deleted");

            return res.status(403).json("You can delete only your posts");
        })
    })
}

export const editPost = (req, res) => {
    const token = req.cookies.accesToken;
    if (!token) return res.status(401).json("You are not logged in");

    jwt.verify(token, "secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE posts SET content = ?, media_url = ? WHERE id = ? AND user_id = ?";

        db.query(q, [req.body.content, req.body.media_url, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.affectedRows > 0) return res.status(200).json("Post has been edited");

            return res.status(403).json("You can edit only your posts");
        })
    })
}