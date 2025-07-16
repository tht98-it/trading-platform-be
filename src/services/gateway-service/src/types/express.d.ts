// src/types/express.d.ts
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      cookies?: Record<string, any>;
    }
  }
}
