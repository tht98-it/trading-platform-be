import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { UserService } from '../application/user.service';
import { UserController } from './controller/user.controller';
import { UserListener } from '../infrastructure/user.listener';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST') || 'localhost',
        port: +config.get('POSTGRES_PORT') || 5432,
        username: config.get('POSTGRES_USER') || 'admin',
        password: config.get('POSTGRES_PASSWORD') || 'password',
        database: config.get('POSTGRES_DB') || 'user_db',
        entities: [UserEntity],
        synchronize: true, // chỉ nên dùng trong dev
      }),
    }),

    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, UserListener],
  providers: [UserService],
})
export class UserModule {}
