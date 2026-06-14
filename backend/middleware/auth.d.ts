import type { Request, Response, NextFunction } from "express";
interface AuthPayload {
    id: string;
    email: string;
}
declare module "express-serve-static-core" {
    interface Request {
        user?: AuthPayload;
    }
}
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.d.ts.map