// src/infrastructure/middleware/gateway.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayMiddleware implements NestMiddleware {
  private readonly logger = new Logger(GatewayMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies?.accessToken;

    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug('[Middleware] AccessToken exists:', !!accessToken);
    }

    if (accessToken) {
      // Gắn accessToken vào request có kiểu rõ ràng
      (req as CustomRequest).accessToken = accessToken;
    }

    next();
  }
}

// Custom type mở rộng Request
interface CustomRequest extends Request {
  accessToken?: string;
}
