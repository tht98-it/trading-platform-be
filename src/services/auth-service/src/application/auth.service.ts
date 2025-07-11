import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getStatus(): string {
    return 'Auth Service is running!';
  }

  async googleLogin(code: string): Promise<any> {
    // Logic Google OAuth2 sẽ được thêm sau
    return { message: 'Google login initiated', code };
  }
}
