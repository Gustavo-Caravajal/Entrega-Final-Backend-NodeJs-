import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: "Email y contraseña son requeridos"});
    }

    const existingUser = await authService.existingUser(email);

    if(existingUser){
        return res.status(409).json({error: "El usuario ya existe"})
    }

    const user = await authService.register(email, password);

    if(!user){
        return res.sendStatus(500);
    }

    res.status(200).json({id: user.id, email: user.email});
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: "Email y contraseña son requeridos"});
    }
    
    const user = await authService.existingUser(email);

    if(!user){
        return res.status(401).json({error: "Credenciales invalidas"});
    }

    const valid = await authService.validate(password, user.password);

    if(!valid){
        return res.status(401).json({error: "Credenciales invalidas"});
    }
    
    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );
    return res.json({token});
}