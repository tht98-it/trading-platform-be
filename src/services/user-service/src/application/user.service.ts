import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): string {
    return 'User list from User Service!';
  }
}
