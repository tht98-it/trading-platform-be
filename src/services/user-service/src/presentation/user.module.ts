import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-user',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'user_db',
      entities: [UserEntity],
      synchronize: true, // Chỉ dùng trong dev
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
