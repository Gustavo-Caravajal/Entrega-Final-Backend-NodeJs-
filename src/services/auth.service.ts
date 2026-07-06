import bcrypt from "bcrypt"
import { createUser, findUserByEmail } from "../models/User.js";
export const register = async (email: string, password: string) => {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(email, passwordHash);

    return user;
}

export const existingUser = async (email: string) => {
    return await findUserByEmail(email);
}

export const validate = async (password: string, passwordHash: string) => {
    return await bcrypt.compare(password,passwordHash);
}