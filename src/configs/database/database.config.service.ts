import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  @IsString()
  @IsNotEmpty()
  get host() {
    return this.configService.get<string>('database.host');
  }

  @IsNumber()
  @IsNotEmpty()
  get port() {
    return this.configService.get<number>('database.port');
  }

  @IsString()
  @IsNotEmpty()
  get databaseName() {
    return this.configService.get<string>('database.name');
  }

  @IsString()
  @IsNotEmpty()
  get user() {
    return this.configService.get<string>('database.user');
  }

  @IsString()
  @IsNotEmpty()
  get password() {
    return this.configService.get<string>('database.password');
  }
}
