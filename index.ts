import 'dotenv/config';
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { verifyToken } from './src/middlewares/verify-token.js';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method);
    next();
})

app.get("/", (req, res) => {
    res.json({ message: "Bienvenidos a nuestra API REST!" });
});

import authRouter from "./src/routes/auth.router.js"
app.use("/api/auth", authRouter)
import productsRouter from "./src/routes/products.router.js"
app.use("/api", verifyToken, productsRouter);

import notFound from './src/middlewares/not-found.js';
//import { error } from "node:console";
app.use(notFound);

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));