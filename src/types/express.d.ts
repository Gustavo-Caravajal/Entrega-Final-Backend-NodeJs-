import "express-serve-static-core";

export interface TokenPayload {
    id: string;
    email: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: TokenPayload;
    }
}

export {};