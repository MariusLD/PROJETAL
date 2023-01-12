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
import { RabbitMQService } from './rabbit-mq/rabbit-mq.service';
import { RabbitMQController } from './rabbit-mq/rabbit-mq.controller';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
   TypeOrmModule.forRoot({
      /*
      type: 'postgres',
      host: 'db',
      port : 5432,
      username : 'postgres',
      password : 'postgres',
      database: 'postgres',
      *////*
      type: 'sqlite',
      database: 'mydatabase.db',
      //*/
      entities: [
        User,
        Association
      ],
      synchronize: true,
    }),
    UsersModule, AssociationsModule, AuthModule, RolesModule, RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
