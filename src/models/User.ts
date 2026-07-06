import { db } from "./firebase.js";
import { addDoc, collection, getDocs, query, where} from "firebase/firestore";

const usersCollection = collection(db, "users");
export type user = {
    id: string,
    email: string
}

export type userDocument = user & {
    password: string
}

export const createUser = async (email: string, passwordHash: string): Promise<user | undefined> => {
    try {
        const docRef = await addDoc(usersCollection, {email, password: passwordHash});
        return {id: docRef.id, email};
    } catch (error) {
        console.error(error);
    }
}

export const findUserByEmail = async (email: string): Promise<userDocument | undefined | null> => {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const snapshot = await getDocs(q);
        if(!snapshot.empty){
            const doc = snapshot.docs[0]!;
            return {id: doc.id, ...doc.data() as Omit<userDocument, "id">}
        }
        else{
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}