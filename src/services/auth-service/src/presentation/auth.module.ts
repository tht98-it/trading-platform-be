import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../domain/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Thay bằng biến môi trường
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([AuthEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-auth',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'auth_db',
      entities: [AuthEntity],
      synchronize: true, // Chỉ dùng trong dev
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
