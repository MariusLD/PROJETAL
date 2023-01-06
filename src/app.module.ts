import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations/association.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port : 5432,
      username : 'postgres',
      password : 'postgres',
      database: 'postgres',
      entities: [
        User,
        Association
      ],
      synchronize: true,
    }),
    UsersModule, AssociationsModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
