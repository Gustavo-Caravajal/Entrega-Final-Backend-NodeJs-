import { db } from "./firebase.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

export type product = {
    id: string,
    title: string,
    price: number,
    categories: string[]
}

const productsCollection = collection(db, "products")

export const getAllProducts = async (): Promise<product[]> => {
    try {
        const snapshot = await getDocs(productsCollection)
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as Omit<product, "id">
        }))
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductById = async (id: string): Promise<product | null | undefined> => {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        return snapshot.exists() ? {
            id: snapshot.id,
            ...snapshot.data() as Omit<product, "id">
        } : null;
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByCategory = async (category: string) => {
    try {
        const q = query(
            productsCollection,
            where("categories", "array-contains", category)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as Omit<product, "id">
        }));
    } catch (error) {
        console.error(error)
    }
}

export const createProduct = async (data: Omit<product, "id">): Promise<product | undefined> => {
    try {
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) {
        return false;
    }
    await deleteDoc(productRef);
    return true;
}

export const updateProduct = async (id: string, productData: Omit<product, "id">): Promise<product | boolean> => {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
        return false;
    }

    await setDoc(productRef, productData);
    return { id, ...productData };
}