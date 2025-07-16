import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '../presentation/auth.controller';
import { AuthService } from '../application/auth.service';
import { GoogleStrategy } from '../infrastructure/strategies/google.strategy';
import { AuthEntity } from '../domain/auth.entity';

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
        database: config.get('POSTGRES_DB') || 'auth_db',
        entities: [AuthEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([AuthEntity]),

    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: +(process.env.REDIS_PORT ?? 6379),
        },
      },
    ]),

    PassportModule.register({ session: false }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
