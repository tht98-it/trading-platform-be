// src/domain/auth.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  isExpired(currentTime: Date = new Date()): boolean {
    return this.expiresAt.getTime() <= currentTime.getTime();
  }
}
