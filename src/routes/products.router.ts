import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../controllers/products.controller.js";

const router = Router();

export default router;

router.get("/products", getAllProducts);

router.get("/products/search", searchProducts)

router.get("/products/:id", getProductById);

router.post("/products/create", createProduct);

router.put("/products/:id", updateProduct)

router.delete("/products/:id", deleteProduct);

