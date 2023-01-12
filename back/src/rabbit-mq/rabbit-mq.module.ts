import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQController } from './rabbit-mq.controller';
import { RabbitMQService } from './rabbit-mq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'mail-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqp://rabbitmq:5672',
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
  providers: [RabbitMQService]
})
export class RabbitMQModule {}
