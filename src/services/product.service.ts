import * as Model from "../models/Product.js"

export const getAllProducts = async (): Promise<Model.product[]> => {
    return  await Model.getAllProducts();
}

export const getProductsByCategory = async (category: string)  => {
    return await Model.getProductsByCategory(category);
}

export const searchProducts = async (name: string): Promise<Model.product[]> => {
    const products = await Model.getAllProducts();
    return products.filter((item) => 
        item.title.toLowerCase().includes(name.toLowerCase())
    )
}

export const getProductById = async (id: string) => {
    return await Model.getProductById(id);
}

export const createProduct = async (productData: Omit<Model.product, "id">) => {
    return await Model.createProduct(productData);
}

export const deleteProduct = async (id: string) => {
    return await Model.deleteProduct(id);

}

export const updateProduct = async (id: string, productData: Omit<Model.product, "id">) => {
    return await Model.updateProduct(id, productData);
}