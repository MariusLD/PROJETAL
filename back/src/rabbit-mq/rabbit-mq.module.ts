import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQController } from './rabbit-mq.controller';
import { RabbitMQService } from './rabbit-mq.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'mail-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqp://' + process.env.RMQ_USER + ':' + process.env.RMQ_PASS + '@rabbitmq:5672/' + process.env.RMQ_VHOST,
          ],
          queue: 'mail',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})
export class RabbitMQModule { }
