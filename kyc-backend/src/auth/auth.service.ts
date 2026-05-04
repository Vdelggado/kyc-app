import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { Kysely, MssqlDialect } from 'kysely';
import * as Tedious from 'tedious';
import * as Tarn from 'tarn';

@Injectable()
export class AuthService {
  private authConfig;

  constructor(private configService: ConfigService) {
    const dialect = new MssqlDialect({
      tarn: {
        ...Tarn,
        options: {
          min: 2,
          max: 10,
        },
      },
      tedious: {
        ...Tedious,
        connectionFactory: () => new Tedious.Connection({
          authentication: {
            options: {
              password: this.configService.get<string>('DB_PASSWORD'),
              userName: this.configService.get<string>('DB_USER'),
            },
            type: 'default',
          },
          options: {
            database: this.configService.get<string>('DB_NAME'),
            port: 1433,
            trustServerCertificate: true,
            encrypt: false,
          },
          server: this.configService.get<string>('DB_HOST', 'localhost'),
        }),
      },
    });

    const kyselyDB = new Kysely({ dialect });

    this.authConfig = betterAuth({
      database: {
        db: kyselyDB,
        type: 'mssql',
      },
      secret: this.configService.get<string>('BETTER_AUTH_SECRET'),
      baseURL: this.configService.get<string>('BETTER_AUTH_URL', 'http://localhost:3001'),
    });
  }

  get auth() {
    return this.authConfig;
  }
}
