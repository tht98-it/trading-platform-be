// src/dto/create-or-update-google-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateOrUpdateGoogleUserDto {
  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUrl()
  avatar: string;
}
