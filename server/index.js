import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage });

app.use("/api/uploads", express.static("uploads"));

app.post("/api/uploads", upload.single('media_url'), (req, res) => {
    res.json({
        url: `/api/uploads/${req.file.filename}`,
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(7777, () => {
    console.log("Server is running on port 7777");
})