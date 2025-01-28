import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) return res.status(409).json("User already exists");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(q, [req.body.username, req.body.email, hashedPassword], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json("User has been created");
        });
    });

}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);

        if (!data.length) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if (!checkPassword) return res.status(401).json("Incorrect password or email");

        const token = jwt.sign({ id: data[0].id }, "secret");

        const{ password, ...others } = data[0];

        return res.cookie("accesToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    res.clearCookie("accesToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");
}