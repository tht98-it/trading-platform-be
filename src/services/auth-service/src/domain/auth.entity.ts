import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('refresh_tokens')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  token: string; // nên hash nếu cần bảo mật cao

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  isExpired(currentTime: Date = new Date()): boolean {
    return this.expiresAt.getTime() <= currentTime.getTime();
  }

  isActive(currentTime: Date = new Date()): boolean {
    return !this.revoked && !this.isExpired(currentTime);
  }
}
