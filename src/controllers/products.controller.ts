import type { Request, Response } from "express";
import * as productService from "../services/product.service.js"



export const getAllProducts = async (req: Request, res: Response) => {
    const { category } = req.query;

    if (category) {
        const productsByCategory = await productService.getProductsByCategory(category as string);
        return res.json(productsByCategory);
    }

    const products = await productService.getAllProducts();
    return res.json(products);
}

export const searchProducts = async (req: Request, res: Response) => {
    const { name } = req.query;

    if (typeof name !== "string") {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const products = await productService.searchProducts(name);

    if (products.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos' });
    }

    return res.json(products);
}

interface ProductParams {
    id: string;
}

export const getProductById = async (req: Request<ProductParams>, res: Response) => {
    const id: string = req.params.id;
    const product = await productService.getProductById(id);
    if (!product) {
        res.status(404).json({ error: 'No existe el producto' });
        return;
    }
    res.json(product);
}

export const createProduct = async (req: Request, res: Response) => {
    const { title, price, categories } = req.body;
    const product = await productService.createProduct({ title, price, categories });
    res.status(201).json(product);
}

export const deleteProduct = async (req: Request<ProductParams>, res: Response) => {
    try {
        const id: string = req.params.id;
        const deletedProduct = await productService.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const updateProduct = async (req: Request<ProductParams>, res: Response) => {
    try {
        const id: string = req.params.id;
        const { title, price, categories } = req.body;

        if (!title || !price || !categories) {
            return res.status(422).json({ error: "El nombre, precio y categorias son requeridos" });
        }

        const updated = await productService.updateProduct(id, { title, price, categories });

        if (!updated) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(updated);

    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}