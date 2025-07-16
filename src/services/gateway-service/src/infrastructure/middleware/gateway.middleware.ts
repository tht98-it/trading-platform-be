import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'production') {
      // Access token logging removed for security reasons
    }
    console.log('[Middleware] Access Token:', req.cookies?.accessToken);

    // Nếu bạn muốn decode hoặc lấy accessToken và thêm vào headers
    if (req.cookies?.accessToken) {
      // Attach the access token to a custom property on the request object
      (req as any).accessToken = req.cookies.accessToken;
    }

    next();
  }
}
