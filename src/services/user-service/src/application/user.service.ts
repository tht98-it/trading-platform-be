import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createOrUpdateGoogleUser(payload: {
    googleId: string;
    email: string;
    name: string;
    avatar: string;
  }) {
    const existing = await this.userRepo.findOne({
      where: { google_id: payload.googleId },
    });

    if (existing) {
      existing.email = payload.email;
      existing.name = payload.name;
      existing.avatar = payload.avatar;
      return this.userRepo.save(existing);
    }

    const newUser = this.userRepo.create({
      google_id: payload.googleId,
      email: payload.email,
      name: payload.name,
      avatar: payload.avatar,
    });

    return this.userRepo.save(newUser);
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
}
